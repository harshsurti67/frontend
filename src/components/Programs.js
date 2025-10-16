import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChild, FaGraduationCap, FaHeart, FaStar } from 'react-icons/fa';
import { apiService } from '../services/api';
import { getAgeGroupText } from '../utils/helpers';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
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

    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPrograms();
        console.log('API Response:', response.data); // Debug log
        const data = response.data?.results || response.data;
        if (Array.isArray(data) && data.length > 0) {
          console.log('Setting programs from API:', data); // Debug log
          setPrograms(data);
        } else {
          console.log('No API data, using mock programs'); // Debug log
          setPrograms(mockPrograms);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError('Failed to load programs');
        console.log('Using mock programs due to error'); // Debug log
        setPrograms(mockPrograms);
      } finally {
        setLoading(false);
      }
    };

    // Fetch from API directly - don't set mock data first
    fetchPrograms();
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

  const getProgramIcon = (index) => {
    const icons = [FaChild, FaGraduationCap, FaHeart, FaStar];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <section className="programs-section">
        <Container>
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading programs...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="programs-section" ref={ref}>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Programs</h2>
          <p className="section-subtitle">
            Discover our comprehensive educational programs designed to nurture your child's growth and development
          </p>
        </motion.div>

        {error && (
          <div className="alert alert-warning text-center">
            {error}
          </div>
        )}

        <motion.div
          className="programs-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Row className="g-4">
            {(Array.isArray(programs) ? programs : []).map((program, index) => {
              const IconComponent = getProgramIcon(index);
              return (
                <Col lg={4} md={6} key={program.id}>
                  <motion.div variants={itemVariants}>
                    <Card className="program-card">
                      <div className="program-image-container">
                        <Card.Img
                          variant="top"
                          src={program.image}
                          alt={program.name}
                          className="program-image"
                        />
                        <div className="program-overlay">
                          <IconComponent className="program-icon" />
                        </div>
                      </div>
                      <Card.Body className="program-content">
                        <div className="program-age-badge">
                          {getAgeGroupText(program.age_group)}
                        </div>
                        <Card.Title className="program-title">
                          {program.name}
                        </Card.Title>
                        <Card.Text className="program-description">
                          {program.description}
                        </Card.Text>
                        <Button
                          as={Link}
                          to={`/programs#${program.id}`}
                          className="btn-program-learn"
                          variant="primary"
                        >
                          Learn More
                          <FaArrowRight className="ms-2" />
                        </Button>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </motion.div>

        <motion.div
          className="programs-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            as={Link}
            to="/programs"
            className="btn-view-all"
            variant="outline-primary"
            size="lg"
          >
            View All Programs
            <FaArrowRight className="ms-2" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default Programs;
