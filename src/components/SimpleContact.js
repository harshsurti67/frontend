import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

const SimpleContact = () => {
  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    child_age: '',
    branch: '',
    message: ''
  });
  
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [settings, setSettings] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setBranchesLoading(true);
        const response = await apiService.getBranches();
        const data = response.data?.results || response.data;
        if (data && Array.isArray(data) && data.length > 0) {
          setBranches(data);
          setBranchesError(null);
        } else {
          setBranchesError('No branches available');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
        setBranchesError('Failed to load branches');
      } finally {
        setBranchesLoading(false);
      }
    };

    const fetchSettings = async () => {
      try {
        setSettingsLoading(true);
        console.log('SimpleContact.js: Fetching settings...');
        const response = await apiService.getSettings();
        console.log('SimpleContact.js: API Response:', response.data);
        const settingsData = response.data?.results || response.data;
        if (settingsData && Array.isArray(settingsData)) {
          const settingsObj = {};
          settingsData.forEach(setting => {
            settingsObj[setting.key] = setting.value;
          });
          console.log('SimpleContact.js Settings loaded:', settingsObj);
          setSettings(settingsObj);
        } else {
          console.log('SimpleContact.js: No settings data found');
        }
      } catch (error) {
        console.error('SimpleContact.js: Error fetching settings:', error);
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
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Validate required fields
      if (!formData.parent_name || !formData.phone || !formData.child_age || !formData.branch || !formData.message) {
        setSubmitError('Please fill in all required fields.');
        return;
      }

      // Find branch ID from branch name
      const selectedBranch = branches.find(branch => branch.name === formData.branch);
      if (!selectedBranch) {
        setSubmitError('Please select a valid branch.');
        return;
      }

      // Prepare API data with correct types
      const apiData = {
        parent_name: formData.parent_name,
        phone: formData.phone,
        child_age: parseInt(formData.child_age), // Convert to integer
        branch: selectedBranch.id, // Use branch ID instead of name
        message: formData.message
      };

      console.log('SimpleContact Form submitted:', apiData);
      await apiService.createInquiry(apiData);
      setSubmitSuccess(true);
      setFormData({
        parent_name: '',
        phone: '',
        child_age: '',
        branch: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitError('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'transparent',
      minHeight: '600px',
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
            Get In Touch
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Ready to give your child the best start in life? Contact us today!
          </p>
        </motion.div>

        <Row>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
                borderRadius: '25px',
                padding: '2.5rem',
                boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                marginBottom: '2rem',
                height: 'fit-content',
                border: '3px solid #64B5F6',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 50px rgba(66, 165, 245, 0.3)'
              }}
            >
              <h4 style={{ 
                color: '#1E88E5', 
                marginBottom: '1.5rem',
                fontFamily: 'Fredoka One, cursive',
                fontSize: '1.6rem',
                fontWeight: 'bold'
              }}>
                Contact Information
              </h4>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)'
                  }}>
                    📞
                  </div>
                  <div>
                    <strong style={{ color: '#1E88E5', fontSize: '1.05rem' }}>Phone:</strong><br />
                    <span style={{ color: '#555', fontFamily: 'Poppins, sans-serif' }}>
                      {settingsLoading ? 'Loading...' : (console.log('SimpleContact.js Phone:', settings.phone_number), settings.phone_number || '(555) 123-4567')}
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)'
                  }}>
                    ✉️
                  </div>
                  <div>
                    <strong style={{ color: '#1E88E5', fontSize: '1.05rem' }}>Email:</strong><br />
                    <span style={{ color: '#555', fontFamily: 'Poppins, sans-serif' }}>
                      {settingsLoading ? 'Loading...' : settings.email || 'info@kidoopreschool.com'}
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)'
                  }}>
                    📍
                  </div>
                  <div>
                    <strong style={{ color: '#1E88E5', fontSize: '1.05rem' }}>Address:</strong><br />
                    <span style={{ color: '#555', fontFamily: 'Poppins, sans-serif' }}>
                      {settingsLoading ? 'Loading...' : settings.address || '123 Main Street, Downtown, City 12345'}
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)'
                  }}>
                    🕒
                  </div>
                  <div>
                    <strong style={{ color: '#1E88E5', fontSize: '1.05rem' }}>Hours:</strong><br />
                    <span style={{ color: '#555', fontFamily: 'Poppins, sans-serif' }}>Monday - Friday, 7:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
          
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
                borderRadius: '25px',
                padding: '2.5rem',
                boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                marginBottom: '2rem',
                border: '3px solid #F06292',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 50px rgba(236, 64, 122, 0.3)'
              }}
            >
              <h4 style={{ 
                color: '#D81B60', 
                marginBottom: '1.5rem',
                fontFamily: 'Fredoka One, cursive',
                fontSize: '1.6rem',
                fontWeight: 'bold'
              }}>
                Send us a Message
              </h4>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    name="parent_name"
                    placeholder="Your Name"
                    value={formData.parent_name}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EC407A';
                      e.target.style.boxShadow = '0 0 20px rgba(236, 64, 122, 0.3)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#87CEEB'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    name="child_age"
                    placeholder="Child's Age"
                    value={formData.child_age}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#87CEEB'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    disabled={branchesLoading}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      background: branchesLoading ? '#f8f9fa' : 'white',
                      opacity: branchesLoading ? 0.7 : 1
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#87CEEB'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  >
                    <option value="">
                      {branchesLoading ? 'Loading branches...' : 
                       branchesError ? 'Error loading branches' : 
                       'Select a Branch'}
                    </option>
                    {Array.isArray(branches) && branches.map(branch => (
                      <option key={branch.id} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                  {branchesError && (
                    <div style={{
                      color: '#dc3545',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem'
                    }}>
                      {branchesError}
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#87CEEB'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div style={{
                    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    ✅ Thank you for your inquiry! We will contact you soon.
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    ❌ {submitError}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting 
                      ? 'linear-gradient(135deg, #ccc, #999)' 
                      : 'linear-gradient(135deg, #EC407A, #D81B60)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 35px',
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(236, 64, 122, 0.3)',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.5px',
                    opacity: submitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(236, 64, 122, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(236, 64, 122, 0.3)';
                    }
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SimpleContact;
