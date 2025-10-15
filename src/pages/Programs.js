import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { apiService } from '../services/api';
import '../components/ProgramsBackground.css';

const Programs = () => {
  const { t } = useTranslation();
  const mockPrograms = [
    {
      id: 1,
      name: "Playgroup Program",
      age_group: "2-3 years",
      description: "Introduction to structured learning through play-based activities, sensory exploration, and social interaction in a safe, nurturing environment.",
      features: [
        "Montessori-based learning",
        "Sensory development activities", 
        "Basic social skills",
        "Motor skills development",
        "Music and movement",
        "Story time sessions"
      ],
      schedule: "Monday - Friday, 9:00 AM - 12:00 PM",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Nursery Program",
      age_group: "3-4 years",
      description: "Building foundational skills through activity-based learning, early literacy development, creative arts, and structured play in thematic classrooms.",
      features: [
        "Phonics and language development",
        "Math concepts through games",
        "Art and creativity corners",
        "Smart class technology",
        "Physical education",
        "Life skills and values"
      ],
      schedule: "Monday - Friday, 9:00 AM - 1:00 PM",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Pre-Kindergarten (LKG/UKG)",
      age_group: "4-5 years",
      description: "Comprehensive kindergarten preparation with advanced academics, critical thinking, global curriculum elements, and skill-based clubs.",
      features: [
        "Reading and writing readiness",
        "Advanced mathematics",
        "Science and AR/VR learning",
        "Language exposure",
        "Skill-based clubs (Yoga, Dance, Art)",
        "Child counselling and assessments"
      ],
      schedule: "Monday - Friday, 8:00 AM - 3:00 PM",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Day Care Program",
      age_group: "2-5 years",
      description: "Extended care program with healthy meals, supervised play, homework assistance, and enrichment activities in a safe, monitored environment.",
      features: [
        "Dietician-approved meals",
        "CCTV live monitoring",
        "Homework assistance",
        "Indoor and outdoor play",
        "Regular health checkups",
        "Parent app updates"
      ],
      schedule: "Monday - Saturday, 7:00 AM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const [programs, setPrograms] = useState(mockPrograms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await apiService.getPrograms();
        const data = response.data?.results || response.data;
        setPrograms(Array.isArray(data) ? data : mockPrograms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms(mockPrograms);
        setLoading(false);
      }
    };
    
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCardColors = (index) => {
    const colors = [
      { bg: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', border: '#64B5F6', badge: 'linear-gradient(135deg, #42A5F5, #1E88E5)', title: '#1E88E5', button: 'linear-gradient(135deg, #42A5F5, #1E88E5)', shadow: '0 20px 50px rgba(66, 165, 245, 0.3)', check: '#42A5F5' },
      { bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', border: '#BA68C8', badge: 'linear-gradient(135deg, #AB47BC, #8E24AA)', title: '#8E24AA', button: 'linear-gradient(135deg, #AB47BC, #8E24AA)', shadow: '0 20px 50px rgba(171, 71, 188, 0.3)', check: '#AB47BC' },
      { bg: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)', border: '#FDD835', badge: 'linear-gradient(135deg, #FFEB3B, #FBC02D)', title: '#F57F17', button: 'linear-gradient(135deg, #FFEB3B, #FBC02D)', shadow: '0 20px 50px rgba(255, 235, 59, 0.4)', check: '#FFEB3B', textColor: '#333' },
      { bg: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', border: '#FFA726', badge: 'linear-gradient(135deg, #FF9800, #F57C00)', title: '#F57C00', button: 'linear-gradient(135deg, #FF9800, #F57C00)', shadow: '0 20px 50px rgba(255, 152, 0, 0.3)', check: '#FF9800' },
      { bg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', border: '#66BB6A', badge: 'linear-gradient(135deg, #66BB6A, #43A047)', title: '#43A047', button: 'linear-gradient(135deg, #66BB6A, #43A047)', shadow: '0 20px 50px rgba(102, 187, 106, 0.3)', check: '#66BB6A' }
    ];
    return colors[index % colors.length];
  };

  return (
    <PageTransition>
      <div className="programs-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px',
        background: `
          linear-gradient(135deg, 
            #98FB98 0%, 
            #E6E6FA 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Floating Educational Elements */}
      <div className="programs-background-elements">
        <motion.div
          className="floating-book book-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📚
        </motion.div>
        <motion.div
          className="floating-pencil pencil-1"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          ✏️
        </motion.div>
        <motion.div
          className="floating-abc abc-1"
          animate={{
            y: [0, -25, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🔤
        </motion.div>
        <motion.div
          className="floating-book book-2"
          animate={{
            y: [0, -18, 0],
            rotate: [0, -6, 6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          📖
        </motion.div>
        <motion.div
          className="floating-pencil pencil-2"
          animate={{
            y: [0, -22, 0],
            rotate: [0, 7, -7, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          ✏️
        </motion.div>
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
{t('programs.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
{t('programs.subtitle')}
          </p>
        </motion.div>

        <Row>
          {(Array.isArray(programs) ? programs : []).map((program, index) => {
            const colors = getCardColors(index);
            return (
            <Col lg={4} md={6} key={program.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
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
                    {program.age_group}
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
                    fontSize: '1.6rem',
                    fontFamily: 'Fredoka One, cursive',
                    fontWeight: 'bold'
                  }}>
                    {program.name}
                  </h3>
                  
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.7',
                    marginBottom: '1.8rem',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {program.description}
                  </p>

                  {program.features && program.features.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h5 style={{ 
                        color: colors.title,
                        marginBottom: '1rem',
                        fontSize: '1.2rem',
                        fontFamily: 'Baloo 2, cursive',
                        fontWeight: '600'
                      }}>
                        Program Features:
                      </h5>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        margin: 0
                      }}>
                        {program.features.map((feature, idx) => (
                          <li key={idx} style={{ 
                            marginBottom: '0.6rem',
                            color: '#555',
                            fontSize: '1rem',
                            fontFamily: 'Poppins, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{ 
                              color: colors.check,
                              fontWeight: 'bold',
                              fontSize: '1.2rem'
                            }}>✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.schedule && (
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '1.2rem',
                      borderRadius: '15px',
                      marginBottom: '1.5rem',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <strong style={{ 
                        color: colors.title,
                        fontSize: '1.05rem',
                        fontFamily: 'Poppins, sans-serif'
                      }}>📅 Schedule:</strong>
                      <br />
                      <span style={{ 
                        color: '#555',
                        fontSize: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '500'
                      }}>{program.schedule}</span>
                    </div>
                  )}
                  
                  <button 
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
            Ready to Enroll Your Child?
          </h3>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Contact us today to learn more about our programs and schedule a visit
          </p>
          <button style={{
            background: 'white',
            color: '#4B0082',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Contact Us Today
          </button>
        </motion.div>
      </Container>
      </div>
    </PageTransition>
  );
};

export default Programs;
