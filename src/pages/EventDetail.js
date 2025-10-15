import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { apiService } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEvents();
        const events = response.data?.results || response.data;
        
        if (Array.isArray(events)) {
          const foundEvent = events.find(e => e.id === parseInt(id));
          if (foundEvent) {
            setEvent(foundEvent);
          } else {
            setError('Event not found');
          }
        } else {
          setError('Failed to load event data');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFB6C1 0%, #FFA500 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <h3>Loading Event...</h3>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFB6C1 0%, #FFA500 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <h3>{error || 'Event not found'}</h3>
          <Link 
            to="/events"
            style={{
              color: 'white',
              textDecoration: 'underline',
              marginTop: '1rem',
              display: 'block'
            }}
          >
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
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
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {/* Floating Event Icons */}
        <motion.div
          style={{
            position: 'absolute',
            top: '8%',
            left: '3%',
            fontSize: '2.5rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎉
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            fontSize: '2rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, -360, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          🎊
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '65%',
            left: '2%',
            fontSize: '2.8rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -45, 0],
            rotate: [0, 180, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          🎈
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '45%',
            right: '2%',
            fontSize: '2.2rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -35, 0],
            rotate: [0, -180, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 9
          }}
        >
          🎭
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '8%',
            fontSize: '2.3rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -38, 0],
            rotate: [0, 270, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 12
          }}
        >
          🎪
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '35%',
            right: '10%',
            fontSize: '2.6rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -42, 0],
            rotate: [0, -270, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
        >
          🎨
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '35%',
            left: '1%',
            fontSize: '1.8rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 18
          }}
        >
          🎵
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: '75%',
            right: '7%',
            fontSize: '2.1rem',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            y: [0, -33, 0],
            rotate: [0, -90, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 21
          }}
        >
          🎯
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 1
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8
            }}
          />
        ))}
        
        {/* Floating Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: 'rgba(255, 215, 0, 0.6)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 1
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 6
            }}
          />
        ))}
      </div>
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link 
            to="/events"
            style={{
              background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
              color: 'white',
              textDecoration: 'none',
              padding: '12px 25px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '2rem',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            ← Back to Events
          </Link>

          {/* Event Header */}
          <div style={{ 
            marginBottom: '3rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
              color: 'white',
              padding: '10px 25px',
              borderRadius: '25px',
              display: 'inline-block',
              fontSize: '1rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)',
              fontFamily: 'Poppins, sans-serif'
            }}>
              🎉 Event
            </div>
            
            <h1 style={{ 
              fontSize: '3.5rem', 
              background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              fontFamily: 'Fredoka One, cursive',
              lineHeight: '1.2',
              textAlign: 'center'
            }}>
              {event.title}
            </h1>
            
            <p style={{ 
              fontSize: '1.4rem', 
              color: '#555',
              marginBottom: '2rem',
              lineHeight: '1.6',
              textAlign: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontStyle: 'italic'
            }}>
              {event.description}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '2rem',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
                padding: '15px 25px',
                borderRadius: '20px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                color: '#1E88E5',
                boxShadow: '0 4px 15px rgba(30, 136, 229, 0.2)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📅</span>
                <div>
                  <div style={{ 
                    fontWeight: '700', 
                    color: '#1E88E5',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>Event Date</div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#555',
                    fontFamily: 'Poppins, sans-serif'
                  }}>{formatDate(event.date)}</div>
                </div>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
                padding: '15px 25px',
                borderRadius: '20px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                color: '#8E24AA',
                boxShadow: '0 4px 15px rgba(142, 36, 170, 0.2)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span>
                <div>
                  <div style={{ 
                    fontWeight: '700', 
                    color: '#8E24AA',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>Location</div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#555',
                    fontFamily: 'Poppins, sans-serif'
                  }}>Kidoo Preschool</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ 
              width: '100%', 
              height: '600px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                top: '20%',
                right: '20%',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              
              <motion.img
                src={event.image}
                alt={event.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '20px',
                  position: 'relative',
                  zIndex: 2
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Event Content */}
          <Row>
            <Col lg={8}>
              <motion.div 
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '25px',
                  padding: '3.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                  marginBottom: '3rem',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                  transition: { duration: 0.3 }
                }}
              >
                <h2 style={{
                  background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '2.5rem',
                  marginBottom: '2rem',
                  fontFamily: 'Fredoka One, cursive',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  🎉 About This Event
                </h2>
                
                <div style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '2.5rem',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  {event.description}
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                  color: 'white',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(66, 165, 245, 0.3)'
                }}>
                  <h3 style={{ 
                    marginBottom: '1.5rem', 
                    fontFamily: 'Fredoka One, cursive',
                    fontSize: '1.8rem'
                  }}>
                    🎯 Join Us for This Special Event!
                  </h3>
                  <p style={{ 
                    marginBottom: '2rem', 
                    opacity: 0.9,
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Don't miss out on this exciting opportunity. Contact us to register or get more information.
                  </p>
                  <Link
                    to="/contact"
                    style={{
                      background: 'white',
                      color: '#1E88E5',
                      padding: '15px 35px',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      fontSize: '1.1rem',
                      boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    📞 Contact Us
                  </Link>
                </div>
              </motion.div>
            </Col>
            
            <Col lg={4}>
              <motion.div 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px',
                  padding: '2.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                  marginBottom: '2rem',
                  position: 'sticky',
                  top: '120px',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  x: -5,
                  boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                  transition: { duration: 0.3 }
                }}
              >
                <h4 style={{ 
                  background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '2rem',
                  fontFamily: 'Fredoka One, cursive',
                  fontSize: '1.8rem',
                  textAlign: 'center'
                }}>
                  📋 Event Details
                </h4>
                
                <div style={{ 
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #64B5F6'
                }}>
                  <div style={{ 
                    fontWeight: '700', 
                    color: '#1E88E5', 
                    marginBottom: '0.8rem',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📅 Date & Time
                  </div>
                  <div style={{ 
                    color: '#555', 
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600'
                  }}>
                    {formatDate(event.date)}
                  </div>
                </div>

                <div style={{ 
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #BA68C8'
                }}>
                  <div style={{ 
                    fontWeight: '700', 
                    color: '#8E24AA', 
                    marginBottom: '0.8rem',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📍 Location
                  </div>
                  <div style={{ 
                    color: '#555', 
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600'
                  }}>
                    Kidoo Preschool<br />
                    Main Campus
                  </div>
                </div>

                <div style={{ 
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, #FFF9C4, #FFF59D)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #FDD835'
                }}>
                  <div style={{ 
                    fontWeight: '700', 
                    color: '#F57F17', 
                    marginBottom: '0.8rem',
                    fontSize: '1.1rem',
                    fontFamily: 'Poppins, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    👥 Audience
                  </div>
                  <div style={{ 
                    color: '#555', 
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600'
                  }}>
                    Students, Parents & Families
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #FFE0B2, #FFCC80)',
                  color: '#F57C00',
                  padding: '2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '2px solid #FFA726'
                }}>
                  <h5 style={{ 
                    marginBottom: '1.5rem', 
                    fontFamily: 'Fredoka One, cursive',
                    fontSize: '1.4rem'
                  }}>
                    ❓ Questions?
                  </h5>
                  <p style={{ 
                    fontSize: '1rem', 
                    marginBottom: '1.5rem', 
                    opacity: 0.9,
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Contact us for more information about this event.
                  </p>
                  <Link
                    to="/contact"
                    style={{
                      background: 'white',
                      color: '#F57C00',
                      padding: '12px 25px',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '1rem',
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    💬 Get in Touch
                  </Link>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default EventDetail;
