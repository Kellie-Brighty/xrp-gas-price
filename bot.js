const { Telegraf } = require("telegraf");
const { Client } = require("xrpl");
const schedule = require("node-schedule");
const fetch = require("node-fetch");
require("dotenv").config();

// Initialize bot with token from .env
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const CHANNEL_USERNAME = "@NorthernLabs";
const CHANNEL_ID = process.env.CHANNEL_ID; // Replace with your actual channel ID

// Middleware to check channel membership
bot.use(async (ctx, next) => {
  try {
    // Skip check for channel posts
    if (ctx.chat?.type === "channel") return next();

    const user = ctx.from.id;
    try {
      const member = await ctx.telegram.getChatMember(CHANNEL_ID, user);

      // Check if user is a member of the channel
      if (["creator", "administrator", "member"].includes(member.status)) {
        return next();
      }
      await ctx.reply(
        "🔒 Please join our channel to use this bot!\n\n" +
          `1️⃣ Join: ${CHANNEL_USERNAME}\n` +
          "2️⃣ Then try your command again"
      );
    } catch (memberError) {
      console.error("Error checking member status:", memberError);
      // If we can't check membership, let them use the bot
      return next();
    }
  } catch (error) {
    console.error("Error checking membership:", error);
    // If there's an error, let them use the bot
    return next();
  }
});

// Initialize XRPL client
const xrplClient = new Client("wss://s1.ripple.com"); // Use Ripple's public server
let isConnected = false;

// Store subscribed users and last fee in memory
const subscribedUsers = new Set();
let lastFee = null;
let lastPrice = null;
let lastPriceCheck = 0;
const PRICE_CHECK_INTERVAL = 60000; // Check price every 60 seconds

// Connect to XRPL
async function connectXRPL() {
  try {
    if (isConnected) {
      return;
    }

    await xrplClient.connect();
    isConnected = true;
    console.log("Connected to XRPL");
  } catch (error) {
    console.error("Failed to connect to XRPL:", error);
    isConnected = false;
    // Try to reconnect after 5 seconds
    setTimeout(connectXRPL, 5000);
  }
}

// Add reconnection handler
xrplClient.on("disconnected", () => {
  console.log("Disconnected from XRPL. Attempting to reconnect...");
  isConnected = false;
  connectXRPL();
});

// Get XRP price from an API
async function getXRPPrice() {
  try {
    // Check if enough time has passed since last price check
    const now = Date.now();
    if (lastPrice && now - lastPriceCheck < PRICE_CHECK_INTERVAL) {
      return lastPrice; // Return cached price if checking too frequently
    }

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "XRP Fee Monitor Bot",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.ripple || typeof data.ripple.usd === "undefined") {
      throw new Error("Invalid response format from CoinGecko");
    }

    lastPriceCheck = now;
    return data.ripple.usd;
  } catch (error) {
    console.error("Error fetching XRP price:", error);
    return lastPrice || 0;
  }
}

// Get current XRP fee
async function getXRPFee() {
  try {
    if (!isConnected) {
      await connectXRPL();
    }

    const response = await xrplClient.request({
      command: "fee",
    });
    return parseFloat(response.result.drops.base_fee) / 1_000_000; // Convert drops to XRP
  } catch (error) {
    console.error("Error fetching fee:", error);
    // If we get a not synced error, try reconnecting
    if (error.message.includes("Not synced")) {
      isConnected = false;
      await connectXRPL();
    }
    // Return last known fee or a default value
    return lastFee || 0.00001;
  }
}

// Function to send gas price message
async function sendGasPrice(ctx) {
  try {
    const [currentFee, xrpPrice] = await Promise.all([
      getXRPFee(),
      getXRPPrice(),
    ]);

    const message =
      `💠 XRP price: $${xrpPrice.toFixed(2)}\n` +
      `⛽️ Base fee: ${currentFee.toFixed(6)} XRP\n\n` +
      "🔔 Turn on notifications with /notify\n" +
      "📢 Run your Ads: Coming Soon";

    await ctx.reply(message);
  } catch (error) {
    await ctx.reply("Sorry, couldn't fetch the data. Please try again later.");
  }
}

// Start command
bot.command("start", async (ctx) => {
  const welcomeMessage =
    "👋 Welcome to XRP Fee Monitor!\n\n" +
    "📊 Available Commands:\n\n" +
    "• /gas_price - Check current fee\n" +
    "• /notify - Enable notifications\n" +
    "• /notifs - Manage notifications\n\n" +
    "🔔 Pro Tip: Use /notify to get instant updates on price and fee changes!\n\n" +
    "🔔 Get real-time updates on XRP transaction fees!";

  await ctx.reply(welcomeMessage);
});

// Gas price command
bot.command("gas_price", async (ctx) => {
  await sendGasPrice(ctx);
});

// Notify command - Set up notifications
bot.command("notify", async (ctx) => {
  const chatId = ctx.chat.id;
  if (subscribedUsers.has(chatId)) {
    await ctx.reply(
      "📌 You're already subscribed!\n\n" +
        "Use /notifs to view your notification settings"
    );
  } else {
    subscribedUsers.add(chatId);
    await ctx.reply(
      "✅ Successfully subscribed!\n\n" +
        "📊 You'll receive alerts for:\n" +
        "• Any changes in XRP transaction fees\n\n" +
        "Use /notifs to manage your settings"
    );
  }
});

