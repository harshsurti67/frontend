import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { apiService } from '../services/api';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTestimonials();
        const items = response.data.results || response.data;
        if (items && items.length > 0) {
          setTestimonials(items);
          setError(null);
        } else {
          setError('No testimonials available');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

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

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="testimonials-section">
        <Container>
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="testimonials-section">
        <Container>
          <div className="text-center">
            <p>No testimonials available at the moment.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="testimonials-section" ref={ref}>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Parents Say</h2>
          <p className="section-subtitle">
            Hear from our happy families about their Kidoo Preschool experience
          </p>
        </motion.div>

        {error && (
          <div className="alert alert-warning text-center">
            {error}
          </div>
        )}

        <motion.div
          className="testimonials-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="testimonials-carousel">
            <motion.div
              className="testimonial-card"
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="testimonial-card-inner">
                <Card.Body>
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  
                  <div className="testimonial-content">
                    <p className="testimonial-message">
                      "{testimonials[currentIndex].message}"
                    </p>
                    
                    <div className="testimonial-rating">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                  </div>
                  
                  <div className="testimonial-author">
                    <div className="author-photo">
                      <img
                        src={testimonials[currentIndex].photo}
                        alt={testimonials[currentIndex].parent_name}
                        className="author-image"
                      />
                    </div>
                    <div className="author-info">
                      <h6 className="author-name">
                        {testimonials[currentIndex].parent_name}
                      </h6>
                      <p className="author-relation">
                        {testimonials[currentIndex].relation}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="testimonial-navigation">
              <button
                className="nav-btn prev-btn"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <FaChevronLeft />
              </button>
              <button
                className="nav-btn next-btn"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
