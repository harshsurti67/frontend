import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaSchool, FaTrophy, FaHeart, FaGraduationCap, FaStar } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { apiService } from '../services/api';
import './QuickStats.css';

gsap.registerPlugin(ScrollTrigger);

const QuickStats = () => {
  const [counts, setCounts] = useState({});
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  // Icon mapping for dynamic icon loading
  const iconMap = {
    FaUsers,
    FaSchool,
    FaTrophy,
    FaHeart,
    FaGraduationCap,
    FaStar
  };

  // Fallback mock data
  const mockStats = [
    {
      id: 'students',
      stat_type: 'students',
      icon: 'FaUsers',
      value: 500,
      label: 'Happy Students',
      color: 'var(--primary-blue)',
      suffix: '+'
    },
    {
      id: 'branches',
      stat_type: 'branches',
      icon: 'FaSchool',
      value: 8,
      label: 'Branches',
      color: 'var(--secondary-teal)',
      suffix: ''
    },
    {
      id: 'awards',
      stat_type: 'awards',
      icon: 'FaTrophy',
      value: 25,
      label: 'Awards Won',
      color: 'var(--warm-yellow)',
      suffix: '+'
    },
    {
      id: 'teachers',
      stat_type: 'teachers',
      icon: 'FaHeart',
      value: 50,
      label: 'Expert Teachers',
      color: 'var(--soft-pink)',
      suffix: '+'
    },
    {
      id: 'years',
      stat_type: 'years',
      icon: 'FaGraduationCap',
      value: 15,
      label: 'Years Experience',
      color: 'var(--accent-indigo)',
      suffix: '+'
    },
    {
      id: 'satisfaction',
      stat_type: 'satisfaction',
      icon: 'FaStar',
      value: 98,
      label: 'Parent Satisfaction',
      color: 'var(--primary-blue)',
      suffix: '%'
    }
  ];

  // Fetch stats data from API
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHomeStats();
        const items = response.data?.results || response.data;
        
        if (Array.isArray(items) && items.length > 0) {
          // Transform API data to match expected format
          const transformedStats = items.map(stat => ({
            id: stat.stat_type,
            stat_type: stat.stat_type,
            icon: stat.icon,
            value: stat.value,
            label: stat.label,
            color: stat.color,
            suffix: stat.suffix
          }));
          setStats(transformedStats);
          setError(null);
        } else {
          // Use mock data if API returns no data
          setStats(mockStats);
        }
      } catch (err) {
        console.error('Error fetching stats data:', err);
        setError('Failed to load stats data');
        // Use mock data as fallback
        setStats(mockStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStatsData();
  }, []);

  const animateCount = (endValue, duration = 2000) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      return currentValue;
    };

    return updateCount;
  };

  useEffect(() => {
    if (isInView && stats.length > 0) {
      const intervals = {};
      
      stats.forEach(stat => {
        const updateCount = animateCount(stat.value);
        let startTime = Date.now();
        
        intervals[stat.id] = setInterval(() => {
          const elapsed = Date.now() - startTime;
          if (elapsed >= 2000) {
            setCounts(prev => ({ ...prev, [stat.id]: stat.value }));
            clearInterval(intervals[stat.id]);
          } else {
            const currentValue = updateCount();
            setCounts(prev => ({ ...prev, [stat.id]: currentValue }));
          }
        }, 16); // ~60fps
      });

      return () => {
        Object.values(intervals).forEach(interval => clearInterval(interval));
      };
    }
  }, [isInView, stats]);

  // GSAP Scroll-triggered animations
  useEffect(() => {
    if (statsRef.current) {
      // Animate stat cards on scroll
      gsap.fromTo(statsRef.current.children, 
        {
          y: 50,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate icons with rotation
      gsap.to(statsRef.current.querySelectorAll('.stat-icon'), {
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
        damping: 15,
        delay: 0.2
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="quick-stats-section" ref={ref} style={{ 
        padding: '80px 0',
        background: 'transparent'
      }}>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#4B0082' }}>Loading Stats...</h3>
          </div>
        </Container>
      </section>
    );
  }

  // Don't render if no stats
  if (stats.length === 0) {
    return null;
  }

  return (
    <section className="quick-stats-section" ref={ref}>
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
          {error} - Using sample stats
        </div>
      )}
      <Container>
        <motion.div
          ref={statsRef}
          className="stats-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Row className="g-4">
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || FaUsers; // Fallback to FaUsers
              return (
                <Col lg={2} md={4} sm={6} key={stat.id}>
                  <motion.div
                    className="stat-card"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className="stat-icon"
                      variants={iconVariants}
                      style={{ color: stat.color }}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <IconComponent />
                    </motion.div>
                    
                    <motion.div
                      className="stat-number"
                      style={{ color: stat.color }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    >
                      {counts[stat.id] || 0}{stat.suffix}
                    </motion.div>
                    
                    <motion.div
                      className="stat-label"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ 
                        delay: 0.8 + index * 0.1,
                        duration: 0.5
                      }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default QuickStats;
