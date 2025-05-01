import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Home,
  MapPin,
  Clock,
  Car,
  Bed,
  Bath,
  Thermometer,
  Sun,
  Waves,
} from "lucide-react";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const waveVariants = {
    animate: {
      x: [0, -100],
      transition: {
        repeat: Infinity,
        duration: 8,
        ease: "linear",
      },
    },
  };

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative wave patterns */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          variants={waveVariants}
          animate="animate"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 10 C 30 0, 70 0, 100 10 C 70 20, 30 20, 0 10" fill="none" stroke="%23000" stroke-width="0.5"/%3E%3C/svg%3E\')',
            backgroundRepeat: "repeat-x",
            backgroundSize: "100px 20px",
          }}
        />
      </div>

      {/* Summer decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-[10%] w-64 h-64 bg-blue-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 right-[10%] w-64 h-64 bg-yellow-200 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8 tracking-wide text-center">
            Welcome to Ria Sea House
          </h2>

          <div className="space-y-6 text-gray-600 font-light leading-relaxed">
            <p>
              Discover this stunning duplex T3 apartment (173.65m² total area)
              in Cabanas de Tavira, offering breathtaking views of both the sea
              and Ria Formosa. Located just minutes from the beach, this
              property combines modern comfort with an unbeatable location.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl text-gray-900 font-normal">
                  First Floor
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Entrance hall</li>
                  <li>Modern kitchen</li>
                  <li>Spacious living room</li>
                  <li>Bedroom</li>
                  <li>Shower bathroom</li>
                  <li>Balcony accessible from bedroom and living room</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl text-gray-900 font-normal">
                  Second Floor
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Two bedrooms (one en-suite)</li>
                  <li>Bathroom with bathtub</li>
                  <li>Shower bathroom</li>
                  <li>Two balconies accessible from bedrooms</li>
                  <li>Circulation area</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="order-2 md:order-1"
          >
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                {
                  icon: Home,
                  title: "Spacious Living",
                  desc: "173.65m² total area",
                },
                {
                  icon: Bed,
                  title: "Bedrooms",
                  desc: "3 bedrooms, 1 en-suite",
                },
                { icon: Bath, title: "Bathrooms", desc: "3 bathrooms" },
                {
                  icon: Thermometer,
                  title: "Comfort",
                  desc: "AC in all rooms",
                },
                {
                  icon: Sun,
                  title: "Outdoor Space",
                  desc: "Balcony & terrace",
                },
                { icon: Car, title: "Parking", desc: "Included garage space" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50"
                >
                  <item.icon className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-light text-xs sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.8 }}
              className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img
                src="/images/WhatsApp Image 2025-01-09 at 21.39.14.jpeg"
                alt="Ria Sea House Exterior"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"
              />
              {/* Beach-themed overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-400/10 to-transparent mix-blend-overlay"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
