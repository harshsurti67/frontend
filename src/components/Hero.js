import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaChild, FaGraduationCap, FaHeart, FaStar, FaRocket } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/api';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const heroRef = useRef(null);
  const floatingShapesRef = useRef(null);
  const videoRefs = useRef({});

  // Fallback mock data with translations
  const mockSlides = [
    {
      id: 1,
      title: t('home.hero.slides.slide1.title'),
      subtitle: t('home.hero.slides.slide1.subtitle'),
      description: t('home.hero.slides.slide1.description'),
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      button_text: t('home.hero.slides.slide1.button_text'),
      button_url: "/programs"
    },
    {
      id: 2,
      title: t('home.hero.slides.slide2.title'),
      subtitle: t('home.hero.slides.slide2.subtitle'),
      description: t('home.hero.slides.slide2.description'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      button_text: t('home.hero.slides.slide2.button_text'),
      button_url: "/about"
    },
    {
      id: 3,
      title: t('home.hero.slides.slide3.title'),
      subtitle: t('home.hero.slides.slide3.subtitle'),
      description: t('home.hero.slides.slide3.description'),
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      button_text: t('home.hero.slides.slide3.button_text'),
      button_url: "/admissions"
    }
  ];

  // Fetch slider data from API
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHomeSlider();
        const items = response.data?.results || response.data;
        
        if (Array.isArray(items) && items.length > 0) {
          // Transform API data to match expected format
          const transformedSlides = items.map(slide => ({
            id: slide.id,
            title: slide.title,
            subtitle: slide.subtitle,
            description: slide.subtitle, // Using subtitle as description
            image: slide.image,
            media_type: slide.media_type,
            media_url: slide.media_url,
            poster_url: slide.poster_url,
            button_text: slide.button_text,
            button_url: slide.button_url
          }));
          
          // Debug: Log the transformed slides to see if video data is present
          console.log('🎬 Transformed slides:', transformedSlides);
          transformedSlides.forEach((slide, index) => {
            if (slide.media_type === 'video') {
              console.log(`🎥 Video slide ${index}:`, {
                title: slide.title,
                media_type: slide.media_type,
                media_url: slide.media_url,
                poster_url: slide.poster_url
              });
            }
          });
          
          setHeroSlides(transformedSlides);
          setError(null);
        } else {
          // Use mock data if API returns no data
          setHeroSlides(mockSlides);
        }
      } catch (err) {
        console.error('Error fetching slider data:', err);
        setError('Failed to load slider data');
        // Use mock data as fallback
        setHeroSlides(mockSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // Auto-advance slides (only for non-video slides)
  useEffect(() => {
    if (heroSlides.length > 0) {
      const currentSlideData = heroSlides[currentSlide];
      
      // Only set interval for non-video slides
      if (!currentSlideData || currentSlideData.media_type !== 'video') {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);

        return () => clearInterval(interval);
      }
    }
  }, [heroSlides.length, currentSlide, heroSlides]);

  // GSAP Animations
  useEffect(() => {
    if (floatingShapesRef.current) {
      // Animate floating shapes
      gsap.to(floatingShapesRef.current.children, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.2
      });

      // Parallax effect on scroll
      gsap.to(floatingShapesRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  // Handle video end event
  const handleVideoEnd = () => {
    console.log('🎬 Video ended, advancing to next slide');
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Ensure video plays when slide becomes active
  useEffect(() => {
    const currentSlideData = heroSlides[currentSlide];
    if (currentSlideData && currentSlideData.media_type === 'video') {
      const videoElement = videoRefs.current[currentSlideData.id];
      if (videoElement) {
        videoElement.currentTime = 0; // Reset to beginning
        videoElement.play().catch(console.error);
        console.log(`🎬 Playing video for slide ${currentSlideData.id}`);
      }
    }
  }, [currentSlide, heroSlides]);

  // Show loading state
  if (loading) {
    return (
      <section className="hero-section" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #87CEEB 0%, #FFB6C1 50%, #FFE4B5 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎈</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading...</h2>
            <p>Preparing your amazing experience</p>
          </div>
        </Container>
      </section>
    );
  }

  // Don't render if no slides
  if (heroSlides.length === 0) {
    return null;
  }

  return (
    <section className="hero-section">
      {error && (
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          background: 'rgba(255, 0, 0, 0.8)', 
          color: 'white', 
          padding: '10px 15px', 
          borderRadius: '5px',
          fontSize: '0.9rem',
          zIndex: 1000
        }}>
          {error} - Using sample content
        </div>
      )}
      <Carousel
        activeIndex={currentSlide}
        onSelect={setCurrentSlide}
        controls={false}
        indicators={false}
        interval={6000}
        className="hero-carousel"
      >
        {heroSlides.map((slide, index) => {
          // Debug: Log each slide being rendered
          console.log(`🎬 Rendering slide ${index}:`, {
            id: slide.id,
            title: slide.title,
            media_type: slide.media_type,
            media_url: slide.media_url,
            has_video: slide.media_type === 'video' && slide.media_url
          });
          
          return (
          <Carousel.Item key={slide.id}>
            <div className="hero-slide">
              {slide.media_type === 'video' && slide.media_url ? (
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[slide.id] = el;
                    }
                  }}
                  className="hero-video"
                  autoPlay
                  muted
                  playsInline
                  poster={slide.poster_url}
                  onEnded={handleVideoEnd}
                  onLoadedData={() => {
                    console.log(`🎬 Video ${slide.id} loaded and ready`);
                  }}
                  onError={(e) => {
                    console.error(`❌ Video ${slide.id} error:`, e);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                  }}
                >
                  <source src={slide.media_url} type="video/mp4" />
                  <source src={slide.media_url} type="video/mov" />
                  <source src={slide.media_url} type="video/avi" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  className="hero-image"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${slide.image || slide.media_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1
                  }}
                />
              )}
              <div
                className="hero-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
                  zIndex: 2
                }}
              />
              <Container>
                <Row className="align-items-center min-vh-100">
                  <Col lg={6}>
                    <motion.div
                      className="hero-content"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      key={slide.id}
                      style={{ position: 'relative', zIndex: 3 }}
                    >
                      <motion.div
                        className="hero-badges"
                        variants={itemVariants}
                      >
                        <motion.span
                          className="hero-badge"
                          variants={iconVariants}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <FaChild />
                        </motion.span>
                        <motion.span
                          className="hero-badge"
                          variants={iconVariants}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          <FaGraduationCap />
                        </motion.span>
                        <motion.span
                          className="hero-badge"
                          variants={iconVariants}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <FaHeart />
                        </motion.span>
                      </motion.div>

                      <motion.h1
                        className="hero-title"
                        variants={itemVariants}
                        style={{
                          fontSize: '3rem',
                          fontFamily: 'Fredoka One, cursive',
                          background: 'linear-gradient(90deg, #FDD835 0%, #E53935 25%, #43A047 50%, #FB8C00 75%, #1E88E5 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: 'none',
                          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                          lineHeight: '1.2',
                          marginBottom: '1rem',
                          width: '100%',
                          whiteSpace: 'normal',
                          wordWrap: 'break-word'
                        }}
                      >
                        {slide.title} 🎈
                      </motion.h1>

                      <motion.h2
                        className="hero-subtitle"
                        variants={itemVariants}
                        style={{
                          fontSize: '1.6rem',
                          fontFamily: 'Baloo 2, cursive',
                          color: 'white',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                        }}
                      >
                        {slide.subtitle}
                      </motion.h2>


                      <motion.div
                        className="hero-actions"
                        variants={itemVariants}
                      >
                        <Button
                          as={Link}
                          to={slide.button_url}
                          className="btn-hero-primary glow-button"
                          size="lg"
                          style={{
                            background: 'linear-gradient(45deg, #87CEEB, #20B2AA)',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '15px 30px',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            boxShadow: '0 8px 25px rgba(135, 206, 235, 0.4)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {slide.button_text}
                          <FaArrowRight className="ms-2" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          );
        })}
      </Carousel>

      {/* Custom Indicators */}
      <div className="hero-indicators">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: index === currentSlide ? 1.2 : 1,
              backgroundColor: index === currentSlide ? '#87CEEB' : 'rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Shapes */}
      <div className="floating-shapes" ref={floatingShapesRef}>
        {/* Balloons */}
        <div className="floating-balloon balloon-1">
          <FaChild />
        </div>
        <div className="floating-balloon balloon-2">
          <FaStar />
        </div>
        <div className="floating-balloon balloon-3">
          <FaHeart />
        </div>
        <div className="floating-balloon balloon-4">
          <FaRocket />
        </div>
        
        {/* Abstract Shapes */}
        <div className="abstract-shape shape-1"></div>
        <div className="abstract-shape shape-2"></div>
        <div className="abstract-shape shape-3"></div>
        <div className="abstract-shape shape-4"></div>
        <div className="abstract-shape shape-5"></div>
        
        {/* Clouds */}
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="scroll-arrow">
          <div className="scroll-line"></div>
        </div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
