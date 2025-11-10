import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Image,
  MessageCircle,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { usePassiveScroll } from "../hooks/usePassiveScroll";

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const images = [
    "/images/capa1.avif",
    "/images/capa2.avif",
    "/images/capa3.avif",
  ];

  const handleTouchStart = useCallback((e: Event) => {
    const touch = (e as TouchEvent).touches[0];
    setTouchStart(touch.clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e: Event) => {
      if (!touchStart) return;

      const touch = (e as TouchEvent).touches[0];
      const diff = touchStart - touch.clientX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          // Swipe left
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        } else {
          // Swipe right
          setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
          );
        }
        setTouchStart(0);
      }
    },
    [touchStart, images.length]
  );

  usePassiveScroll({
    target: sectionRef.current,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Slower transition for better performance
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Background image carousel */}
      <AnimatePresence
        initial={false}
        mode="wait"
        presenceAffectsLayout={false}
      >
        <motion.div
          key={currentImageIndex}
          initial={{
            opacity: 0,
            scale: 1.05,
            x: 60,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            scale: 1,
            x: -60,
          }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${images[currentImageIndex]}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            willChange: "transform, opacity",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"
          />
        </motion.div>
      </AnimatePresence>

      {/* Previous image for smooth transition */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${
            images[(currentImageIndex - 1 + images.length) % images.length]
          }')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-24 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentImageIndex === index
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="text-center w-full max-w-[90%] sm:max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-white/90">
                Cabanas de Tavira, Portugal
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4 leading-tight tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to
              <br />
              Ria Sea House
            </motion.h1>

            {/* Features badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 flex items-center gap-1"
                whileTap={{ scale: 0.98 }}
              >
                <Star className="w-4 h-4" /> Premium Location
              </motion.span>
              <motion.span
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 flex items-center gap-1"
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-4 h-4" /> Up to 8 Guests
              </motion.span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#gallery"
                className="px-6 py-3.5 bg-white text-gray-900 rounded-xl transition-all duration-200 text-base font-medium tracking-wide hover:bg-gray-100 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                whileTap={{ scale: 0.98 }}
              >
                <Image className="w-5 h-5" />
                View Gallery
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3.5 bg-primary-600 text-white rounded-xl transition-all duration-200 text-base font-medium tracking-wide hover:bg-primary-700 flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Book Your Stay
              </motion.a>
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
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
