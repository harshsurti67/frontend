import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChild } from 'react-icons/fa';
import './Preloader.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="preloader-content">
            {/* Animated Logo */}
            <motion.div
              className="logo-container"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2
              }}
            >
              <motion.div
                className="logo-icon"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaChild />
              </motion.div>
            </motion.div>

            {/* School Name */}
            <motion.h1
              className="school-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Kidoo Preschool
            </motion.h1>

            {/* Loading Dots */}
            <motion.div
              className="loading-dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="dot"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Shapes */}
            <div className="floating-shapes">
              <motion.div
                className="shape shape-1"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="shape shape-2"
                animate={{
                  y: [0, -15, 0],
                  x: [0, -8, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div
                className="shape shape-3"
                animate={{
                  y: [0, -25, 0],
                  x: [0, 12, 0],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
