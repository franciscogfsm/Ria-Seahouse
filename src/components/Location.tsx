import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Compass, Car, Ship } from 'lucide-react';

const Location: React.FC = () => {
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

  const attractions = [
    {
      icon: <Ship className="w-5 h-5 text-primary-600" />,
      title: 'Ria Formosa Natural Park',
      distance: '5 min drive',
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary-600" />,
      title: 'Tavira Island',
      distance: '15 min ferry ride',
    },
    {
      icon: <Compass className="w-5 h-5 text-primary-600" />,
      title: 'Tavira Town Center',
      distance: '10 min drive',
    },
    {
      icon: <Car className="w-5 h-5 text-primary-600" />,
      title: 'Faro Airport',
      distance: '35 min drive',
    },
  ];

  return (
    <section id="location" className="section bg-cream">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Location
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-2xl mx-auto">
            Perfectly situated in Cabanas de Tavira, with easy access to beaches, natural parks, and local attractions.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-medium mb-4">
              Nearby Attractions
            </motion.h3>
            
            <motion.div className="space-y-4">
              {attractions.map((attraction, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    {attraction.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{attraction.title}</h4>
                    <p className="text-sm text-gray-600">{attraction.distance}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-gray-700 mb-4">
                Our property is ideally located in the charming fishing village of Cabanas de Tavira, offering the perfect blend of relaxation and exploration opportunities.
              </p>
              <p className="text-gray-700">
                From here, you can easily explore the Eastern Algarve's most beautiful beaches, historic towns, and natural wonders.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="h-96 md:h-auto rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Ria Sea House Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12765.011482191424!2d-7.606351304199219!3d37.12999399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd10035ce0962881%3A0xa36b1d9244af173d!2sCabanas%20de%20Tavira%2C%20Portugal!5e0!3m2!1sen!2sus!4v1720376853988!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;