import React from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-10 w-72 h-72 bg-xrp-light rounded-full filter blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">XRP Fee Monitor</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Real-time XRP transaction fee & price tracking with instant
            notifications
          </p>

          {/* CTA Button */}
          <motion.a
            href="https://t.me/xrp_gasprice_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-xrp-light to-blue-500 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTelegramPlane className="mr-2 text-xl" />
            Start Monitoring
          </motion.a>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4"
        >
          <img
            src="/xrp-logo.svg"
            alt="XRP Logo"
            className="w-16 h-16 opacity-20"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
