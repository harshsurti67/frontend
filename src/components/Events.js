import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { apiService } from '../services/api';
import { formatDate, formatDateTime } from '../utils/helpers';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: 'Spring Art Exhibition',
        description: 'Come see the amazing artwork created by our talented students! The exhibition will showcase paintings, drawings, and crafts from all age groups.',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        title: 'Parent-Teacher Conference',
        description: 'Scheduled meetings with teachers to discuss your child\'s progress, achievements, and areas for development. Please book your appointment.',
        date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 3,
        title: 'Summer Camp Registration',
        description: 'Registration opens for our exciting summer camp program! Activities include swimming, arts and crafts, field trips, and educational games.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEvents();
        console.log('Events API Response:', response.data); // Debug log
        const items = response.data?.results || response.data;
        
        if (Array.isArray(items) && items.length > 0) {
          console.log('Events setting API data:', items); // Debug log
          setEvents(items);
          setError(null);
        } else {
          console.log('Events using mock data'); // Debug log
          setEvents(mockData);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
        console.log('Events using mock data due to error'); // Debug log
        setEvents(mockData);
        setError('Failed to load events');
        // Set mock data as fallback
        const mockData = [
          {
            id: 1,
            title: 'Spring Art Exhibition',
            description: 'Come see the amazing artwork created by our talented students! The exhibition will showcase paintings, drawings, and crafts from all age groups.',
            date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 2,
            title: 'Parent-Teacher Conference',
            description: 'Scheduled meetings with teachers to discuss your child\'s progress, achievements, and areas for development. Please book your appointment.',
            date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 3,
            title: 'Summer Camp Registration',
            description: 'Registration opens for our exciting summer camp program! Activities include swimming, arts and crafts, field trips, and educational games.',
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          }
        ];
        setEvents(mockData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
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

  const getCardColors = (index) => {
    const colors = [
      { bg: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', border: '#64B5F6', badge: 'linear-gradient(135deg, #42A5F5, #1E88E5)', title: '#1E88E5', button: 'linear-gradient(135deg, #42A5F5, #1E88E5)', shadow: '0 20px 50px rgba(66, 165, 245, 0.3)', check: '#42A5F5' },
      { bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', border: '#BA68C8', badge: 'linear-gradient(135deg, #AB47BC, #8E24AA)', title: '#8E24AA', button: 'linear-gradient(135deg, #AB47BC, #8E24AA)', shadow: '0 20px 50px rgba(171, 71, 188, 0.3)', check: '#AB47BC' },
      { bg: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)', border: '#FDD835', badge: 'linear-gradient(135deg, #FFEB3B, #FBC02D)', title: '#F57F17', button: 'linear-gradient(135deg, #FFEB3B, #FBC02D)', shadow: '0 20px 50px rgba(255, 235, 59, 0.4)', check: '#FFEB3B', textColor: '#333' },
      { bg: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', border: '#FFA726', badge: 'linear-gradient(135deg, #FF9800, #F57C00)', title: '#F57C00', button: 'linear-gradient(135deg, #FF9800, #F57C00)', shadow: '0 20px 50px rgba(255, 152, 0, 0.3)', check: '#FF9800' },
      { bg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', border: '#66BB6A', badge: 'linear-gradient(135deg, #66BB6A, #43A047)', title: '#43A047', button: 'linear-gradient(135deg, #66BB6A, #43A047)', shadow: '0 20px 50px rgba(102, 187, 106, 0.3)', check: '#66BB6A' },
      { bg: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', border: '#F06292', badge: 'linear-gradient(135deg, #E91E63, #C2185B)', title: '#C2185B', button: 'linear-gradient(135deg, #E91E63, #C2185B)', shadow: '0 20px 50px rgba(233, 30, 99, 0.3)', check: '#E91E63' }
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section className="events-section">
        <Container>
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="events-section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Animated Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {/* Floating Event Icons */}
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            left: '3%',
            fontSize: '1.5rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎉
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '25%',
            right: '5%',
            fontSize: '1.3rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, -360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🎊
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '70%',
            left: '2%',
            fontSize: '1.8rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          🎈
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            right: '2%',
            fontSize: '1.2rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, -180, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          🎭
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 1
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>
      
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Join us for exciting activities, educational workshops, and special celebrations
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🔄 Refresh Events
          </button>
        </motion.div>

        {error && (
          <div className="alert alert-warning text-center">
            {error}
          </div>
        )}

        <motion.div
          className="events-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Row className="g-4">
            {(Array.isArray(events) ? events : []).map((event, index) => {
              const colors = getCardColors(index);
              return (
              <Col lg={4} md={6} key={event.id}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div style={{
                    background: colors.bg,
                    borderRadius: '25px',
                    padding: '0',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    border: `3px solid ${colors.border}`
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: colors.badge,
                        color: colors.textColor || 'white',
                        padding: '8px 15px',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        fontFamily: 'Poppins, sans-serif'
                      }}>
                        🎉 Event
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: colors.title,
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <FaCalendarAlt style={{ fontSize: '0.8rem' }} />
                        <span>{new Date(event.date).getDate()}</span>
                        <span>{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                      </div>
                    </div>
                    
                    <div style={{ 
                      padding: '2rem',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h3 style={{ 
                        color: colors.title,
                        marginBottom: '1rem',
                        fontSize: '1.5rem',
                        fontFamily: 'Fredoka One, cursive',
                        fontWeight: 'bold',
                        lineHeight: '1.3'
                      }}>
                        {event.title}
                      </h3>
                      
                      <p style={{ 
                        color: '#555', 
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        fontSize: '0.95rem',
                        fontFamily: 'Poppins, sans-serif'
                      }}>
                        {event.description}
                      </p>

                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '0.8rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ 
                          background: 'rgba(255, 255, 255, 0.7)',
                          padding: '10px 15px',
                          borderRadius: '12px',
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.8rem',
                          backdropFilter: 'blur(10px)'
                        }}>
                          <FaClock style={{ 
                            color: colors.title,
                            fontSize: '1rem'
                          }} />
                          <span style={{ 
                            color: '#555', 
                            fontSize: '0.9rem',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '600'
                          }}>{formatDateTime(event.date)}</span>
                        </div>
                        <div style={{ 
                          background: 'rgba(255, 255, 255, 0.7)',
                          padding: '10px 15px',
                          borderRadius: '12px',
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.8rem',
                          backdropFilter: 'blur(10px)'
                        }}>
                          <FaMapMarkerAlt style={{ 
                            color: colors.title,
                            fontSize: '1rem'
                          }} />
                          <span style={{ 
                            color: '#555', 
                            fontSize: '0.9rem',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '600'
                          }}>Kidoo Preschool</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/events/${event.id}`}
                        style={{
                          background: colors.button,
                          color: colors.textColor || 'white',
                          border: 'none',
                          padding: '12px 25px',
                          borderRadius: '25px',
                          fontSize: '1rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          width: '100%',
                          transition: 'all 0.3s ease',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                          fontFamily: 'Poppins, sans-serif'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                        }}
                      >
                        Learn More
                        <FaArrowRight style={{ fontSize: '0.9rem' }} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </Col>
            );
            })}
          </Row>
        </motion.div>

        <motion.div
          className="events-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            as={Link}
            to="/events"
            className="btn-view-all-events"
            variant="outline-primary"
            size="lg"
          >
            View All Events
            <FaArrowRight className="ms-2" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default Events;
