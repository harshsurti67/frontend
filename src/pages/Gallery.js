import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { apiService } from '../services/api';
import '../components/GalleryBackground.css';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Mock data as fallback
  const mockGalleryItems = [
    {
      id: 1,
      title: "Art Class Activities",
      type: "image",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Activities"
    },
    {
      id: 2,
      title: "Outdoor Play Time",
      type: "image", 
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Playground"
    },
    {
      id: 3,
      title: "Music and Movement",
      type: "image",
      url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Music"
    },
    {
      id: 4,
      title: "Story Time",
      type: "image",
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Reading"
    },
    {
      id: 5,
      title: "Science Experiments",
      type: "image",
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Science"
    },
    {
      id: 6,
      title: "Cooking Class",
      type: "image",
      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cooking"
    }
  ];

  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiService.getGallery();
        const data = response.data?.results || response.data;
        setGalleryItems(Array.isArray(data) ? data : mockGalleryItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setGalleryItems(mockGalleryItems);
        setLoading(false);
      }
    };
    
    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = ["All", "Activities", "Playground", "Music", "Reading", "Science", "Cooking"];

  const filteredItems = !Array.isArray(galleryItems) 
    ? [] 
    : activeFilter === 'All' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === activeFilter);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="gallery-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px',
        background: `
          linear-gradient(135deg, 
            #E1BEE7 0%, 
            #FFECB3 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Floating Gallery Elements */}
      <div className="gallery-background-elements">
        <motion.div
          className="floating-camera camera-1"
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
          📷
        </motion.div>
        <motion.div
          className="floating-picture picture-1"
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
          🖼️
        </motion.div>
        <motion.div
          className="floating-palette palette-1"
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
          🎨
        </motion.div>
        <motion.div
          className="floating-camera camera-2"
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
          📸
        </motion.div>
        <motion.div
          className="floating-frame frame-1"
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
          🖼️
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
{t('gallery.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {t('gallery.description')}
          </p>
        </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    style={{
                      background: category === activeFilter 
                        ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      color: category === activeFilter ? 'white' : '#4B0082',
                      border: category === activeFilter ? '3px solid #1E88E5' : '3px solid transparent',
                      padding: '12px 25px',
                      borderRadius: '30px',
                      fontSize: '1rem',
                      fontWeight: category === activeFilter ? '700' : '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: category === activeFilter 
                        ? '0 6px 20px rgba(30, 136, 229, 0.3)' 
                        : '0 4px 15px rgba(0,0,0,0.1)',
                      fontFamily: 'Poppins, sans-serif',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      if (category !== activeFilter) {
                        e.target.style.background = 'rgba(66, 165, 245, 0.2)';
                        e.target.style.border = '3px solid #42A5F5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (category !== activeFilter) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                        e.target.style.border = '3px solid transparent';
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

        {/* Gallery Grid */}
        <Row>
          {(Array.isArray(filteredItems) ? filteredItems : []).map((item, index) => (
            <Col lg={4} md={6} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                style={{
                  background: index % 6 === 0 
                    ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' 
                    : index % 6 === 1 
                    ? 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
                    : index % 6 === 2
                    ? 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)'
                    : index % 6 === 3
                    ? 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)'
                    : index % 6 === 4
                    ? 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
                    : 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
                  borderRadius: '25px',
                  padding: '0',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  marginBottom: '2rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: index % 6 === 0 
                    ? '3px solid #64B5F6' 
                    : index % 6 === 1 
                    ? '3px solid #BA68C8'
                    : index % 6 === 2
                    ? '3px solid #FDD835'
                    : index % 6 === 3
                    ? '3px solid #F06292'
                    : index % 6 === 4
                    ? '3px solid #66BB6A'
                    : '3px solid #FFA726'
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -15,
                  boxShadow: index % 6 === 0 
                    ? '0 20px 50px rgba(66, 165, 245, 0.3)' 
                    : index % 6 === 1 
                    ? '0 20px 50px rgba(171, 71, 188, 0.3)'
                    : index % 6 === 2
                    ? '0 20px 50px rgba(255, 235, 59, 0.4)'
                    : index % 6 === 3
                    ? '0 20px 50px rgba(236, 64, 122, 0.3)'
                    : index % 6 === 4
                    ? '0 20px 50px rgba(102, 187, 106, 0.3)'
                    : '0 20px 50px rgba(255, 152, 0, 0.3)',
                  transition: { duration: 0.3 }
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: index % 6 === 0 
                      ? 'linear-gradient(135deg, #42A5F5, #1E88E5)' 
                      : index % 6 === 1 
                      ? 'linear-gradient(135deg, #AB47BC, #8E24AA)'
                      : index % 6 === 2
                      ? 'linear-gradient(135deg, #FFEB3B, #FBC02D)'
                      : index % 6 === 3
                      ? 'linear-gradient(135deg, #EC407A, #D81B60)'
                      : index % 6 === 4
                      ? 'linear-gradient(135deg, #66BB6A, #43A047)'
                      : 'linear-gradient(135deg, #FF9800, #F57C00)',
                    color: index % 6 === 2 ? '#333' : 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    {item.category}
                  </div>
                </div>
                
                <div style={{ 
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ 
                    color: index % 6 === 0 ? '#1E88E5' : index % 6 === 1 ? '#8E24AA' : index % 6 === 2 ? '#F57F17' : index % 6 === 3 ? '#D81B60' : index % 6 === 4 ? '#43A047' : '#F57C00',
                    marginBottom: '0.5rem',
                    fontSize: '1.3rem',
                    fontFamily: 'Fredoka One, cursive',
                    fontWeight: 'bold'
                  }}>
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
    </PageTransition>
  );
};

export default Gallery;
