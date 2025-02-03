import React from "react";
import { motion } from "framer-motion";
import { 
  ChatBubbleBottomCenterTextIcon, 
  BoltIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />,
    title: "Start the Bot",
    description: "Message @XRPFeeBot on Telegram to begin monitoring",
  },
  {
    icon: <BoltIcon className="w-8 h-8" />,
    title: "Enable Notifications",
    description: "Use /notify to get instant alerts on fee changes",
  },
  {
    icon: <ArrowPathIcon className="w-8 h-8" />,
    title: "Stay Updated",
    description: "Receive real-time updates on XRP fees and prices",
  },
];

const HowItWorks: React.FC = () => {
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
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get started with XRP Fee Monitor in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-gradient-to-r from-xrp-light to-transparent" />
              )}
              <div className="bg-northern-accent/30 p-8 rounded-2xl backdrop-blur-sm hover:bg-northern-accent/40 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-xrp-light to-blue-500 rounded-2xl p-4 text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 