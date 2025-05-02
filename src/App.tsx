import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Force scroll restoration to manual
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    // Clear hash from URL without triggering scroll
    const clearHash = () => {
      const uri = window.location.toString();
      if (uri.indexOf("#") > 0) {
        const cleanUri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, cleanUri);
      }
    };

    // Handle page load and refresh
    const handleInitialScroll = () => {
      clearHash(); // Clear hash first
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };

    // Call immediately
    handleInitialScroll();

    // Add event listener for page refresh/reload
    window.addEventListener("beforeunload", handleInitialScroll);

    return () => {
      window.removeEventListener("beforeunload", handleInitialScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      <main className="scroll-smooth">
        <Hero />
        <About />
        <Gallery />
        <Features />
        <Location />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
