import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { apiService } from '../services/api';
import '../components/EventsBackground.css';

const Events = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data as fallback
  const mockEvents = [
    {
      id: 1,
      title: "Spring Art Exhibition",
      description: "Join us for our annual spring art exhibition showcasing the creative works of our talented students.",
      date: "2024-03-15",
      time: "10:00 AM - 2:00 PM",
      location: "Main Hall",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      type: "Exhibition"
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      description: "Schedule your one-on-one meeting with your child's teacher to discuss their progress and development.",
      date: "2024-03-20",
      time: "9:00 AM - 5:00 PM",
      location: "Classrooms",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      type: "Conference"
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEvents();
        const data = response.data?.results || response.data;
        
        if (Array.isArray(data) && data.length > 0) {
          // Transform API data to match the expected format
          const transformedEvents = data.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            time: "10:00 AM - 2:00 PM", // Default time since API doesn't have time
            location: "Main Hall", // Default location since API doesn't have location
            image: event.image,
            type: "Event" // Default type since API doesn't have type
          }));
          setEvents(transformedEvents);
        } else {
          setEvents(mockEvents);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <PageTransition>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFB6C1 0%, #FFA500 100%)'
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <h3>Loading Events...</h3>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="events-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px',
        background: `
          linear-gradient(135deg, 
            #FFB6C1 0%, 
            #FFA500 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Floating Animated Elements */}
      <div className="events-background-elements">
        {/* Floating Event Icons */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            fontSize: '2rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎉
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            right: '8%',
            fontSize: '1.8rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, -360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
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
            top: '60%',
            left: '3%',
            fontSize: '2.2rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -35, 0],
            rotate: [0, 180, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 18,
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
            top: '40%',
            right: '3%',
            fontSize: '1.5rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, -180, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          🎭
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            fontSize: '1.8rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -28, 0],
            rotate: [0, 270, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
        >
          🎪
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '12%',
            fontSize: '2rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -32, 0],
            rotate: [0, -270, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        >
          🎨
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 1
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h1 style={{ 
            fontSize: '3rem', 
            color: '#4B0082', 
            marginBottom: '1rem',
            fontFamily: 'Fredoka, cursive'
          }}>
{t('events.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {t('events.subtitle')}
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
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '1rem', 
            borderRadius: '10px', 
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#dc3545'
          }}>
            <strong>⚠️ {error}</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
              Showing cached data. Please refresh the page.
            </p>
          </div>
        )}

        <Row>
          {(Array.isArray(events) ? events : []).map((event, index) => {
            const colors = getCardColors(index);
            return (
            <Col lg={6} md={12} key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  background: colors.bg,
                  borderRadius: '25px',
                  padding: '0',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  marginBottom: '3rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: `3px solid ${colors.border}`
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -15,
                  boxShadow: colors.shadow,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <div style={{ position: 'relative' }}>
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x250?text=Image+Not+Found';
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: colors.badge,
                    color: colors.textColor || 'white',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    🎉 {event.type}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: colors.title,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    📅 {formatDate(event.date)}
                  </div>
                </div>
                
                <div style={{ 
                  padding: '2.5rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h3 style={{ 
                    color: colors.title,
                    marginBottom: '1rem',
                    fontSize: '2rem',
                    fontFamily: 'Fredoka One, cursive',
                    fontWeight: 'bold',
                    lineHeight: '1.3'
                  }}>
                    {event.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.7',
                    marginBottom: '1.8rem',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {event.description}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '12px 18px',
                      borderRadius: '15px',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.8rem',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <span style={{ 
                        fontSize: '1.3rem',
                        color: colors.title
                      }}>🕐</span>
                      <span style={{ 
                        color: '#555', 
                        fontSize: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600'
                      }}>{event.time}</span>
                    </div>
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '12px 18px',
                      borderRadius: '15px',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.8rem',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <span style={{ 
                        fontSize: '1.3rem',
                        color: colors.title
                      }}>📍</span>
                      <span style={{ 
                        color: '#555', 
                        fontSize: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600'
                      }}>{event.location}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/events/${event.id}`}
                    style={{
                      background: colors.button,
                      color: colors.textColor || 'white',
                      border: 'none',
                      padding: '14px 30px',
                      borderRadius: '30px',
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'block',
                      textAlign: 'center',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      fontFamily: 'Poppins, sans-serif',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                    }}
                  >
                    🎯 Learn More
                  </Link>
                </div>
              </motion.div>
            </Col>
          );
          })}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white',
            marginTop: '3rem'
          }}
        >
          <h3 style={{ 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontFamily: 'Fredoka, cursive'
          }}>
            Stay Updated
          </h3>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Subscribe to our newsletter to receive updates about upcoming events and activities
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '12px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '1rem',
                minWidth: '250px',
                outline: 'none'
              }}
            />
            <button style={{
              background: 'white',
              color: '#4B0082',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </Container>
      </div>
    </PageTransition>
  );
};

export default Events;
