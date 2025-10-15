import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { apiService } from '../services/api';
import './FloatingElements.css';

const FloatingElements = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
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
      }
    };
    
    fetchSettings();
  }, []);

  return (
    <div className="floating-elements">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${settings.whatsapp_number || '1234567890'}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaWhatsapp />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${settings.phone_number || '+1234567890'}`}
        className="floating-btn call-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaPhone />
      </motion.a>
    </div>
  );
};

export default FloatingElements;
