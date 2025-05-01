import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Image,
  Star,
  MapPin,
  MessageCircle,
} from "lucide-react";

const Hero: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Features", href: "#features" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/15.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/finalicon.png"
              alt="Ria Sea House"
              className="w-8 sm:w-10 transition-all duration-300"
            />
            <span
              className={`font-light text-lg ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Ria Sea House
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-light transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? "text-gray-600 hover:text-gray-900"
                : "text-white/90 hover:text-white"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-gray-600 hover:text-gray-900 font-light"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-[90%] sm:max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight tracking-wide">
              Ria Sea House
            </motion.h1>
            <motion.p className="text-lg sm:text-xl text-white/90 mb-8 font-light tracking-wide">
              Coastal retreat in Cabanas de Tavira
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#gallery"
                className="px-6 py-3 bg-white text-gray-900 rounded-lg transition-all duration-200 text-sm font-light tracking-wide hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <Image className="w-4 h-4" />
                View Gallery
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-black/20 text-white border border-white/30 rounded-lg transition-all duration-200 text-sm font-light tracking-wide hover:bg-black/30 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Book Your Stay
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
          }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
