import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { apiService } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    child_age: '',
    branch: '',
    message: ''
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await apiService.getBranches();
        const items = response.data.results || response.data;
        if (items && items.length > 0) {
          setBranches(items);
        } else {
          setError('No branches available');
        }
      } catch (err) {
        console.error('Error fetching branches:', err);
        setError('Failed to load branches');
      }
    };

    const fetchSettings = async () => {
      try {
        setSettingsLoading(true);
        console.log('Contact.js: Fetching settings...');
        const response = await apiService.getSettings();
        console.log('Contact.js: API Response:', response.data);
        const settingsData = response.data?.results || response.data;
        if (settingsData && Array.isArray(settingsData)) {
          const settingsObj = {};
          settingsData.forEach(setting => {
            settingsObj[setting.key] = setting.value;
          });
          console.log('Contact.js Settings loaded:', settingsObj);
          setSettings(settingsObj);
        } else {
          console.log('Contact.js: No settings data found');
        }
      } catch (error) {
        console.error('Contact.js: Error fetching settings:', error);
      } finally {
        setSettingsLoading(false);
      }
    };
    
    fetchBranches();
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Contact form submitted:', formData);
      await apiService.createInquiry(formData);
      setSuccess(true);
      setFormData({
        parent_name: '',
        phone: '',
        child_age: '',
        branch: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <section className="contact-section" ref={ref}>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to give your child the best start in life? Contact us today!
          </p>
        </motion.div>

        <motion.div
          className="contact-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Row className="g-4">
            {/* Contact Information */}
            <Col lg={4} md={6}>
              <motion.div variants={itemVariants}>
                <Card className="contact-info-card">
                  <Card.Body>
                    <h5 className="contact-info-title">Contact Information</h5>
                    
                    <div className="contact-item">
                      <FaPhone className="contact-icon" />
                      <div>
                        <h6>Phone</h6>
                        <p>{settingsLoading ? 'Loading...' : (console.log('Contact.js Phone:', settings.phone_number), settings.phone_number || '(555) 123-4567')}</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <FaEnvelope className="contact-icon" />
                      <div>
                        <h6>Email</h6>
                        <p>{settingsLoading ? 'Loading...' : settings.email || 'info@kidoopreschool.com'}</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <FaMapMarkerAlt className="contact-icon" />
                      <div>
                        <h6>Address</h6>
                        <p>{settingsLoading ? 'Loading...' : settings.address || '123 Main Street, Downtown, City 12345'}</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <FaClock className="contact-icon" />
                      <div>
                        <h6>Hours</h6>
                        <p>Monday - Friday<br />7:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Contact Form */}
            <Col lg={8} md={6}>
              <motion.div variants={itemVariants}>
                <Card className="contact-form-card">
                  <Card.Body>
                    <h5 className="contact-form-title">Send us a Message</h5>
                    
                    {success && (
                      <Alert variant="success" className="mb-4">
                        <FaCheckCircle className="me-2" />
                        Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.
                      </Alert>
                    )}

                    {error && (
                      <Alert variant="danger" className="mb-4">
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Row className="g-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Parent's Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="parent_name"
                              value={formData.parent_name}
                              onChange={handleChange}
                              required
                              placeholder="Enter your name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="Enter your phone number"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Child's Age *</Form.Label>
                            <Form.Control
                              type="number"
                              name="child_age"
                              value={formData.child_age}
                              onChange={handleChange}
                              required
                              min="2"
                              max="6"
                              placeholder="Enter child's age"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Preferred Branch *</Form.Label>
                            <Form.Select
                              name="branch"
                              value={formData.branch}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select a branch</option>
                              {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                  {branch.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Message *</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              placeholder="Tell us about your child and any questions you have..."
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Button
                            type="submit"
                            className="btn-submit-inquiry"
                            disabled={loading}
                            size="lg"
                          >
                            {loading ? (
                              <>
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <FaPaperPlane className="me-2" />
                                Send Inquiry
                              </>
                            )}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
