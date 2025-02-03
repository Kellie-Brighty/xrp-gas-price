import React from "react";
import { motion } from "framer-motion";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  {
    icon: <FaTelegram className="w-8 h-8" />,
    name: "Telegram Channel",
    description: "Join our community for updates and support",
    link: "https://t.me/xrp_gasprice_bot",
  },
  {
    icon: <FaXTwitter className="w-8 h-8" />,
    name: "X (Twitter)",
    description: "Follow us for the latest news and announcements",
    link: "https://x.com/XrpGasPriceBot",
  },
];

const Community: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Join Our Community</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with us and other XRP enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-northern-accent/30 p-8 rounded-2xl backdrop-blur-sm hover:bg-northern-accent/40 transition-all duration-300"
            >
              <div className="text-xrp-light mb-4">{social.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{social.name}</h3>
              <p className="text-gray-400">{social.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
