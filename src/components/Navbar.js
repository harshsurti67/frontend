import React, { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChild } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('navbar.home') },
    { path: '/programs', label: t('navbar.programs') },
    { path: '/gallery', label: t('navbar.gallery') },
    { path: '/events', label: t('navbar.events') },
    { path: '/blog', label: t('navbar.blog') },
    { path: '/about', label: t('navbar.about') },
    { path: '/admissions', label: t('navbar.admissions') },
    { path: '/contact', label: t('navbar.contact') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <BSNavbar
      expand="lg"
      fixed="top"
      className={`custom-navbar glassmorphism-navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}
    >
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="navbar-brand">
          <motion.div
            className="brand-content"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            <img 
              src="/images/kiddoo-logo.svg" 
              alt="Kiddoo Preschool Logo" 
              style={{
                height: '70px',
                width: 'auto'
              }}
              onError={(e) => {
                // Try PNG fallback
                if (e.target.src.includes('.svg')) {
                  e.target.src = '/images/kiddoo-logo.png';
                } else {
                  // If both fail, hide and show icon
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }
              }}
            />
            <FaChild className="brand-icon" style={{ display: 'none', fontSize: '2.5rem', color: '#87CEEB' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.1rem' }}>
              <span style={{
                fontFamily: 'Fredoka One, cursive',
                fontSize: '1.6rem',
                background: 'linear-gradient(90deg, #1E88E5 0%, #FDD835 20%, #E53935 40%, #43A047 60%, #FB8C00 80%, #1E88E5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                letterSpacing: '1px',
                lineHeight: '1.2'
              }}>
                KIDDOO
              </span>
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                color: '#1a237e',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1'
              }}>
                PRESCHOOL
              </span>
              <span style={{
                fontSize: '0.6rem',
                color: '#666',
                fontWeight: '500',
                letterSpacing: '0.5px',
                marginTop: '0.1rem'
              }}>
                BY AARYA INTERNATIONAL SCHOOL
              </span>
            </div>
          </motion.div>
        </BSNavbar.Brand>

        <BSNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className="mobile-toggle"
          onClick={toggleMobileMenu}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </BSNavbar.Toggle>

        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                    <Nav.Link
                      as={Link}
                      to={link.path}
                      className={`nav-link animated-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                      style={{
                        position: 'relative',
                        color: location.pathname === link.path ? '#87CEEB' : '#4B0082',
                        fontWeight: location.pathname === link.path ? '600' : '500',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {link.label}
                      <motion.div
                        className="nav-underline"
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: location.pathname === link.path ? 1 : 0,
                          backgroundColor: location.pathname === link.path ? '#87CEEB' : '#4B0082'
                        }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          bottom: '-5px',
                          left: 0,
                          right: 0,
                          height: '3px',
                          borderRadius: '2px',
                          transformOrigin: 'left'
                        }}
                      />
                    </Nav.Link>
              </motion.div>
            ))}
          </Nav>

          <motion.div
            className="navbar-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <Button
              as={Link}
              to="/admissions"
              className="btn-enroll glow-on-hover"
              variant="primary"
              style={{
                background: 'linear-gradient(45deg, #87CEEB, #20B2AA)',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 20px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(135, 206, 235, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              {t('navbar.enroll')}
            </Button>
          </motion.div>
        </BSNavbar.Collapse>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <div className="mobile-menu-header">
                  <h3>Menu</h3>
                  <Button
                    variant="link"
                    className="close-btn"
                    onClick={toggleMobileMenu}
                  >
                    <FaTimes />
                  </Button>
                </div>
                <Nav className="flex-column">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Nav.Link
                        as={Link}
                        to={link.path}
                        className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                      >
                        {link.label}
                      </Nav.Link>
                    </motion.div>
                  ))}
                </Nav>
                <div className="mobile-menu-footer">
                  <Button
                    as={Link}
                    to="/admissions"
                    className="btn-enroll-mobile"
                    variant="primary"
                    onClick={toggleMobileMenu}
                  >
                    {t('navbar.enroll')}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
