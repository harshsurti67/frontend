import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/api';
import '../components/AboutBackground.css';

const About = () => {
  const { t } = useTranslation();
  const [aboutData, setAboutData] = useState(null);
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color function for dynamic card styling
  const getCardColors = (index) => {
    const colors = [
      { bg: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', border: '#64B5F6', title: '#1E88E5', shadow: '0 20px 50px rgba(66, 165, 245, 0.3)' },
      { bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', border: '#BA68C8', title: '#8E24AA', shadow: '0 20px 50px rgba(171, 71, 188, 0.3)' },
      { bg: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)', border: '#FDD835', title: '#F57F17', shadow: '0 20px 50px rgba(255, 235, 59, 0.4)', textColor: '#333' },
      { bg: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', border: '#FFA726', title: '#F57C00', shadow: '0 20px 50px rgba(255, 152, 0, 0.3)' },
      { bg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', border: '#66BB6A', title: '#43A047', shadow: '0 20px 50px rgba(102, 187, 106, 0.3)' },
      { bg: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', border: '#F06292', title: '#C2185B', shadow: '0 20px 50px rgba(233, 30, 99, 0.3)' }
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        
        // Fetch About page content and features in parallel
        const [aboutResponse, featuresResponse] = await Promise.all([
          apiService.getAboutPage(),
          apiService.getAboutFeaturesByCategory()
        ]);

        setAboutData(aboutResponse.data);
        setFeatures(featuresResponse.data);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load about page content');
        
        // Fallback to default data
        setAboutData({
          title: 'About Kiddoo Preschool',
          subtitle: 'By Aarya International School - Nurturing young minds with world-class facilities, innovative curriculum, and experienced educators',
          mission_title: 'Our Mission',
          mission_content: 'To provide a safe, nurturing, and stimulating environment where children can grow, learn, and develop their full potential through activity-based learning, innovative teaching methods, and personalized attention. We create a foundation for lifelong learning and success.',
          vision_title: 'Our Vision',
          vision_content: 'To be recognized as the leading preschool that nurtures young minds through world-class infrastructure, innovative curriculum, and experienced educators. We aim to create confident, compassionate, and globally-aware individuals ready to excel in an ever-changing world.',
          cta_title: 'Join the Kiddoo Family Today!',
          cta_content: 'Give your child the best start in life with our world-class facilities and nurturing environment',
          cta_button_text: 'Enroll Your Child Now'
        });
        
        // Fallback features data
        setFeatures({
          infrastructure: [
            { icon: '🏫', title: 'Safe & Child-Friendly Campus', description: 'Soft flooring, CCTV surveillance' },
            { icon: '🎨', title: 'Thematic Classrooms', description: 'Colorful, concept-based interiors' },
            { icon: '🎪', title: 'Indoor & Outdoor Play Zones', description: 'Slides, seesaw, tunnel, horses, magic scooter & nature garden' },
            { icon: '💻', title: 'Smart Class Technology', description: 'Interactive boards, AR/VR-based learning' },
            { icon: '🪑', title: 'Child-Sized Furniture', description: 'Ergonomic tables, chairs, and cubbies' }
          ],
          curriculum: [
            { icon: '📚', title: 'Activity-Based Learning', description: 'Montessori, play-way method' },
            { icon: '🧩', title: 'Memory Tool Games', description: 'Puzzles, coding toys' },
            { icon: '🗣️', title: 'Language Development', description: 'Phonics, storytelling, puppet shows' },
            { icon: '🎭', title: 'Art & Creativity Corners', description: 'Painting, music, dance, drama' },
            { icon: '❤️', title: 'Life Skills & Values', description: 'Manners, teamwork, empathy' }
          ],
          teachers: [
            { icon: '👩‍🏫', title: 'Trained & Certified Teachers', description: 'ECCEd qualified with child psychology knowledge' },
            { icon: '👥', title: 'Low Student-Teacher Ratio', description: 'Personalized attention (ideal: 1:12)' },
            { icon: '📖', title: 'Continuous Teacher Training', description: 'Updated with latest methods' }
          ],
          wellbeing: [
            { icon: '🧸', title: 'Child Counselling & Assessments', description: 'Regular progress tracking' },
            { icon: '🍎', title: 'Healthy Meals & Nutrition Plans', description: 'Dietician-approved menus' },
            { icon: '✨', title: 'Hygiene & Wellness Practices', description: 'Sanitized classrooms, regular health checkups' }
          ],
          enrichment: [
            { icon: '🌳', title: 'Field Trips & Nature Walks', description: 'Practical learning experiences' },
            { icon: '🎉', title: 'Festivals & Cultural Celebrations', description: 'Diversity & tradition' },
            { icon: '👨‍👩‍👧', title: 'Parent Engagement', description: 'Workshops, parent-child activities' },
            { icon: '🌍', title: 'Global Curriculum Elements', description: 'Exposure to languages & cultures' }
          ],
          innovative: [
            { icon: '📱', title: 'AI & Smart Learning Apps', description: 'Track school activities via parent app' },
            { icon: '🧘', title: 'Skill-Based Clubs', description: 'Yoga, dance, storytelling clubs, Art & craft' },
            { icon: '📹', title: 'CCTV Live Access for Parents', description: 'Transparent monitoring' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #B2DFDB 0%, #F8BBD0 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#4B0082' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <h3>Loading About Us...</h3>
        </div>
      </div>
    );
  }

  if (error && !aboutData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #B2DFDB 0%, #F8BBD0 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#4B0082' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <h3>{error}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      background: `
        linear-gradient(135deg, 
          #B2DFDB 0%, 
          #F8BBD0 100%
        )
      `,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating About Elements */}
      <div className="about-background-elements">
        <motion.div
          className="floating-about-trophy trophy-1"
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
          🏆
        </motion.div>
        <motion.div
          className="floating-about-heart heart-1"
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
          ❤️
        </motion.div>
        <motion.div
          className="floating-about-school school-1"
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
          🏫
        </motion.div>
        <motion.div
          className="floating-about-book book-1"
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
          📚
        </motion.div>
        <motion.div
          className="floating-about-stars stars-1"
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
          ✨
        </motion.div>
      </div>
      <Container>
        {/* Hero Section */}
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
            fontFamily: 'Fredoka One, cursive'
          }}>
            {aboutData?.title || t('about.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            {aboutData?.subtitle || t('about.subtitle')}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <Row className="mb-5">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
                borderRadius: '25px',
                padding: '3rem',
                height: '100%',
                boxShadow: '0 20px 50px rgba(66, 165, 245, 0.3)',
                border: '3px solid #64B5F6',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: '0 25px 60px rgba(66, 165, 245, 0.4)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <motion.div 
                  style={{ fontSize: '3rem', marginBottom: '1.5rem', textAlign: 'center' }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎯
                </motion.div>
                <h3 style={{ 
                  background: 'linear-gradient(135deg, #1E88E5, #0D47A1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1.5rem',
                  fontSize: '2.2rem',
                  fontFamily: 'Fredoka One, cursive',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {aboutData?.mission_title || 'Our Mission'}
                </h3>
                <p style={{ 
                  color: '#333', 
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500'
                }}>
                  {aboutData?.mission_content || 'To provide a safe, nurturing, and stimulating environment where children can grow, learn, and develop their full potential through activity-based learning, innovative teaching methods, and personalized attention. We create a foundation for lifelong learning and success.'}
                </p>
              </div>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
                borderRadius: '25px',
                padding: '3rem',
                height: '100%',
                boxShadow: '0 20px 50px rgba(171, 71, 188, 0.3)',
                border: '3px solid #BA68C8',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: '0 25px 60px rgba(171, 71, 188, 0.4)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '-25px',
                width: '120px',
                height: '120px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '90px',
                height: '90px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <motion.div 
                  style={{ fontSize: '3rem', marginBottom: '1.5rem', textAlign: 'center' }}
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  👁️
                </motion.div>
                <h3 style={{ 
                  background: 'linear-gradient(135deg, #8E24AA, #4A148C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1.5rem',
                  fontSize: '2.2rem',
                  fontFamily: 'Fredoka One, cursive',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {aboutData?.vision_title || 'Our Vision'}
                </h3>
                <p style={{ 
                  color: '#333', 
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500'
                }}>
                  {aboutData?.vision_content || 'To be recognized as the leading preschool that nurtures young minds through world-class infrastructure, innovative curriculum, and experienced educators. We aim to create confident, compassionate, and globally-aware individuals ready to excel in an ever-changing world.'}
                </p>
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Infrastructure & Environment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka One, cursive'
          }}>
            🌟 Infrastructure & Environment
          </h2>
          <Row>
            {features.infrastructure?.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  style={{
                    background: getCardColors(index).bg,
                    borderRadius: '25px',
                    padding: '2.5rem',
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: getCardColors(index).shadow,
                    border: `3px solid ${getCardColors(index).border}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    boxShadow: getCardColors(index).shadow,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 style={{ 
                      color: getCardColors(index).title, 
                      marginBottom: '1.2rem',
                      fontSize: '1.4rem',
                      fontFamily: 'Fredoka One, cursive',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{ 
                      color: getCardColors(index).textColor || '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '500'
                    }}>
                      {feature.description || feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Curriculum & Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka One, cursive'
          }}>
            📚 Curriculum & Learning
          </h2>
          <Row>
            {features.curriculum?.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  style={{
                    background: getCardColors(index + 5).bg,
                    borderRadius: '25px',
                    padding: '2.5rem',
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: getCardColors(index + 5).shadow,
                    border: `3px solid ${getCardColors(index + 5).border}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    boxShadow: getCardColors(index + 5).shadow,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                      animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 style={{ 
                      color: getCardColors(index + 5).title, 
                      marginBottom: '1.2rem',
                      fontSize: '1.4rem',
                      fontFamily: 'Fredoka One, cursive',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{ 
                      color: getCardColors(index + 5).textColor || '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '500'
                    }}>
                      {feature.description || feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Teachers & Staff */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka One, cursive'
          }}>
            👩‍🏫 Teachers & Staff
          </h2>
          <Row>
            {features.teachers?.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  style={{
                    background: getCardColors(index + 10).bg,
                    borderRadius: '25px',
                    padding: '2.5rem',
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: getCardColors(index + 10).shadow,
                    border: `3px solid ${getCardColors(index + 10).border}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    boxShadow: getCardColors(index + 10).shadow,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 style={{ 
                      color: getCardColors(index + 10).title, 
                      marginBottom: '1.2rem',
                      fontSize: '1.4rem',
                      fontFamily: 'Fredoka One, cursive',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{ 
                      color: getCardColors(index + 10).textColor || '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '500'
                    }}>
                      {feature.description || feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Child Development & Well-Being */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka One, cursive'
          }}>
            🧸 Child Development & Well-Being
          </h2>
          <Row>
            {features.wellbeing?.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  style={{
                    background: getCardColors(index + 15).bg,
                    borderRadius: '25px',
                    padding: '2.5rem',
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: getCardColors(index + 15).shadow,
                    border: `3px solid ${getCardColors(index + 15).border}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    boxShadow: getCardColors(index + 15).shadow,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                      animate={{
                        rotate: [0, -15, 15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 style={{ 
                      color: getCardColors(index + 15).title, 
                      marginBottom: '1.2rem',
                      fontSize: '1.4rem',
                      fontFamily: 'Fredoka One, cursive',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{ 
                      color: getCardColors(index + 15).textColor || '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '500'
                    }}>
                      {feature.description || feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Exposure & Enrichment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka One, cursive'
          }}>
            🌍 Exposure & Enrichment
          </h2>
          <Row>
            {features.enrichment?.map((feature, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  style={{
                    background: getCardColors(index + 20).bg,
                    borderRadius: '25px',
                    padding: '2.5rem',
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: getCardColors(index + 20).shadow,
                    border: `3px solid ${getCardColors(index + 20).border}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    boxShadow: getCardColors(index + 20).shadow,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                      animate={{
                        rotate: [0, 20, -20, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 style={{ 
                      color: getCardColors(index + 20).title, 
                      marginBottom: '1.2rem',
                      fontSize: '1.4rem',
                      fontFamily: 'Fredoka One, cursive',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{ 
                      color: getCardColors(index + 20).textColor || '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '500'
                    }}>
                      {feature.description || feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Innovative Add-Ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka One, cursive'
          }}>
            💡 Innovative Add-Ons
          </h2>
          <Row>
            {features.innovative?.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                  style={{
                    background: getCardColors(index + 25).bg,
                    borderRadius: '25px',
                    padding: '2.5rem',
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: getCardColors(index + 25).shadow,
                    border: `3px solid ${getCardColors(index + 25).border}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    boxShadow: getCardColors(index + 25).shadow,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                      animate={{
                        rotate: [0, -20, 20, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 style={{ 
                      color: getCardColors(index + 25).title, 
                      marginBottom: '1.2rem',
                      fontSize: '1.4rem',
                      fontFamily: 'Fredoka One, cursive',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {feature.title}
                    </h4>
                    <p style={{ 
                      color: getCardColors(index + 25).textColor || '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '500'
                    }}>
                      {feature.description || feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '30px',
            padding: '4rem',
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(102, 126, 234, 0.4)'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 30px 70px rgba(102, 126, 234, 0.5)',
            transition: { duration: 0.3 }
          }}
        >
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
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.h3 
              style={{ 
                marginBottom: '1.5rem',
                fontSize: '2.5rem',
                fontFamily: 'Fredoka One, cursive',
                fontWeight: 'bold'
              }}
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {aboutData?.cta_title || 'Join the Kiddoo Family Today!'}
            </motion.h3>
            <p style={{ 
              fontSize: '1.3rem', 
              marginBottom: '2.5rem',
              opacity: 0.9,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              lineHeight: '1.6'
            }}>
              {aboutData?.cta_content || 'Give your child the best start in life with our world-class facilities and nurturing environment'}
            </p>
            <motion.button 
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '18px 40px',
                borderRadius: '30px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)',
                fontFamily: 'Poppins, sans-serif'
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: '0 12px 35px rgba(255, 255, 255, 0.4)',
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              onClick={() => window.location.href = '/admissions'}
            >
              {aboutData?.cta_button_text || 'Enroll Your Child Now'}
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;