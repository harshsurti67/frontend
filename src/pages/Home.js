import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import QuickStats from '../components/QuickStats';
import SimplePrograms from '../components/SimplePrograms';
import SimpleGallery from '../components/SimpleGallery';
import SimpleTestimonials from '../components/SimpleTestimonials';
import SimpleEvents from '../components/SimpleEvents';
import SimpleContact from '../components/SimpleContact';
import Footer from '../components/Footer';
import '../components/HomeBackground.css';

const Home = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="home-page"
      style={{ 
        minHeight: '100vh', 
        background: `
          linear-gradient(135deg, 
            #87CEEB 0%, 
            #FFB6C1 50%, 
            #FFE4B5 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Enhanced Floating Background Elements */}
      <div className="home-background-elements">
        {/* Floating Clouds */}
        <motion.div
          className="floating-cloud cloud-1"
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☁️
        </motion.div>
        <motion.div
          className="floating-cloud cloud-2"
          animate={{
            x: [0, -30, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          ☁️
        </motion.div>
        <motion.div
          className="floating-cloud cloud-3"
          animate={{
            x: [0, 40, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          ☁️
        </motion.div>

        {/* Floating Balloons */}
        <motion.div
          className="floating-balloon balloon-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎈
        </motion.div>
        <motion.div
          className="floating-balloon balloon-2"
          animate={{
            y: [0, -25, 0],
            rotate: [0, -3, 3, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🎈
        </motion.div>
        <motion.div
          className="floating-balloon balloon-3"
          animate={{
            y: [0, -35, 0],
            rotate: [0, 4, -4, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          🎈
        </motion.div>

        {/* Floating Kites */}
        <motion.div
          className="floating-kite kite-1"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🪁
        </motion.div>
        <motion.div
          className="floating-kite kite-2"
          animate={{
            x: [0, -25, 0],
            y: [0, -20, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🪁
        </motion.div>

        {/* Floating Stars */}
        <motion.div
          className="floating-star star-1"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="floating-star star-2"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="floating-star star-3"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          ⭐
        </motion.div>
      </div>
      
      <Hero />
      
      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>
      
      <QuickStats />
      
      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>
      
      <SimplePrograms />
      
      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>
      
      <SimpleGallery />
      <SimpleTestimonials />
      <SimpleEvents />
      <SimpleContact />
      <Footer />
    </motion.div>
  );
};

export default Home;
