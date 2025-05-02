import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Instagram, ArrowRight } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = window.scrollY + elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Features", href: "#features" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-white/95 backdrop-blur-md shadow-lg shadow-black/[0.03]"
            : "py-3 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              onClick={(e) => handleNavClick(e, "#home")}
            >
              <div className="relative">
                <img
                  src="/images/finalicon.png"
                  alt="Ria Sea House"
                  className={`transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? "w-12 h-12" : "w-14 h-14"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-light tracking-wide transition-colors duration-300 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Ria Sea House
                </span>
                <span
                  className={`text-xs tracking-wider transition-colors duration-300 ${
                    isScrolled ? "text-gray-500" : "text-white/80"
                  }`}
                >
                  Cabanas de Tavira
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div
                className={`flex items-center gap-1 ${
                  isScrolled
                    ? "bg-gray-100/80 rounded-full p-1.5"
                    : "bg-white/10 backdrop-blur-sm rounded-full p-1.5"
                }`}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`md:hidden p-2 rounded-full transition-colors duration-300 ${
                isScrolled
                  ? "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-screen w-[280px] bg-white shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="text-lg font-medium text-gray-900">Menu</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.a>
                ))}
              </nav>

              <div className="p-4 space-y-4 border-t border-gray-100">
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 active:transform active:scale-98 transition-all duration-200 shadow-lg shadow-primary-600/20"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Book Your Stay
                </motion.a>

                <div className="grid grid-cols-3 gap-2">
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="tel:+351962773707"
                    className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 text-primary-600 mb-1" />
                    <span className="text-xs font-medium text-gray-600">
                      Call
                    </span>
                  </motion.a>
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="mailto:riaseahouse@gmail.com"
                    className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-primary-600 mb-1" />
                    <span className="text-xs font-medium text-gray-600">
                      Email
                    </span>
                  </motion.a>
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/riaseahouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                  >
                    <Instagram className="w-5 h-5 text-primary-600 mb-1" />
                    <span className="text-xs font-medium text-gray-600">
                      Instagram
                    </span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
