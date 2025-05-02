import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram, Mail, Phone, Calendar, Users, MessageSquare, ArrowRight } from "lucide-react";

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    guests: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch('https://qaucsydrplnclnsauwwn.supabase.co/functions/v1/send-email2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          to: ["riaseahouse@gmail.com"],
          subject: `New Booking Inquiry from ${formData.name}`,
          html: `
            <h2>New Booking Inquiry</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Dates:</strong> ${formData.dates}</p>
            <p><strong>Number of Guests:</strong> ${formData.guests}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStatus({
        type: "success",
        message: "Thank you for your inquiry! We will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        dates: "",
        guests: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="section bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 py-16 md:py-24">
      <div className="container-custom max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4 px-5 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium"
          >
            Contact Us
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4 text-2xl md:text-4xl">
            Book Your Perfect Stay
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-700 max-w-xl mx-auto"
          >
            Ready to experience the beauty of Ria Sea House? We're here to help!
          </motion.p>
        </motion.div>

        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          {/* Quick Contact Options */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-10"
          >
            <motion.h3
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium mb-4"
            >
              Quick Contact
            </motion.h3>

            {/* Mobile Version - visible only on mobile */}
            <motion.div variants={itemVariants} className="space-y-4 md:hidden">
              <motion.a
                href="tel:+351962773707"
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-98 transform transition-all duration-200"
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-0.5">Call Us Now</h4>
                  <p className="text-primary-600 flex items-center justify-between text-sm whitespace-nowrap">
                    <span className="font-medium">+351 962 773 707</span>
                    <ArrowRight className="w-4 h-4 opacity-70 flex-shrink-0 ml-2" />
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:riaseahouse@gmail.com"
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-98 transform transition-all duration-200"
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-0.5">Email Us</h4>
                  <p className="text-primary-600 flex items-center justify-between text-sm">
                    <span className="font-medium truncate">riaseahouse@gmail.com</span>
                    <ArrowRight className="w-4 h-4 opacity-70 flex-shrink-0 ml-2" />
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/riaseahouse"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-98 transform transition-all duration-200"
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900 mb-0.5">Follow Us</h4>
                  <p className="text-primary-600 flex items-center justify-between text-sm">
                    <span className="font-medium">@riaseahouse</span>
                    <ArrowRight className="w-4 h-4 opacity-70 flex-shrink-0 ml-2" />
                  </p>
                </div>
              </motion.a>
            </motion.div>

            {/* Desktop Version - visible only on desktop */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <h3 className="text-2xl text-gray-900 font-normal mb-12">
                Quick Contact
              </h3>

              <div className="space-y-12">
                <div>
                  <h4 className="text-base text-gray-600 font-medium mb-4">Phone</h4>
                  <motion.a
                    href="tel:+351962773707"
                    className="group block"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <p className="text-xl text-primary-600 font-normal">
                      +351 962 773 707
                    </p>
                  </motion.a>
                </div>

                <div>
                  <h4 className="text-base text-gray-600 font-medium mb-4">Email</h4>
                  <motion.a
                    href="mailto:riaseahouse@gmail.com"
                    className="group block"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <p className="text-xl text-primary-600 font-normal">
                      riaseahouse@gmail.com
                    </p>
                  </motion.a>
                </div>

                <div>
                  <h4 className="text-base text-gray-600 font-medium mb-4">Social</h4>
                  <motion.a
                    href="https://www.instagram.com/riaseahouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <p className="text-xl text-primary-600 font-normal">
                      @riaseahouse
                    </p>
                  </motion.a>
                </div>

                <div className="bg-blue-50/80 rounded-xl p-6">
                  <p className="text-blue-600 text-lg font-medium mb-2">Available 24/7</p>
                  <p className="text-blue-500/90 text-base">We'll get back to you within 24 hours</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-10"
          >
            {status.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-4 rounded-xl ${
                  status.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 text-base"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 text-base"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="dates"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Dates
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="dates"
                      name="dates"
                      value={formData.dates}
                      onChange={handleChange}
                      placeholder="Jul 15-20"
                      className="w-full pl-11 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 text-base"
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Guests
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      max="8"
                      className="w-full pl-11 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 text-base"
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message (Optional)
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requests?"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 text-base"
                    disabled={isSubmitting}
                  ></textarea>
                  <div className="absolute left-3.5 top-4 text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 bg-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-600/20 hover:bg-primary-700 active:transform active:scale-98 transition-all duration-200 text-base mt-6 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Booking Request"}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
