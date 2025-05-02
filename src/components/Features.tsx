import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Wifi,
  Tv,
  Coffee,
  Bath,
  UtensilsCrossed,
  Waves,
  Bed,
  ChefHat,
  Car,
  Wind,
  Warehouse,
  Palmtree,
  Sunset,
} from "lucide-react";

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Waves,
      title: "Beach Access",
      description: "Just 2 minutes walk to the stunning beach",
      color: "from-cyan-50 to-blue-50",
      iconColor: "text-cyan-500",
      category: "location",
    },
    {
      icon: Sunset,
      title: "Sea Views",
      description: "Beautiful sea and Ria Formosa views",
      color: "from-orange-50 to-pink-50",
      iconColor: "text-orange-500",
      category: "location",
    },
    {
      icon: Palmtree,
      title: "Beach Lifestyle",
      description: "Experience the perfect coastal living",
      color: "from-green-50 to-emerald-50",
      iconColor: "text-green-500",
      category: "location",
    },
    {
      icon: Bed,
      title: "3 Bedrooms",
      description: "Comfortable rooms with quality bedding",
      color: "from-indigo-50 to-blue-50",
      iconColor: "text-indigo-500",
      category: "rooms",
    },
    {
      icon: Bath,
      title: "3 Bathrooms",
      description: "Modern bathrooms with shower and essential amenities",
      color: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-500",
      category: "rooms",
    },
    {
      icon: ChefHat,
      title: "Fully Equipped Kitchen",
      description: "Modern appliances and all necessary cookware",
      color: "from-yellow-50 to-amber-50",
      iconColor: "text-yellow-600",
      category: "amenities",
    },
    {
      icon: UtensilsCrossed,
      title: "Dining Area",
      description: "Comfortable dining space for 6",
      color: "from-red-50 to-orange-50",
      iconColor: "text-red-500",
      category: "amenities",
    },
    {
      icon: Wind,
      title: "Air Conditioning",
      description: "Climate control in all rooms",
      color: "from-teal-50 to-cyan-50",
      iconColor: "text-teal-500",
      category: "comfort",
    },
    {
      icon: Wifi,
      title: "Free Wi-Fi",
      description: "High-speed internet throughout",
      color: "from-sky-50 to-blue-50",
      iconColor: "text-sky-500",
      category: "comfort",
    },
    {
      icon: Tv,
      title: "Smart TV",
      description: "Entertainment system with streaming",
      color: "from-purple-50 to-indigo-50",
      iconColor: "text-purple-500",
      category: "comfort",
    },
    {
      icon: Car,
      title: "Private Parking",
      description: "Secure parking space included",
      color: "from-slate-50 to-gray-100",
      iconColor: "text-slate-500",
      category: "amenities",
    },
    {
      icon: Coffee,
      title: "Coffee Machine",
      description: "Start your day with fresh coffee",
      color: "from-amber-50 to-yellow-50",
      iconColor: "text-amber-600",
      category: "amenities",
    },
  ];

  const categories = [
    { id: "location", label: "Location & Views" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "comfort", label: "Comfort" },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Beach-themed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-0 left-0 w-full h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAgMTAwIEMgODAgODAsIDEyMCA4MCwgMjAwIDEwMCBTIDEyMCAxMjAsIDAgMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNCREVCRkYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')]"
          style={{ opacity: 0.3 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Features & Amenities
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Experience the perfect blend of comfort and coastal living with our
            thoughtfully curated amenities
          </p>
        </motion.div>

        {categories.map((category) => (
          <div key={category.id} className="mb-12 last:mb-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-light text-gray-800 mb-6"
            >
              {category.label}
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {features
                .filter((feature) => feature.category === category.id)
                .map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                    }}
                    className={`bg-gradient-to-br ${feature.color} rounded-xl p-4 sm:p-6 transition-all duration-300`}
                  >
                    <div className="flex flex-col h-full">
                      <div className={`${feature.iconColor} mb-3`}>
                        <feature.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <h3 className="text-gray-900 font-medium text-sm sm:text-base mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm font-light">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
