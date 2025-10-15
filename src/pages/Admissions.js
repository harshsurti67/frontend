import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/api';
import '../components/AdmissionsBackground.css';

const Admissions = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Student Information
    student_first_name: '',
    student_last_name: '',
    student_date_of_birth: '',
    student_gender: '',
    
    // Parent/Guardian Information
    parent_first_name: '',
    parent_last_name: '',
    parent_email: '',
    parent_phone: '',
    parent_relationship: 'Parent',
    
    // Emergency Contact Information
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    zip_code: '',
    
    // Program Information
    preferred_program: '',
    preferred_start_date: '',
    current_school: '',
    
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(true);

  // Fetch Programs and FAQs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setProgramsLoading(true);
        const response = await apiService.getPrograms();
        const items = response.data?.results || response.data;
        if (items && Array.isArray(items)) {
          setPrograms(items);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
      } finally {
        setProgramsLoading(false);
      }
    };

    const fetchFAQs = async () => {
      try {
        setFaqLoading(true);
        const response = await apiService.getFAQs();
        const items = response.data?.results || response.data;
        
        if (Array.isArray(items) && items.length > 0) {
          setFaqs(items);
        } else {
          // Fallback to hardcoded FAQs if API returns no data
          setFaqs([
            {
              id: 1,
              question: "What age groups do you accept?",
              answer: "We accept children from 2 to 5 years old. We have programs for Toddlers (2-3 years), Preschool (3-4 years), and Pre-K (4-5 years)."
            },
            {
              id: 2,
              question: "What are your operating hours?",
              answer: "Our regular hours are Monday through Friday, 7:00 AM to 6:00 PM. We offer both full-day and half-day programs to accommodate different family needs."
            },
            {
              id: 3,
              question: "Do you provide meals and snacks?",
              answer: "Yes, we provide nutritious meals and snacks throughout the day. Our menu is designed by a nutritionist and includes fresh fruits, vegetables, and balanced meals."
            },
            {
              id: 4,
              question: "What is your teacher-to-student ratio?",
              answer: "We maintain low teacher-to-student ratios to ensure individual attention: 1:6 for toddlers, 1:8 for preschool, and 1:10 for pre-K."
            },
            {
              id: 5,
              question: "Do you offer financial assistance?",
              answer: "Yes, we offer need-based financial assistance and accept various childcare subsidy programs. Please contact our office for more information about available options."
            },
            {
              id: 6,
              question: "What safety measures do you have in place?",
              answer: "We have comprehensive safety protocols including secure entry systems, regular safety drills, background-checked staff, and a nurse on-site during school hours."
            },
            {
              id: 7,
              question: "How do you handle special needs children?",
              answer: "We welcome children with special needs and work with families to create individualized support plans. Our staff is trained in inclusive education practices."
            },
            {
              id: 8,
              question: "What is your policy on sick children?",
              answer: "We follow strict health guidelines to protect all children. Children with fever, contagious illnesses, or other symptoms must stay home until they are symptom-free for 24 hours."
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        // Use fallback FAQs on error
        setFaqs([
          {
            id: 1,
            question: "What age groups do you accept?",
            answer: "We accept children from 2 to 5 years old. We have programs for Toddlers (2-3 years), Preschool (3-4 years), and Pre-K (4-5 years)."
          },
          {
            id: 2,
            question: "What are your operating hours?",
            answer: "Our regular hours are Monday through Friday, 7:00 AM to 6:00 PM. We offer both full-day and half-day programs to accommodate different family needs."
          },
          {
            id: 3,
            question: "Do you provide meals and snacks?",
            answer: "Yes, we provide nutritious meals and snacks throughout the day. Our menu is designed by a nutritionist and includes fresh fruits, vegetables, and balanced meals."
          },
          {
            id: 4,
            question: "What is your teacher-to-student ratio?",
            answer: "We maintain low teacher-to-student ratios to ensure individual attention: 1:6 for toddlers, 1:8 for preschool, and 1:10 for pre-K."
          },
          {
            id: 5,
            question: "Do you offer financial assistance?",
            answer: "Yes, we offer need-based financial assistance and accept various childcare subsidy programs. Please contact our office for more information about available options."
          },
          {
            id: 6,
            question: "What safety measures do you have in place?",
            answer: "We have comprehensive safety protocols including secure entry systems, regular safety drills, background-checked staff, and a nurse on-site during school hours."
          },
          {
            id: 7,
            question: "How do you handle special needs children?",
            answer: "We welcome children with special needs and work with families to create individualized support plans. Our staff is trained in inclusive education practices."
          },
          {
            id: 8,
            question: "What is your policy on sick children?",
            answer: "We follow strict health guidelines to protect all children. Children with fever, contagious illnesses, or other symptoms must stay home until they are symptom-free for 24 hours."
          }
        ]);
      } finally {
        setFaqLoading(false);
      }
    };

    fetchPrograms();
    fetchFAQs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'student_first_name', 'student_last_name', 'student_date_of_birth', 'student_gender',
      'parent_first_name', 'parent_last_name', 'parent_email', 'parent_phone',
      'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship',
      'address', 'city', 'state', 'zip_code', 'preferred_program', 'preferred_start_date'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.parent_email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.parent_phone.replace(/[\s\-\(\)]/g, ''))) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate form before submission
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    try {
      console.log('Submitting admission form with data:', formData);
      const response = await apiService.submitAdmission(formData);
      console.log('Admission submission response:', response);
      setSuccess(true);
      setFormData({
        student_first_name: '',
        student_last_name: '',
        student_date_of_birth: '',
        student_gender: '',
        parent_first_name: '',
        parent_last_name: '',
        parent_email: '',
        parent_phone: '',
        parent_relationship: 'Parent',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relationship: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        preferred_program: '',
        preferred_start_date: '',
        current_school: ''
      });
    } catch (err) {
      console.error('Admission submission error:', err);
      if (err.response && err.response.data) {
        setError(`Failed to submit application: ${JSON.stringify(err.response.data)}`);
      } else if (err.message) {
        setError(`Failed to submit application: ${err.message}`);
      } else {
        setError('Failed to submit application. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formSteps = [
    {
      title: t('admissions.steps.student_info'),
      fields: ['student_first_name', 'student_last_name', 'student_date_of_birth', 'student_gender']
    },
    {
      title: t('admissions.steps.parent_info'), 
      fields: ['parent_first_name', 'parent_last_name', 'parent_email', 'parent_phone', 'parent_relationship']
    },
    {
      title: t('admissions.steps.program_info'),
      fields: ['preferred_program', 'preferred_start_date', 'current_school']
    },
    {
      title: t('admissions.steps.address_info'),
      fields: ['address', 'city', 'state', 'zip_code']
    },
    {
      title: t('admissions.steps.emergency_contact'),
      fields: ['emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship']
    }
  ];

  const admissionSteps = [
    {
      step: 1,
      title: "Initial Inquiry",
      description: "Contact us to learn more about our programs and schedule a visit",
      details: [
        "Call or email our admissions office",
        "Schedule a personalized tour",
        "Meet with our director",
        "Learn about our curriculum and approach"
      ],
      icon: "📞"
    },
    {
      step: 2,
      title: "School Tour",
      description: "Visit our facilities and see our programs in action",
      details: [
        "Tour our classrooms and outdoor spaces",
        "Observe children in their learning environment",
        "Meet our teachers and staff",
        "Ask questions about our programs"
      ],
      icon: "🏫"
    },
    {
      step: 3,
      title: "Application",
      description: "Submit your application and required documents",
      details: [
        "Complete the application form",
        "Provide child's birth certificate",
        "Submit immunization records",
        "Include emergency contact information"
      ],
      icon: "📝"
    },
    {
      step: 4,
      title: "Assessment",
      description: "Meet with our team to assess your child's needs",
      details: [
        "Child development assessment",
        "Parent interview",
        "Review of any special needs",
        "Determine appropriate program placement"
      ],
      icon: "🔍"
    },
    {
      step: 5,
      title: "Enrollment",
      description: "Complete enrollment and prepare for the first day",
      details: [
        "Sign enrollment agreement",
        "Pay registration fees",
        "Attend orientation session",
        "Prepare for the first day of school"
      ],
      icon: "✅"
    }
  ];


  if (success) {
    return (
      <div className="admissions-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px',
        background: 'linear-gradient(135deg, #C5CAE9 0%, #FFE0B2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '4rem',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎉</div>
            <h2 style={{ 
              color: '#4B0082', 
              marginBottom: '1rem',
              fontFamily: 'Fredoka, cursive',
              fontSize: '2.5rem'
            }}>
{t('admissions.success.title')}
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              marginBottom: '2rem'
            }}>
              {t('admissions.success.message')}
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setSuccess(false)}
              style={{
                background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
                border: 'none',
                borderRadius: '25px',
                padding: '15px 30px'
              }}
            >
{t('admissions.success.submit_another')}
            </Button>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="admissions-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      background: 'linear-gradient(135deg, #C5CAE9 0%, #FFE0B2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Educational Elements */}
      <div className="admissions-background-elements">
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
            {t('admissions.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {t('admissions.subtitle')}
          </p>
        </motion.div>

        {error && (
          <Alert variant="danger" style={{ marginBottom: '2rem' }}>
            {error}
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Form onSubmit={handleSubmit} style={{
            background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.15) 0%, rgba(32, 178, 170, 0.15) 30%, rgba(147, 112, 219, 0.1) 70%, rgba(255, 182, 193, 0.1) 100%)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(135, 206, 235, 0.3)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(135, 206, 235, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative background elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.3), rgba(32, 178, 170, 0.3), rgba(152, 251, 152, 0.2))',
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
              background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 192, 203, 0.3), rgba(147, 112, 219, 0.2))',
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
              background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(186, 85, 211, 0.3), rgba(255, 182, 193, 0.2))',
              borderRadius: '50%',
              zIndex: 1,
              animation: 'float 7s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '20%',
              right: '-10px',
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(230, 230, 250, 0.3), rgba(255, 228, 181, 0.3))',
              borderRadius: '50%',
              zIndex: 1,
              animation: 'float 5s ease-in-out infinite'
            }}></div>
            {/* Form Progress */}
            <div style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {formSteps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    style={{ 
                      flex: '1 1 calc(20% - 0.5rem)',
                      minWidth: '120px',
                      textAlign: 'center',
                      opacity: activeStep >= index ? 1 : 0.5,
                      marginBottom: '1rem'
                    }}
                    animate={{
                      scale: activeStep === index ? 1.1 : 1,
                      y: activeStep === index ? -5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: activeStep >= index 
                          ? 'linear-gradient(135deg, #1E40AF, #3B82F6, #60A5FA)' 
                          : 'linear-gradient(135deg, #9CA3AF, #6B7280)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.5rem',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: activeStep >= index 
                          ? '0 10px 30px rgba(30, 64, 175, 0.5), 0 0 0 2px rgba(255,255,255,0.4)' 
                          : '0 6px 20px rgba(0,0,0,0.2)',
                        border: activeStep >= index ? '3px solid rgba(255,255,255,0.5)' : '2px solid rgba(255,255,255,0.2)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        position: 'relative',
                        zIndex: 10
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {index + 1}
                    </motion.div>
                    <motion.small 
                      style={{ 
                        fontSize: '0.75rem', 
                        color: activeStep >= index ? '#1A202C' : '#6B7280',
                        fontWeight: activeStep >= index ? '700' : '500',
                        textShadow: activeStep >= index ? '1px 1px 2px rgba(255,255,255,0.8)' : 'none',
                        position: 'relative',
                        zIndex: 10,
                        display: 'block',
                        lineHeight: '1.2',
                        wordWrap: 'break-word',
                        hyphens: 'auto'
                      }}
                      animate={{
                        color: activeStep >= index ? '#1A202C' : '#6B7280'
                      }}
                    >
                      {step.title}
                    </motion.small>
                  </motion.div>
                ))}
              </div>
              <div style={{
                height: '8px',
                background: 'linear-gradient(90deg, #1E40AF, #3B82F6, #60A5FA)',
                borderRadius: '4px',
                width: `${((activeStep + 1) / formSteps.length) * 100}%`,
                transition: 'width 0.5s ease',
                boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4), 0 0 0 1px rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>
            </div>

            {/* Form Summary on Last Step */}
            {activeStep === formSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(32, 178, 170, 0.15) 50%, rgba(152, 251, 152, 0.1) 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  marginBottom: '2rem',
                  border: '2px solid rgba(135, 206, 235, 0.4)',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 15px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 style={{ 
                  color: '#1A202C', 
                  marginBottom: '1.5rem',
                  fontSize: '1.6rem',
                  fontFamily: 'Fredoka, cursive',
                  textAlign: 'center',
                  fontWeight: '700',
                  textShadow: '2px 2px 4px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.7)'
                }}>
                  📋 Review Your Application
                </h4>
                <Row>
                  <Col md={6}>
                    <h6 style={{ color: '#1A202C', marginBottom: '1rem', fontWeight: '700', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>👶 Student Information</h6>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Name:</strong> {formData.student_first_name} {formData.student_last_name}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Date of Birth:</strong> {formData.student_date_of_birth}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Gender:</strong> {formData.student_gender}</p>
                    
                    <h6 style={{ color: '#1A202C', marginBottom: '1rem', marginTop: '1.5rem', fontWeight: '700', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>👨‍👩‍👧‍👦 Parent Information</h6>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Name:</strong> {formData.parent_first_name} {formData.parent_last_name}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Email:</strong> {formData.parent_email}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Phone:</strong> {formData.parent_phone}</p>
                  </Col>
                  <Col md={6}>
                    <h6 style={{ color: '#1A202C', marginBottom: '1rem', fontWeight: '700', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>🏫 Program Information</h6>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Program:</strong> {programs.find(p => p.id.toString() === formData.preferred_program)?.name || formData.preferred_program}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Start Date:</strong> {formData.preferred_start_date}</p>
                    
                    <h6 style={{ color: '#1A202C', marginBottom: '1rem', marginTop: '1.5rem', fontWeight: '700', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>🏠 Address</h6>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Address:</strong> {formData.address}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>City:</strong> {formData.city}, {formData.state} {formData.zip_code}</p>
                    
                    <h6 style={{ color: '#1A202C', marginBottom: '1rem', marginTop: '1.5rem', fontWeight: '700', textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>🚨 Emergency Contact</h6>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Name:</strong> {formData.emergency_contact_name}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Phone:</strong> {formData.emergency_contact_phone}</p>
                    <p style={{ color: '#2D3748', fontWeight: '500', textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}><strong>Relationship:</strong> {formData.emergency_contact_relationship}</p>
                  </Col>
                </Row>
              </motion.div>
            )}

            {/* Form Fields */}
            <Row style={{ position: 'relative', zIndex: 2 }}>
              {formSteps[activeStep].fields.map((fieldName, fieldIndex) => (
                <Col xs={12} md={6} key={fieldName} style={{ marginBottom: '1.5rem' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: fieldIndex * 0.1 }}
                  >
                    {fieldName === 'student_gender' ? (
                      <Form.Group>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Form.Label style={{ 
                            fontWeight: '600', 
                            color: '#4B0082',
                            fontSize: '1rem',
                            marginBottom: '0.5rem',
                            display: 'block'
                          }}>
                            {t('admissions.form.student_gender')} *
                          </Form.Label>
                          <Form.Select
                            name={fieldName}
                            value={formData[fieldName]}
                            onChange={handleInputChange}
                            required
                            style={{ 
                              borderRadius: '15px', 
                              border: '2px solid #e0e0e0',
                              padding: '12px 15px',
                              fontSize: '1rem',
                              background: 'rgba(255,255,255,0.9)',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#87CEEB';
                              e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e0e0e0';
                              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                            }}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </motion.div>
                      </Form.Group>
                  ) : fieldName === 'preferred_program' ? (
                    <Form.Group>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Label style={{ 
                          fontWeight: '600', 
                          color: '#4B0082',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          Preferred Program *
                        </Form.Label>
                        <Form.Select
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleInputChange}
                          required
                          style={{ 
                            borderRadius: '15px', 
                            border: '2px solid #e0e0e0',
                            padding: '12px 15px',
                            fontSize: '1rem',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#87CEEB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                          }}
                        >
                          <option value="">Select Program</option>
                          {programsLoading ? (
                            <option value="" disabled>Loading programs...</option>
                          ) : programs.length > 0 ? (
                            programs.map((program) => (
                              <option key={program.id} value={program.id}>
                                {program.name} - {program.description}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>No programs available</option>
                          )}
                        </Form.Select>
                      </motion.div>
                    </Form.Group>
                  ) : fieldName.includes('date') ? (
                    <Form.Group>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Label style={{ 
                          fontWeight: '600', 
                          color: '#4B0082',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          {fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} *
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleInputChange}
                          required
                          style={{ 
                            borderRadius: '15px', 
                            border: '2px solid #e0e0e0',
                            padding: '12px 15px',
                            fontSize: '1rem',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#87CEEB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                          }}
                        />
                      </motion.div>
                    </Form.Group>
                  ) : fieldName.includes('phone') ? (
                    <Form.Group>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Label style={{ 
                          fontWeight: '600', 
                          color: '#4B0082',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          {fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} *
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleInputChange}
                          required
                          style={{ 
                            borderRadius: '15px', 
                            border: '2px solid #e0e0e0',
                            padding: '12px 15px',
                            fontSize: '1rem',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#87CEEB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                          }}
                        />
                      </motion.div>
                    </Form.Group>
                  ) : fieldName === 'parent_email' ? (
                    <Form.Group>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Label style={{ 
                          fontWeight: '600', 
                          color: '#4B0082',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          Parent Email *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleInputChange}
                          required
                          style={{ 
                            borderRadius: '15px', 
                            border: '2px solid #e0e0e0',
                            padding: '12px 15px',
                            fontSize: '1rem',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#87CEEB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                          }}
                        />
                      </motion.div>
                    </Form.Group>
                  ) : fieldName.includes('conditions') || fieldName.includes('medications') || 
                      fieldName.includes('needs') || fieldName.includes('experience') || 
                      fieldName.includes('why_choose_us') ? (
                    <Form.Group>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Label style={{ 
                          fontWeight: '600', 
                          color: '#4B0082',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          {fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleInputChange}
                          style={{ 
                            borderRadius: '15px', 
                            border: '2px solid #e0e0e0',
                            padding: '12px 15px',
                            fontSize: '1rem',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            resize: 'vertical'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#87CEEB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                          }}
                        />
                      </motion.div>
                    </Form.Group>
                  ) : (
                    <Form.Group>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Label style={{ 
                          fontWeight: '600', 
                          color: '#4B0082',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          {fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name={fieldName}
                          value={formData[fieldName]}
                          onChange={handleInputChange}
                          required
                          style={{ 
                            borderRadius: '15px', 
                            border: '2px solid #e0e0e0',
                            padding: '12px 15px',
                            fontSize: '1rem',
                            background: 'rgba(255,255,255,0.9)',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#87CEEB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 235, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                          }}
                        />
                      </motion.div>
                    </Form.Group>
                  )}
                  </motion.div>
                </Col>
              ))}
            </Row>

            {/* Navigation Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '3rem',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Mobile-first button layout */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                  <Button
                    variant="outline-primary"
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    style={{ 
                      borderRadius: '25px', 
                      padding: '12px 20px',
                      border: activeStep === 0 ? '2px solid #999' : '3px solid #1E40AF',
                      color: activeStep === 0 ? '#666' : '#1E40AF',
                      background: activeStep === 0 ? 'rgba(200, 200, 200, 0.2)' : 'linear-gradient(135deg, rgba(30, 64, 175, 0.15), rgba(59, 130, 246, 0.1))',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      boxShadow: activeStep === 0 ? '0 4px 15px rgba(0,0,0,0.1)' : '0 10px 30px rgba(30, 64, 175, 0.4), 0 0 0 1px rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                      opacity: activeStep === 0 ? 0.6 : 1,
                      cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
                      textShadow: activeStep === 0 ? 'none' : '1px 1px 2px rgba(255,255,255,0.8)',
                      position: 'relative',
                      zIndex: 10,
                      width: '100%'
                    }}
                  >
                    {t('admissions.buttons.previous')}
                  </Button>
                </motion.div>
                
                {activeStep < formSteps.length - 1 ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ flex: '1 1 auto', minWidth: '120px' }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => setActiveStep(Math.min(formSteps.length - 1, activeStep + 1))}
                      style={{ 
                        background: 'linear-gradient(135deg, #1E40AF, #3B82F6, #60A5FA)',
                        border: '3px solid #1E40AF',
                        borderRadius: '25px', 
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        boxShadow: '0 10px 30px rgba(30, 64, 175, 0.4), 0 0 0 1px rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        color: '#FFFFFF',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        position: 'relative',
                        zIndex: 10,
                        width: '100%'
                      }}
                    >
                      {t('admissions.buttons.next')}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ flex: '1 1 auto', minWidth: '120px' }}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      style={{ 
                        background: loading 
                          ? 'linear-gradient(135deg, #ccc, #999)' 
                          : 'linear-gradient(135deg, #059669, #10B981, #34D399)',
                        border: loading ? '2px solid #999' : '3px solid #059669',
                        borderRadius: '25px', 
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        boxShadow: loading 
                          ? '0 4px 15px rgba(0,0,0,0.1)' 
                          : '0 10px 30px rgba(5, 150, 105, 0.4), 0 0 0 1px rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        color: '#FFFFFF',
                        textShadow: loading ? 'none' : '1px 1px 2px rgba(0,0,0,0.3)',
                        position: 'relative',
                        zIndex: 10,
                        width: '100%'
                      }}
                    >
                      {loading ? t('admissions.buttons.submitting') : t('admissions.buttons.submit_application')}
                    </Button>
                  </motion.div>
                )}
              </div>
              
              {/* Review & Submit Button - Full width on mobile */}
              {activeStep < formSteps.length - 1 && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline-success"
                    onClick={() => setActiveStep(formSteps.length - 1)}
                    style={{ 
                      borderRadius: '25px', 
                      padding: '12px 20px',
                      border: '3px solid #059669',
                      color: '#059669',
                      background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(16, 185, 129, 0.1))',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3), 0 0 0 1px rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                      textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
                      position: 'relative',
                      zIndex: 10,
                      width: '100%'
                    }}
                  >
                    📋 {t('admissions.buttons.review_submit')}
                  </Button>
                </motion.div>
              )}
            </div>
          </Form>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: '4rem' }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#4B0082', 
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'Fredoka, cursive'
          }}>
{t('admissions.faq.title')}
          </h2>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
            borderRadius: '25px',
            padding: '2.5rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative background elements for FAQ */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(32, 178, 170, 0.1))',
              borderRadius: '50%',
              zIndex: 1
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 192, 203, 0.1))',
              borderRadius: '50%',
              zIndex: 1
            }}></div>
            {faqLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❓</div>
                <h3 style={{ color: '#4B0082' }}>Loading FAQs...</h3>
              </div>
            ) : (
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Accordion defaultActiveKey="0">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Accordion.Item 
                        eventKey={index.toString()}
                        style={{
                          marginBottom: '1rem',
                          borderRadius: '15px',
                          border: '2px solid rgba(135, 206, 235, 0.1)',
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.7)',
                          backdropFilter: 'blur(5px)'
                        }}
                      >
                        <Accordion.Header style={{
                          background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.05), rgba(32, 178, 170, 0.05))',
                          border: 'none',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#4B0082',
                          padding: '1.5rem',
                          borderRadius: '15px 15px 0 0'
                        }}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                          >
                            <div style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}>
                              ?
                            </div>
                            {faq.question}
                          </motion.div>
                        </Accordion.Header>
                        <Accordion.Body style={{
                          fontSize: '1rem',
                          lineHeight: '1.6',
                          color: '#666',
                          padding: '1.5rem',
                          background: 'rgba(255,255,255,0.9)',
                          borderRadius: '0 0 15px 15px'
                        }}>
                          {faq.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Admissions;
