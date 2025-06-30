import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const autoplayRef = useRef<number>();

  const images = [
    "/images/2.avif",
    "/images/5.avif",
    "/images/6.avif",
    "/images/10.avif",
    "/images/11.avif",
    "/images/12.avif",
    "/images/16.avif",
    "/images/18.avif",
    "/images/19.avif",
    "/images/20.avif",
    "/images/21.avif",
    "/images/22.avif",
    "/images/23.avif",
    "/images/24.avif",
    "/images/30.avif",
    "/images/31.avif",
    "/images/32.avif",
    "/images/33.avif",
    "/images/34.avif",
    "/images/35.avif",
    "/images/36.avif",
    "/images/37.avif",
    "/images/38.avif",
    "/images/39.avif",
    "/images/40.avif",
  ];
  //Removed sala

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Handle autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = window.setInterval(nextSlide, 12000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 5000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setIsPaused(true);
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  // Mobile touch handlers - Simplified and more responsive
  const handleTouchStart = (e: React.TouchEvent) => {
    setShowSwipeHint(false); // Hide hint on first touch
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startTime = Date.now();

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endTime = Date.now();
      const diff = startX - endX;
      const timeDiff = endTime - startTime;

      // Only trigger if swipe is fast enough and far enough
      if (timeDiff < 300 && Math.abs(diff) > 60) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        setIsPaused(true);
      }

      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchend", handleTouchEnd, { passive: true });
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gray-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Gallery
          </h2>
          <p className="text-gray-600 font-light">
            Explore our beautiful spaces and amenities
          </p>
        </motion.div>

        <div className="relative group w-full max-w-4xl mx-auto">
          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Autoplay Control - Hidden on mobile */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute bottom-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hidden sm:block"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </button>

          {/* Gallery Container */}
          <div
            className="relative overflow-hidden aspect-square sm:aspect-[5/4] rounded-lg w-full"
            onTouchStart={handleTouchStart}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.5 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(images[currentIndex])}
                />

                {/* Mobile swipe indicator - only visible on mobile and only for first few seconds */}
                {showSwipeHint && (
                  <div className="absolute inset-x-0 top-4 h-12 pointer-events-none sm:hidden">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/90 text-sm bg-black/30 px-3 py-1 rounded-full animate-pulse">
                      <span>Swipe</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white/80 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/80 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/80 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators - Only show a few representative dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {/* Show only 5 dots max, representing position in the gallery */}
            {Array.from({ length: Math.min(images.length, 5) }, (_, index) => {
              const totalImages = images.length;
              const dotsToShow = Math.min(totalImages, 5);
              const segmentSize = Math.ceil(totalImages / dotsToShow);
              const currentSegment = Math.floor(currentIndex / segmentSize);
              const isActive = index === currentSegment;

              return (
                <button
                  key={index}
                  onClick={() => {
                    const targetIndex = index * segmentSize;
                    setDirection(targetIndex > currentIndex ? 1 : -1);
                    setCurrentIndex(Math.min(targetIndex, totalImages - 1));
                    setIsPaused(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 touch-none ${
                    isActive ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image group ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <img
                src={selectedImage}
                alt="Selected gallery image"
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-8 w-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
