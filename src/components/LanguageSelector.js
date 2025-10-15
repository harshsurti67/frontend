import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🏫' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Dropdown align="end" className="language-selector">
      <Dropdown.Toggle
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(32, 178, 170, 0.1))',
          border: '2px solid rgba(135, 206, 235, 0.3)',
          borderRadius: '15px',
          padding: '8px 12px',
          color: '#1A202C',
          fontWeight: '600',
          fontSize: '0.9rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
        }}
        className="language-toggle"
      >
        <span style={{ fontSize: '1.2rem' }}>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>▼</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          border: '2px solid rgba(135, 206, 235, 0.3)',
          borderRadius: '15px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
          padding: '0.5rem',
          minWidth: '150px'
        }}
      >
        {languages.map((language) => (
          <Dropdown.Item
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            style={{
              borderRadius: '10px',
              padding: '10px 15px',
              margin: '2px 0',
              fontWeight: i18n.language === language.code ? '700' : '500',
              color: i18n.language === language.code ? '#1E40AF' : '#1A202C',
              background: i18n.language === language.code 
                ? 'linear-gradient(135deg, rgba(135, 206, 235, 0.2), rgba(32, 178, 170, 0.1))' 
                : 'transparent',
              border: i18n.language === language.code ? '1px solid rgba(135, 206, 235, 0.4)' : 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            className="language-option"
            onMouseEnter={(e) => {
              if (i18n.language !== language.code) {
                e.target.style.background = 'linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(32, 178, 170, 0.05))';
                e.target.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (i18n.language !== language.code) {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateX(0)';
              }
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{language.flag}</span>
            <span>{language.name}</span>
            {i18n.language === language.code && (
              <span style={{ 
                marginLeft: 'auto', 
                fontSize: '0.8rem', 
                color: '#1E40AF',
                fontWeight: 'bold'
              }}>
                ✓
              </span>
            )}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;

