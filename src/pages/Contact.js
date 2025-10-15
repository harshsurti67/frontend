import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { apiService } from '../services/api';
import '../components/ContactBackground.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    branch: '',
    message: ''
  });
  const [settings, setSettings] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setSettingsLoading(true);
        console.log('Contact Page: Fetching settings...');
        const response = await apiService.getSettings();
        console.log('Contact Page: API Response:', response.data);
        const settingsData = response.data?.results || response.data;
        if (settingsData && Array.isArray(settingsData)) {
          const settingsObj = {};
          settingsData.forEach(setting => {
            settingsObj[setting.key] = setting.value;
          });
          console.log('Contact Page Settings loaded:', settingsObj);
          setSettings(settingsObj);
        } else {
          console.log('Contact Page: No settings data found');
        }
      } catch (error) {
        console.error('Contact Page: Error fetching settings:', error);
      } finally {
        setSettingsLoading(false);
      }
    };

    const fetchBranches = async () => {
      try {
        setBranchesLoading(true);
        console.log('Contact Page: Fetching branches...');
        const response = await apiService.getBranches();
        console.log('Contact Page: Branches Response:', response.data);
        const branchesData = response.data?.results || response.data;
        if (branchesData && Array.isArray(branchesData)) {
          setBranches(branchesData);
          console.log('Contact Page Branches loaded:', branchesData);
        } else {
          console.log('Contact Page: No branches data found');
        }
      } catch (error) {
        console.error('Contact Page: Error fetching branches:', error);
      } finally {
        setBranchesLoading(false);
      }
    };
    
    fetchSettings();
    fetchBranches();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.name || !formData.phone || !formData.childAge || !formData.branch || !formData.message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Find branch ID from branch name
      const selectedBranch = branches.find(branch => branch.name === formData.branch);
      if (!selectedBranch) {
        alert('Please select a valid branch.');
        return;
      }

      // Transform form data to match API expectations
      const apiData = {
        parent_name: formData.name,
        phone: formData.phone,
        child_age: parseInt(formData.childAge), // Convert to integer
        branch: selectedBranch.id, // Use branch ID instead of name
        message: formData.message
      };
      
      console.log('Contact Page Form submitted:', apiData);
      await apiService.createInquiry(apiData);
      alert('Thank you for your inquiry! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        childAge: '',
        branch: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <PageTransition>
      <div className="contact-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px',
        background: `
          linear-gradient(135deg, 
            #87CEEB 0%, 
            #20B2AA 50%,
            #4B0082 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Floating Chat Bubbles */}
      <div className="contact-background-elements">
        <motion.div
          className="floating-chat chat-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💬
        </motion.div>
        <motion.div
          className="floating-chat chat-2"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -3, 3, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          💭
        </motion.div>
        <motion.div
          className="floating-chat chat-3"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 4, -4, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          💬
        </motion.div>
      </div>
      
      {/* Wave Divider */}
      <div className="contact-wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
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
{t('contact.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {t('contact.description')}
          </p>
        </motion.div>

        <Row>
          {/* Contact Information */}
          <Col lg={4} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                marginBottom: '3rem',
                background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.15) 0%, rgba(32, 178, 170, 0.15) 50%, rgba(75, 0, 130, 0.1) 100%)',
                borderRadius: '25px',
                padding: '2.5rem',
                boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(135, 206, 235, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(135, 206, 235, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.3), rgba(32, 178, 170, 0.3), rgba(75, 0, 130, 0.2))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 6s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-25px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 192, 203, 0.3), rgba(147, 112, 219, 0.2))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 8s ease-in-out infinite reverse'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '-15px',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(152, 251, 152, 0.3), rgba(230, 230, 250, 0.3))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 7s ease-in-out infinite'
              }}></div>
              
              <h3 style={{ 
                color: '#2C3E50', 
                marginBottom: '2rem',
                fontSize: '2rem',
                fontFamily: 'Fredoka, cursive',
                position: 'relative',
                zIndex: 2,
                textShadow: '0 2px 4px rgba(255,255,255,0.8)',
                fontWeight: '700'
              }}>
                Get in Touch
              </h3>
              
              <motion.div 
                style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.15), rgba(32, 178, 170, 0.1))',
                  borderRadius: '15px',
                  border: '2px solid rgba(135, 206, 235, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(135, 206, 235, 0.25)',
                  borderColor: 'rgba(135, 206, 235, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <h5 style={{ color: '#1A365D', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>📞 Phone</h5>
                <p style={{ color: '#2D3748', fontSize: '1.1rem', margin: 0, fontWeight: '500', textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
                  {settingsLoading ? 'Loading...' : settings.phone_number || '(555) 123-4567'}
                </p>
              </motion.div>
              
              <motion.div 
                style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(32, 178, 170, 0.15), rgba(152, 251, 152, 0.1))',
                  borderRadius: '15px',
                  border: '2px solid rgba(32, 178, 170, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(32, 178, 170, 0.25)',
                  borderColor: 'rgba(32, 178, 170, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <h5 style={{ color: '#1A365D', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>✉️ Email</h5>
                <p style={{ color: '#2D3748', fontSize: '1.1rem', margin: 0, fontWeight: '500', textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
                  {settingsLoading ? 'Loading...' : settings.email || 'info@kidoopreschool.com'}
                </p>
              </motion.div>
              
              <motion.div 
                style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.15), rgba(147, 112, 219, 0.1))',
                  borderRadius: '15px',
                  border: '2px solid rgba(75, 0, 130, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(75, 0, 130, 0.25)',
                  borderColor: 'rgba(75, 0, 130, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <h5 style={{ color: '#1A365D', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>📍 Address</h5>
                <p style={{ color: '#2D3748', fontSize: '1.1rem', margin: 0, fontWeight: '500', textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
                  {settingsLoading ? 'Loading...' : settings.address || '123 Education Street, Learning City, LC 12345'}
                </p>
              </motion.div>
              
              <motion.div 
                style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.15), rgba(255, 192, 203, 0.1))',
                  borderRadius: '15px',
                  border: '2px solid rgba(255, 182, 193, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 182, 193, 0.25)',
                  borderColor: 'rgba(255, 182, 193, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <h5 style={{ color: '#1A365D', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>🕐 Hours</h5>
                <p style={{ color: '#2D3748', fontSize: '1.1rem', margin: 0, fontWeight: '500', textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
                  Monday - Friday: 7:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </p>
              </motion.div>
            </motion.div>
          </Col>

          {/* Contact Form */}
          <Col lg={8} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-enhanced glow-on-hover"
              style={{
                padding: '3rem',
                background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.15) 0%, rgba(255, 192, 203, 0.15) 30%, rgba(147, 112, 219, 0.1) 70%, rgba(186, 85, 211, 0.1) 100%)',
                borderRadius: '25px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255, 182, 193, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 182, 193, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 192, 203, 0.3), rgba(147, 112, 219, 0.2))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 6s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(186, 85, 211, 0.3), rgba(255, 182, 193, 0.2))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 8s ease-in-out infinite reverse'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '-20px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.3), rgba(32, 178, 170, 0.3), rgba(152, 251, 152, 0.2))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 7s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '20%',
                right: '-10px',
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, rgba(230, 230, 250, 0.3), rgba(255, 228, 181, 0.3))',
                borderRadius: '50%',
                zIndex: 1,
                animation: 'float 5s ease-in-out infinite'
              }}></div>
              
              <h3 style={{ 
                color: '#2C3E50', 
                marginBottom: '2rem',
                fontSize: '2rem',
                fontFamily: 'Fredoka, cursive',
                position: 'relative',
                zIndex: 2,
                textShadow: '0 2px 4px rgba(255,255,255,0.8)',
                fontWeight: '700'
              }}>
                Send us a Message
              </h3>
              
              <Form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 2 }}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2C3E50', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Parent Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="glowing-input"
                        style={{
                          border: '2px solid rgba(135, 206, 235, 0.3)',
                          borderRadius: '15px',
                          padding: '12px 15px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#87CEEB';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(135, 206, 235, 0.3)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2C3E50', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          border: '2px solid rgba(135, 206, 235, 0.3)',
                          borderRadius: '15px',
                          padding: '12px 15px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#87CEEB';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(135, 206, 235, 0.3)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2C3E50', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          border: '2px solid rgba(135, 206, 235, 0.3)',
                          borderRadius: '15px',
                          padding: '12px 15px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#87CEEB';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(135, 206, 235, 0.3)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2C3E50', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Child's Age</Form.Label>
                      <Form.Select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        style={{
                          border: '2px solid rgba(135, 206, 235, 0.3)',
                          borderRadius: '15px',
                          padding: '12px 15px',
                          fontSize: '1rem',
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#87CEEB';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(135, 206, 235, 0.3)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                        }}
                      >
                        <option value="">Select Age</option>
                        <option value="2-3">2-3 years</option>
                        <option value="3-4">3-4 years</option>
                        <option value="4-5">4-5 years</option>
                        <option value="5-6">5-6 years</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2C3E50', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Preferred Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    disabled={branchesLoading}
                    style={{
                      border: '2px solid rgba(135, 206, 235, 0.3)',
                      borderRadius: '15px',
                      padding: '12px 15px',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#87CEEB';
                      e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(135, 206, 235, 0.3)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                    }}
                  >
                    <option value="">
                      {branchesLoading ? 'Loading branches...' : 'Select Branch'}
                    </option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.name}>{branch.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2C3E50', fontWeight: '700', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your child and any questions you may have..."
                    style={{
                      border: '2px solid rgba(135, 206, 235, 0.3)',
                      borderRadius: '15px',
                      padding: '12px 15px',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#87CEEB';
                      e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(135, 206, 235, 0.3)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                    }}
                  />
                </Form.Group>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                <Button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    width: '100%',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(135, 206, 235, 0.4)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(135, 206, 235, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(135, 206, 235, 0.4)';
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>📧 Send Message</span>
                </Button>
                </motion.div>
              </Form>
            </motion.div>
          </Col>
        </Row>

        {/* Branches Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '3rem', 
            color: '#1A202C', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka, cursive',
            fontWeight: '800',
            textShadow: '2px 2px 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.5)',
            background: 'linear-gradient(135deg, #2D3748, #4A5568, #2B6CB0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 2
          }}>
            <span style={{ 
              color: '#1A202C', 
              textShadow: '2px 2px 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.5)',
              WebkitTextFillColor: 'initial'
            }}>
              🌟 Our Branches 🌟
            </span>
          </h2>
          
          <Row>
            {branchesLoading ? (
              <Col>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Loading branches...</p>
                </div>
              </Col>
            ) : (
              branches.map((branch, index) => (
                <Col lg={3} md={6} key={branch.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="card-enhanced glow-on-hover"
                    style={{
                      padding: '2rem',
                      marginBottom: '2rem',
                      textAlign: 'center',
                      background: index === 0 
                        ? 'linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(32, 178, 170, 0.15) 50%, rgba(152, 251, 152, 0.1) 100%)'
                        : index === 1
                        ? 'linear-gradient(135deg, rgba(255, 182, 193, 0.2) 0%, rgba(255, 192, 203, 0.15) 50%, rgba(147, 112, 219, 0.1) 100%)'
                        : index === 2
                        ? 'linear-gradient(135deg, rgba(147, 112, 219, 0.2) 0%, rgba(186, 85, 211, 0.15) 50%, rgba(255, 182, 193, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 228, 181, 0.2) 0%, rgba(230, 230, 250, 0.15) 50%, rgba(135, 206, 235, 0.1) 100%)',
                      borderRadius: '25px',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(15px)',
                      border: index === 0 
                        ? '2px solid rgba(135, 206, 235, 0.4)'
                        : index === 1
                        ? '2px solid rgba(255, 182, 193, 0.4)'
                        : index === 2
                        ? '2px solid rgba(147, 112, 219, 0.4)'
                        : '2px solid rgba(255, 228, 181, 0.4)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Decorative background elements for branch cards */}
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '60px',
                      height: '60px',
                      background: index === 0 
                        ? 'linear-gradient(135deg, rgba(135, 206, 235, 0.4), rgba(32, 178, 170, 0.3), rgba(152, 251, 152, 0.2))'
                        : index === 1
                        ? 'linear-gradient(135deg, rgba(255, 182, 193, 0.4), rgba(255, 192, 203, 0.3), rgba(147, 112, 219, 0.2))'
                        : index === 2
                        ? 'linear-gradient(135deg, rgba(147, 112, 219, 0.4), rgba(186, 85, 211, 0.3), rgba(255, 182, 193, 0.2))'
                        : 'linear-gradient(135deg, rgba(255, 228, 181, 0.4), rgba(230, 230, 250, 0.3), rgba(135, 206, 235, 0.2))',
                      borderRadius: '50%',
                      zIndex: 1,
                      animation: 'float 6s ease-in-out infinite'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      bottom: '-15px',
                      left: '-15px',
                      width: '40px',
                      height: '40px',
                      background: index === 0 
                        ? 'linear-gradient(135deg, rgba(152, 251, 152, 0.3), rgba(230, 230, 250, 0.2))'
                        : index === 1
                        ? 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(186, 85, 211, 0.2))'
                        : index === 2
                        ? 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 192, 203, 0.2))'
                        : 'linear-gradient(135deg, rgba(135, 206, 235, 0.3), rgba(32, 178, 170, 0.2))',
                      borderRadius: '50%',
                      zIndex: 1,
                      animation: 'float 8s ease-in-out infinite reverse'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-10px',
                      width: '30px',
                      height: '30px',
                      background: index === 0 
                        ? 'linear-gradient(135deg, rgba(255, 228, 181, 0.3), rgba(255, 182, 193, 0.2))'
                        : index === 1
                        ? 'linear-gradient(135deg, rgba(135, 206, 235, 0.3), rgba(32, 178, 170, 0.2))'
                        : index === 2
                        ? 'linear-gradient(135deg, rgba(230, 230, 250, 0.3), rgba(255, 228, 181, 0.2))'
                        : 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(186, 85, 211, 0.2))',
                      borderRadius: '50%',
                      zIndex: 1,
                      animation: 'float 7s ease-in-out infinite'
                    }}></div>
                    
                    <h4 style={{ 
                      color: index === 0 
                        ? '#1E40AF'
                        : index === 1
                        ? '#7C3AED'
                        : index === 2
                        ? '#DC2626'
                        : '#EA580C',
                      marginBottom: '1rem',
                      fontSize: '1.5rem',
                      fontFamily: 'Fredoka, cursive',
                      position: 'relative',
                      zIndex: 2,
                      fontWeight: '800',
                      textShadow: '2px 2px 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8)'
                    }}>
                      {branch.name}
                    </h4>
                    <p style={{ 
                      color: '#2D3748', 
                      marginBottom: '1rem',
                      fontSize: '1.1rem',
                      lineHeight: '1.5',
                      position: 'relative',
                      zIndex: 2,
                      fontWeight: '600',
                      textShadow: '2px 2px 4px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.7)'
                    }}>
                      📍 {branch.address}
                    </p>
                    <p style={{ 
                      color: index === 0 
                        ? '#1E40AF'
                        : index === 1
                        ? '#7C3AED'
                        : index === 2
                        ? '#DC2626'
                        : '#EA580C',
                      fontWeight: '700',
                      fontSize: '1.2rem',
                      position: 'relative',
                      zIndex: 2,
                      textShadow: '2px 2px 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8)'
                    }}>
                      📞 {branch.phone}
                    </p>
                  </motion.div>
                </Col>
              ))
            )}
          </Row>
        </motion.div>
      </Container>
      </div>
    </PageTransition>
  );
};

export default Contact;
