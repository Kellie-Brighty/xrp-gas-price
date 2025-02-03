import React from "react";
import { motion } from "framer-motion";
import { 
  BellIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CurrencyDollarIcon 
} from "@heroicons/react/24/outline";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: "Real-time Monitoring",
    description: "Track XRP transaction fees and prices as they change",
  },
  {
    icon: <BellIcon className="w-8 h-8" />,
    title: "Instant Notifications",
    description: "Get alerts for any fee or price movements",
  },
  {
    icon: <ClockIcon className="w-8 h-8" />,
    title: "5-Second Updates",
    description: "Fee checks every 5 seconds, price updates every minute",
  },
  {
    icon: <CurrencyDollarIcon className="w-8 h-8" />,
    title: "Price Tracking",
    description: "Monitor XRP/USD price changes in real-time",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-northern-accent/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to optimize your XRP transactions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-northern-accent/30 p-6 rounded-2xl backdrop-blur-sm hover:bg-northern-accent/40 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-xrp-light to-blue-500 rounded-xl p-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 