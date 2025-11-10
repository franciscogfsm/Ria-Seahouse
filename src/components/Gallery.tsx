import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = [
    "/images/entrada1.avif",
    "/images/entrada2.avif",
    "/images/sala1.avif",
    "/images/sala2.avif",
    "/images/sala4.avif",
    "/images/sala5.avif",
    "/images/sala6.avif",
    "/images/sala7.avif",
    "/images/sala8.avif",
    "/images/sala9.avif",
    "/images/cozinha1.avif",
    "/images/cozinha2.avif",
    "/images/quartobaixo1.avif",
    "/images/quartobaixo2.avif",
    "/images/quartobaixo3.avif",
    "/images/quartocima2.avif",
    "/images/casadebanho1.avif",
    "/images/casadebanho2.avif",
    "/images/casadebanho3.avif",
    "/images/casadebanho4.avif",
    "/images/casadebanho5.avif",
    "/images/casadebanho6.avif",
    "/images/varanda1.avif",
    "/images/vista1.avif",
    "/images/vista2.avif",
    "/images/vista3.avif",
    "/images/vista4.avif",
    "/images/vista5.avif",
    "/images/vista6.avif",
    "/images/vista7.avif",
    "/images/vista8.avif",
    "/images/vista9.avif",
    "/images/vista10.avif",
    "/images/vista11.avif",
    "/images/escadas1.avif",
    "/images/saida1.avif",
    "/images/condominio1.avif",
  ];

  // Preload ALL images immediately on mount for instant gallery experience
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Update current index based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to specific image
  const scrollToImage = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = container.offsetWidth;
    container.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  // Navigate to next/previous image in gallery - Fixed to update pagination
  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of container width

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of container width

    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  // Navigate lightbox images
  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[(selectedIndex + 1) % images.length]);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(
      images[(selectedIndex - 1 + images.length) % images.length]
    );
  };

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Gallery
          </h2>
          <p className="text-gray-600 font-light">
            Explore our beautiful spaces and amenities
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto group/gallery">
          {/* Navigation Arrows - Desktop Only */}
          <button
            onClick={scrollPrev}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 -translate-x-1/2"
            aria-label="Previous images"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 translate-x-1/2"
            aria-label="Next images"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] snap-center"
              >
                <div
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.min(images.length, 8) }, (_, index) => {
              const totalImages = images.length;
              const dotsToShow = Math.min(totalImages, 8);
              const segmentSize = Math.ceil(totalImages / dotsToShow);
              const currentSegment = Math.floor(currentIndex / segmentSize);
              const isActive = index === currentSegment;

              return (
                <button
                  key={index}
                  onClick={() => scrollToImage(index * segmentSize)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary-600 w-8"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
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
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 p-2 rounded-full"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 text-white text-sm bg-black/30 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Image container - No scroll needed */}
            <div
              className="relative w-full h-full flex items-center justify-center p-16 sm:p-20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={`Gallery image ${selectedIndex + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                loading="eager"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
