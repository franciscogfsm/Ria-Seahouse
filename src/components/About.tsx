import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Home, Car, Bed, Bath, Thermometer, Sun } from "lucide-react";

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

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-wide text-center">
            Your Dream Beachfront Escape
          </h2>
          <p className="text-center text-gray-600 text-lg font-light">
            Modern duplex apartment • 173m² • Ocean views • 2 min to beach
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_600px] gap-8 lg:gap-16 items-center mt-16">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="order-2 lg:order-1 lg:pl-8"
          >
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 sm:gap-6"
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
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex flex-col items-start p-4 sm:p-5 rounded-xl transition-all duration-200 hover:bg-white/80 hover:shadow-lg bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50"
                >
                  <item.icon className="w-6 h-6 text-blue-400 mb-3 flex-shrink-0" />
                  <div className="w-full">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
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

          <div className="order-1 lg:order-2 mx-auto lg:mx-0 lg:flex lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] lg:w-[600px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mx-auto lg:mx-0"
            >
              <img
                src="/images/saida1.avif"
                alt="Ria Sea House Exterior"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
