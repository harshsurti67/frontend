import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaChild, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter,
  FaHeart,
  FaGraduationCap,
  FaStar
} from 'react-icons/fa';
import { apiService } from '../services/api';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setSettingsLoading(true);
        const response = await apiService.getSettings();
        const settingsData = response.data?.results || response.data;
        if (settingsData && Array.isArray(settingsData)) {
          const settingsObj = {};
          settingsData.forEach(setting => {
            settingsObj[setting.key] = setting.value;
          });
          setSettings(settingsObj);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setSettingsLoading(false);
      }
    };
    
    fetchSettings();
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
    hidden: { y: 20, opacity: 0 },
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
    <footer className="footer">
      <div className="footer-top">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.2 }}
          >
            <Row className="g-4">
              {/* About Section */}
              <Col lg={4} md={6}>
                <motion.div className="footer-section" variants={itemVariants}>
                  <div className="footer-logo">
                    <FaChild className="logo-icon" />
                    <span className="logo-text" style={{ fontFamily: 'Fredoka One, cursive' }}>KIDDOO PRESCHOOL</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '-10px', marginBottom: '15px' }}>
                    By Aarya International School
                  </p>
                  <p className="footer-description">
                    Nurturing young minds with world-class infrastructure, innovative curriculum, 
                    and experienced educators. We provide a safe, stimulating environment with 
                    activity-based learning, smart technology, and personalized care.
                  </p>
                  <div className="footer-stats">
                    <div className="stat-item">
                      <FaGraduationCap className="stat-icon" />
                      <span>15+ Years Experience</span>
                    </div>
                    <div className="stat-item">
                      <FaStar className="stat-icon" />
                      <span>98% Parent Satisfaction</span>
                    </div>
                  </div>
                </motion.div>
              </Col>

              {/* Quick Links */}
              <Col lg={2} md={6}>
                <motion.div className="footer-section" variants={itemVariants}>
                  <h5 className="footer-title">{t('footer.quick_links')}</h5>
                  <ul className="footer-links">
                    <li><Link to="/">{t('navbar.home')}</Link></li>
                    <li><Link to="/programs">{t('navbar.programs')}</Link></li>
                    <li><Link to="/gallery">{t('navbar.gallery')}</Link></li>
                    <li><Link to="/events">{t('navbar.events')}</Link></li>
                    <li><Link to="/blog">{t('navbar.blog')}</Link></li>
                    <li><Link to="/about">{t('footer.about')}</Link></li>
                    <li><Link to="/admissions">{t('navbar.admissions')}</Link></li>
                    <li><Link to="/contact">{t('navbar.contact')}</Link></li>
                  </ul>
                </motion.div>
              </Col>

              {/* Programs */}
              <Col lg={2} md={6}>
                <motion.div className="footer-section" variants={itemVariants}>
                  <h5 className="footer-title">Our Programs</h5>
                  <ul className="footer-links">
                    <li><Link to="/programs">Toddler Program</Link></li>
                    <li><Link to="/programs">Preschool Program</Link></li>
                    <li><Link to="/programs">Pre-K Program</Link></li>
                    <li><Link to="/programs">Summer Camp</Link></li>
                    <li><Link to="/programs">After School Care</Link></li>
                  </ul>
                </motion.div>
              </Col>

              {/* Contact Info */}
              <Col lg={4} md={6}>
                <motion.div className="footer-section" variants={itemVariants}>
                  <h5 className="footer-title">Contact Information</h5>
                  <div className="contact-info">
                    <div className="contact-item">
                      <FaMapMarkerAlt className="contact-icon" />
                      <div>
                        <strong>Main Campus</strong>
                        <p>{settingsLoading ? 'Loading...' : settings.address || '123 Main Street, Downtown, City 12345'}</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <FaPhone className="contact-icon" />
                      <div>
                        <strong>Phone</strong>
                        <p>{settingsLoading ? 'Loading...' : settings.phone_number || '(555) 123-4567'}</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <FaEnvelope className="contact-icon" />
                      <div>
                        <strong>Email</strong>
                        <p>{settingsLoading ? 'Loading...' : settings.email || 'info@kidoopreschool.com'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Newsletter Signup */}
                  <div className="newsletter-signup">
                    <h6>Stay Updated</h6>
                    <p>{settingsLoading ? 'Loading...' : settings.newsletter_signup_text || 'Subscribe to our newsletter for parenting tips and updates!'}</p>
                    <div className="newsletter-form">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="newsletter-input"
                      />
                      <Button className="newsletter-btn">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="footer-bottom-left">
                <p>&copy; {currentYear} Kidoo Preschool. {t('footer.rights')}</p>
                <div className="footer-bottom-links">
                  <Link to="/privacy">Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/sitemap">Sitemap</Link>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="footer-bottom-right">
                <div className="social-links">
                  <span>Follow Us:</span>
                  <motion.a 
                    href={settings.facebook_url || "https://facebook.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link facebook"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFacebook />
                  </motion.a>
                  <motion.a 
                    href={settings.instagram_url || "https://instagram.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link instagram"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaInstagram />
                  </motion.a>
                  <motion.a 
                    href={settings.youtube_url || "https://youtube.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link youtube"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaYoutube />
                  </motion.a>
                  <motion.a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link twitter"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTwitter />
                  </motion.a>
                </div>
                <div className="footer-heart">
                  <span>Made with</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaHeart className="heart-icon" />
                  </motion.span>
                  <span>for children</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
