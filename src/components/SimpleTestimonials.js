import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

const SimpleTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTestimonials();
        console.log('API Response:', response.data); // Debug log
        const testimonialsData = response.data.results || response.data;
        console.log('Testimonials Data:', testimonialsData); // Debug log
        if (testimonialsData && testimonialsData.length > 0) {
          setTestimonials(testimonialsData);
          setError(null);
        } else {
          setError('No testimonials available');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          color: index < rating ? '#FFD700' : '#DDD',
          fontSize: '1.2rem',
          marginRight: '2px'
        }}
      >
        ★
      </span>
    ));
  };

  // Show loading state
  if (loading) {
    return (
      <section style={{ 
        padding: '80px 0', 
        background: 'transparent',
        minHeight: '400px',
        position: 'relative',
        zIndex: 10
      }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#4B0082', 
              marginBottom: '1rem',
              fontFamily: 'Fredoka, cursive'
            }}>
              What Parents Say
            </h2>
            <div style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              marginTop: '2rem'
            }}>
              Loading testimonials...
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Show error state
  if (error || testimonials.length === 0) {
    return (
      <section style={{ 
        padding: '80px 0', 
        background: 'transparent',
        minHeight: '400px',
        position: 'relative',
        zIndex: 10
      }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#4B0082', 
              marginBottom: '1rem',
              fontFamily: 'Fredoka, cursive'
            }}>
              What Parents Say
            </h2>
            <div style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              marginTop: '2rem'
            }}>
              {error || 'No testimonials available at the moment.'}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'transparent',
      minHeight: '400px',
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
            What Parents Say
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Hear from our happy families about their Kidoo Preschool experience
          </p>
        </motion.div>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          style={{
            background: currentIndex % 3 === 0 
              ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' 
              : currentIndex % 3 === 1 
              ? 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)'
              : 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
            borderRadius: '25px',
            padding: '3.5rem',
            boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
            maxWidth: '850px',
            margin: '0 auto',
            textAlign: 'center',
            border: currentIndex % 3 === 0 
              ? '3px solid #64B5F6' 
              : currentIndex % 3 === 1 
              ? '3px solid #F06292'
              : '3px solid #FDD835',
            transition: 'all 0.5s ease'
          }}
        >
          <div style={{ 
            fontSize: '4rem', 
            color: currentIndex % 3 === 0 ? '#1E88E5' : currentIndex % 3 === 1 ? '#D81B60' : '#F57F17',
            marginBottom: '1rem',
            lineHeight: '1'
          }}>
            "
          </div>
          
          <p style={{ 
            fontSize: '1.3rem', 
            lineHeight: '1.7', 
            color: '#444',
            marginBottom: '2rem',
            fontStyle: 'italic',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '400'
          }}>
            {testimonials[currentIndex].message}
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            {renderStars(testimonials[currentIndex].rating)}
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1.5rem',
            background: 'rgba(255, 255, 255, 0.5)',
            padding: '1.5rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <img
              src={testimonials[currentIndex].photo}
              alt={testimonials[currentIndex].parent_name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: currentIndex % 3 === 0 
                  ? '4px solid #42A5F5' 
                  : currentIndex % 3 === 1 
                  ? '4px solid #EC407A'
                  : '4px solid #FFEB3B',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <h6 style={{ 
                margin: 0,
                marginBottom: '0.3rem',
                color: currentIndex % 3 === 0 ? '#1E88E5' : currentIndex % 3 === 1 ? '#D81B60' : '#F57F17',
                fontSize: '1.3rem',
                fontWeight: '700',
                fontFamily: 'Fredoka One, cursive'
              }}>
                {testimonials[currentIndex].parent_name}
              </h6>
              <p style={{ 
                margin: 0, 
                color: '#666',
                fontSize: '1rem',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500'
              }}>
                {testimonials[currentIndex].relation}
              </p>
            </div>
          </div>
        </motion.div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px',
          marginTop: '3rem'
        }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '40px' : '15px',
                height: '15px',
                borderRadius: '10px',
                border: 'none',
                background: index === currentIndex 
                  ? (currentIndex % 3 === 0 ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' : currentIndex % 3 === 1 ? 'linear-gradient(135deg, #EC407A, #D81B60)' : 'linear-gradient(135deg, #FFEB3B, #FBC02D)')
                  : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: index === currentIndex ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SimpleTestimonials;
