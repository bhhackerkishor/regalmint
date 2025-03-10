import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LandingAnimation = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "RegalMints";
  const colors = ["red", "blue", "green", "orange", "purple", "pink", "yellow", "cyan", "black", "brown"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 2000); // Simulate loading duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 500); // Change color every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "white",
        fontSize: "3rem",
        fontWeight: "bold",
        position: "fixed",
        width: "100%",
        top: 0,
      }}
      initial={{ y: "0%" }}
      animate={loadingComplete ? { y: "-100%" } : {}}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {text.split("" ).map((char, index) => (
          <span
            key={index}
            style={{ color: index === currentIndex ? colors[index % colors.length] : "black" }}
          >
            {char}
          </span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default LandingAnimation;
