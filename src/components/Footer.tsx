import React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-northern-accent/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">XRP Fee Monitor</h3>
            <p className="text-gray-400 mb-4">
              Real-time XRP transaction fee & price monitoring for the XRPL
              community.
            </p>
            <a
              href="https://t.me/xrp_gasprice_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xrp-light hover:text-blue-400 transition-colors"
            >
              <FaTelegramPlane className="mr-2" />
              Start Monitoring
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://t.me/xrp_gasprice_bot"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support Us</h4>
            <p className="text-gray-400 mb-2">XRP Address:</p>
            <code className="text-sm text-gray-400 break-all">
              rMxftwy1aobPh8DSL9NWvyP1M1Vbeb9BVW
            </code>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-northern-accent/50 text-center text-gray-400">
          <p>© 2025 NorthernLabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
