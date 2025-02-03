import React from "react";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How often are fees updated?",
    answer: "Fees are checked every 5 seconds, while XRP price updates every minute to ensure you get the most accurate data while staying within API limits.",
  },
  {
    question: "Is the bot free to use?",
    answer: "Yes, the bot is completely free to use. We believe in providing value to the XRP community.",
  },
  {
    question: "How do I enable notifications?",
    answer: "Simply use the /notify command in the bot to start receiving instant alerts about fee and price changes.",
  },
  {
    question: "Can I customize notification thresholds?",
    answer: "Currently, you'll receive notifications for all fee changes. We're working on customizable thresholds for a future update.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="py-20 bg-northern-accent/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Common questions about XRP Fee Monitor
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <Disclosure>
                {({ open }) => (
                  <div className="bg-northern-accent/30 rounded-2xl overflow-hidden">
                    <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center">
                      <span className="font-semibold">{faq.question}</span>
                      <ChevronUpIcon
                        className={`w-5 h-5 transition-transform ${
                          open ? "" : "transform rotate-180"
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4 text-gray-400 border-t border-northern-accent/50">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 