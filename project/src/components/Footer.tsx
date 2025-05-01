import React from "react";
import { Waves as Wave, ArrowUp, Instagram, Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Wave className="h-6 w-6 text-primary-500" />
              <span className="ml-2 font-medium text-lg text-white">
                Ria Sea House
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A luxury T3 vacation home in Cabana, Portugal, offering
              breathtaking views of the Ria Formosa and the sea, just 2 minutes
              from the beach.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/riaseahouse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:booking@riaseahouse.com"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+351123456789"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Location</h3>
            <address className="text-gray-400 not-italic">
              Cabanas de Tavira
              <br />
              Algarve, Portugal
              <br />
              <a
                href="tel:+351123456789"
                className="hover:text-white transition-colors"
              >
                +351 123 456 789
              </a>
              <br />
              <a
                href="mailto:booking@riaseahouse.com"
                className="hover:text-white transition-colors"
              >
                booking@riaseahouse.com
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ria Sea House. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center text-gray-400 hover:text-white transition-colors group"
            aria-label="Scroll to top"
          >
            <span className="mr-2">Back to top</span>
            <ArrowUp className="h-4 w-4 transform transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
