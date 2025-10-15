import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

const SimplePrograms = () => {
  const mockPrograms = [
    {
      id: 1,
      name: "Toddler Program",
      age_group: "2-3",
      description: "A nurturing environment for toddlers to explore, learn, and grow through play-based activities.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Preschool Program",
      age_group: "3-4",
      description: "Comprehensive early childhood education focusing on social, emotional, and cognitive development.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Pre-K Program",
      age_group: "4-5",
      description: "Advanced preparation for kindergarten with emphasis on literacy, math, and critical thinking skills.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const [programs, setPrograms] = useState(mockPrograms);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await apiService.getPrograms();
        // Limit to first 3 programs for home page
        const data = response.data?.results || response.data || mockPrograms;
        setPrograms(Array.isArray(data) ? data.slice(0, 3) : mockPrograms);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms(mockPrograms);
      }
    };
    
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Our Programs
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Age-appropriate programs designed to nurture your child's growth and development
          </p>
        </motion.div>

        <Row>
          {programs.map((program, index) => (
            <Col md={4} key={program.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{
                  background: index === 0 
                    ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' 
                    : index === 1 
                    ? 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
                    : 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
                  borderRadius: '25px',
                  padding: '0',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  marginBottom: '2rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: index === 0 
                    ? '3px solid #64B5F6' 
                    : index === 1 
                    ? '3px solid #BA68C8'
                    : '3px solid #FDD835'
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -15,
                  boxShadow: index === 0 
                    ? '0 20px 50px rgba(66, 165, 245, 0.3)' 
                    : index === 1 
                    ? '0 20px 50px rgba(171, 71, 188, 0.3)'
                    : '0 20px 50px rgba(255, 235, 59, 0.4)',
                  transition: { duration: 0.3 }
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={program.image}
                    alt={program.name}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: index === 0 
                      ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' 
                      : index === 1 
                      ? 'linear-gradient(135deg, #AB47BC, #8E24AA)'
                      : 'linear-gradient(135deg, #FFEB3B, #FBC02D)',
                    color: index === 2 ? '#333' : 'white',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    {program.age_group} years
                  </div>
                </div>
                
                <div style={{ 
                  padding: '2.5rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ 
                    color: index === 0 ? '#1E88E5' : index === 1 ? '#8E24AA' : '#F57F17',
                    marginBottom: '1rem',
                    fontSize: '1.6rem',
                    fontFamily: 'Fredoka One, cursive',
                    fontWeight: 'bold'
                  }}>
                    {program.name}
                  </h4>
                  
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.7',
                    marginBottom: '1.8rem',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {program.description}
                  </p>
                  
                  <button 
                    style={{
                      background: index === 0 
                        ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' 
                        : index === 1 
                        ? 'linear-gradient(135deg, #AB47BC, #8E24AA)'
                        : 'linear-gradient(135deg, #FFEB3B, #FBC02D)',
                      color: index === 2 ? '#333' : 'white',
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

export default SimplePrograms;
