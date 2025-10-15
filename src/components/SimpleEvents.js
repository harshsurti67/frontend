import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

const SimpleEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fallback mock data
  const mockEvents = [
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEvents();
        const items = response.data?.results || response.data;
        
        if (Array.isArray(items) && items.length > 0) {
          // Transform API data to match expected format and limit to 3 items
          const transformedEvents = items.slice(0, 3).map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            image: event.image || 'https://via.placeholder.com/400x300?text=Event+Image'
          }));
          setEvents(transformedEvents);
          setError(null);
        } else {
          // Use mock data if API returns no data (already limited to 3)
          setEvents(mockEvents);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
        // Use mock data as fallback
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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section style={{ 
        padding: '80px 0', 
        background: 'transparent',
        minHeight: '500px',
        position: 'relative',
        zIndex: 10
      }}>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <h3 style={{ color: '#4B0082' }}>Loading Events...</h3>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'transparent',
      minHeight: '500px',
      position: 'relative',
      zIndex: 10
    }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '1rem',
            fontFamily: 'Fredoka, cursive'
          }}>
            Upcoming Events
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Join us for exciting events and activities throughout the year
          </p>
          {error && (
            <div style={{ 
              color: '#ff6b6b', 
              fontSize: '0.9rem', 
              marginTop: '1rem',
              fontStyle: 'italic'
            }}>
              {error} - Showing sample events
            </div>
          )}
        </motion.div>

        <Row>
          {events.map((event, index) => (
            <Col md={4} key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{
                  background: index === 0 
                    ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' 
                    : index === 1 
                    ? 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)'
                    : 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                  borderRadius: '25px',
                  padding: '0',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  marginBottom: '2rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: index === 0 
                    ? '3px solid #64B5F6' 
                    : index === 1 
                    ? '3px solid #F06292'
                    : '3px solid #66BB6A'
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -15,
                  boxShadow: index === 0 
                    ? '0 20px 50px rgba(66, 165, 245, 0.3)' 
                    : index === 1 
                    ? '0 20px 50px rgba(236, 64, 122, 0.3)'
                    : '0 20px 50px rgba(102, 187, 106, 0.3)',
                  transition: { duration: 0.3 }
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: index === 0 
                      ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' 
                      : index === 1 
                      ? 'linear-gradient(135deg, #EC407A, #D81B60)'
                      : 'linear-gradient(135deg, #66BB6A, #43A047)',
                    color: 'white',
                    padding: '10px 18px',
                    borderRadius: '25px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    📅 {formatDate(event.date)}
                  </div>
                </div>
                
                <div style={{ 
                  padding: '2.5rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ 
                    color: index === 0 ? '#1E88E5' : index === 1 ? '#D81B60' : '#43A047',
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    fontFamily: 'Fredoka One, cursive',
                    fontWeight: 'bold'
                  }}>
                    {event.title}
                  </h4>
                  
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.7',
                    marginBottom: '1.8rem',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {event.description}
                  </p>
                  
                  <button 
                    style={{
                      background: index === 0 
                        ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' 
                        : index === 1 
                        ? 'linear-gradient(135deg, #EC407A, #D81B60)'
                        : 'linear-gradient(135deg, #66BB6A, #43A047)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 30px',
                      borderRadius: '30px',
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.3s ease',
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
                    Learn More
                  </button>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SimpleEvents;