// Notifs command - Manage notifications
bot.command("notifs", async (ctx) => {
  const chatId = ctx.chat.id;
  if (subscribedUsers.has(chatId)) {
    await ctx.reply(
      "🔔 Notification Settings\n\n" +
        "Status: ✅ Active\n" +
        "Alert Type: Real-time fee changes\n\n" +
        "📊 Commands:\n" +
        "• /unsubscribe - Disable notifications"
    );
  } else {
    await ctx.reply(
      "❌ Notifications are disabled\n\n" +
        "Use /notify to enable real-time alerts"
    );
  }
});

// Unsubscribe command
bot.command("unsubscribe", async (ctx) => {
  const chatId = ctx.chat.id;
  if (subscribedUsers.has(chatId)) {
    subscribedUsers.delete(chatId);
    await ctx.reply(
      "✅ Notifications disabled\n\n" + "Use /notify to enable them again"
    );
  } else {
    await ctx.reply(
      "❌ You don't have any active notifications\n\n" +
        "Use /notify to enable alerts"
    );
  }
});

// Check and notify about fee changes
async function checkAndNotifyChanges() {
  try {
    console.log(`[${new Date().toISOString()}] Checking fees and price...`);
    const [currentFee, currentPrice] = await Promise.all([
      getXRPFee(),
      getXRPPrice(),
    ]);

    if (
      currentFee === null ||
      currentPrice === null ||
      typeof currentFee !== "number" ||
      typeof currentPrice !== "number"
    ) {
      console.log("Skipping check due to invalid values");
      return;
    }

    if (lastFee === null || lastPrice === null) {
      lastFee = currentFee;
      lastPrice = currentPrice;
      console.log(
        `First check - Fee: ${currentFee} XRP, Price: $${currentPrice}`
      );
      return;
    }

    // Check for fee changes
    let notifications = [];

    if (currentFee !== lastFee) {
      console.log(`Fee changed from ${lastFee} to ${currentFee} XRP`);
      const feeDirection = currentFee > lastFee ? "increased" : "decreased";
      const feeChange = (((currentFee - lastFee) / lastFee) * 100).toFixed(2);

      const message =
        `⛽️ Fee ${feeDirection.toUpperCase()}!\n\n` +
        `📊 Change: ${feeChange}%\n` +
        `• Previous: ${lastFee.toFixed(6)} XRP\n` +
        `• Current:  ${currentFee.toFixed(6)} XRP`;

      notifications.push(message);
    }

    // Check for price changes
    if (currentPrice !== lastPrice) {
      console.log(`Price changed from $${lastPrice} to $${currentPrice}`);
      const priceDirection =
        currentPrice > lastPrice ? "increased" : "decreased";
      const priceChange = (
        ((currentPrice - lastPrice) / lastPrice) *
        100
      ).toFixed(2);

      const message =
        `💠 Price ${priceDirection.toUpperCase()}!\n\n` +
        `📊 Change: ${priceChange}%\n` +
        `• Previous: $${lastPrice.toFixed(2)}\n` +
        `• Current:  $${currentPrice.toFixed(2)}`;

      notifications.push(message);
    }

    // Send notifications if there are any changes
    if (notifications.length > 0) {
      console.log(`Sending notifications to ${subscribedUsers.size} users`);
      for (const chatId of subscribedUsers) {
        for (const msg of notifications) {
          await bot.telegram.sendMessage(
            chatId,
            msg + "\n\nUse /gas_price to check current rates"
          );
          console.log(`Notification sent to ${chatId}`);
        }
      }
    } else {
      console.log(
        `No changes detected. Fee: ${currentFee} XRP, Price: $${currentPrice}`
      );
    }

    lastFee = currentFee;
    lastPrice = currentPrice;
  } catch (error) {
    console.error("Error in price/fee check:", error);
  }
}

// Check fee changes every 5 seconds
setInterval(checkAndNotifyChanges, 5000);

// Start the bot
async function startBot() {
  try {
    await connectXRPL();
    await bot.launch();
    console.log("Bot is running...");
  } catch (error) {
    console.error("Failed to start bot:", error);
  }
}

// Handle shutdown
process.once("SIGINT", () => {
  bot.stop("SIGINT");
  xrplClient.disconnect();
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
  xrplClient.disconnect();
});

// Add this new command after your other bot commands
bot.command("info", async (ctx) => {
  const infoMessage =
    "ℹ️ XRP Fee Monitor Bot\n\n" +
    "📊 Features:\n" +
    "• Real-time XRP transaction fee monitoring\n" +
    "• Live XRP/USD price updates\n" +
    "• Instant fee change notifications\n" +
    "• Price movement alerts\n\n" +
    "🔄 Update Frequency:\n" +
    "• Fee checks: Every 5 seconds\n" +
    "• Price updates: Every 60 seconds\n\n" +
    "👨‍💻 Developer: @NorthernLabs\n" +
    "🌐 Version: 1.0.0\n" +
    "📅 Last Updated: February 2024\n\n" +
    "💬 Support: https://t.me/NorthernLabs\n" +
    "🌟 Support Development:\n" +
    "• XRP Address:\n" +
    "<code>rMxftwy1aobPh8DSL9NWvyP1M1Vbeb9BVW</code>\n\n" +
    "• All donations are tracked transparently\n" +
    "• 100% of funds go towards developing new tools\n" +
    "• Updates on fund usage posted in @NorthernLabs\n\n" +
    "📱 Commands:\n" +
    "• /gas_price - Check current rates\n" +
    "• /notify - Enable notifications\n" +
    "• /notifs - Manage notifications\n" +
    "• /info - Show this information\n\n" +
    "🤝 Thanks for using XRP Fee Monitor!";

  await ctx.reply(infoMessage, { parse_mode: "HTML" });
});

startBot();
