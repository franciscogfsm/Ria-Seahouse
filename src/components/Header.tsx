import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Waves as Wave } from "lucide-react";

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
      const headerOffset = isScrolled ? 60 : 76; // py-3 (48px) vs py-5 (80px) - approximate values
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a
          href="#home"
          className="flex items-center"
          onClick={(e) => handleNavClick(e, "#home")}
        >
          <Wave
            className={`h-6 w-6 ${
              isScrolled ? "text-primary-600" : "text-white"
            }`}
          />
          <span
            className={`ml-2 font-medium text-lg ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Ria Sea House
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:text-primary-600"
                  : "text-white hover:text-primary-100"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X
              className={`h-6 w-6 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white"
        >
          <nav className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-3 px-4 text-gray-600 hover:text-primary-600 hover:bg-gray-50 font-medium"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
