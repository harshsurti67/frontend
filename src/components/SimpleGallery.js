import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

const SimpleGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback mock data
  const mockGalleryItems = [
    {
      id: 1,
      title: 'Children Playing in Garden',
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Activities'
    },
    {
      id: 2,
      title: 'Art and Craft Session',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Activities'
    },
    {
      id: 3,
      title: 'Story Time',
      url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Learning'
    },
    {
      id: 4,
      title: 'Music and Movement',
      url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Activities'
    },
    {
      id: 5,
      title: 'Snack Time',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Daily Life'
    },
    {
      id: 6,
      title: 'Outdoor Learning',
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Learning'
    }
  ];

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await apiService.getGallery();
        const items = response.data?.results || response.data;
        
        if (Array.isArray(items) && items.length > 0) {
          // Transform API data to match expected format and limit to 3 items
          const transformedItems = items.slice(0, 3).map(item => ({
            id: item.id,
            title: item.title,
            url: item.url || 'https://via.placeholder.com/800x600?text=Image+Not+Found',
            category: item.category || 'Activities'
          }));
          setGalleryItems(transformedItems);
          setError(null);
        } else {
          // Use mock data if API returns no data (already limited to 3)
          setGalleryItems(mockGalleryItems.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setError('Failed to load gallery items');
        // Use mock data as fallback (limited to 3)
        setGalleryItems(mockGalleryItems.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  if (loading) {
    return (
      <section style={{ 
        padding: '80px 0', 
        background: 'transparent',
        minHeight: '600px',
        position: 'relative',
        zIndex: 10
      }}>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <h3 style={{ color: '#4B0082' }}>Loading Gallery...</h3>
          </div>
        </Container>
      </section>
    );
  }

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
            Our Gallery
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            A glimpse into the wonderful world of learning and fun at Kidoo Preschool
          </p>
          {error && (
            <div style={{ 
              color: '#ff6b6b', 
              fontSize: '0.9rem', 
              marginTop: '1rem',
              fontStyle: 'italic'
            }}>
              {error} - Showing sample images
            </div>
          )}
        </motion.div>

        <Row>
          {galleryItems.map((item, index) => (
            <Col md={4} sm={6} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  marginBottom: '2rem',
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
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
                onClick={() => setSelectedImage(item)}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0'}
                  >
                    <div style={{
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600' }}>View</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.6)', 
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h6 style={{ 
                    margin: 0, 
                    marginBottom: '0.5rem',
                    color: index % 6 === 0 ? '#1E88E5' : index % 6 === 1 ? '#8E24AA' : index % 6 === 2 ? '#F57F17' : index % 6 === 3 ? '#D81B60' : index % 6 === 4 ? '#43A047' : '#F57C00',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    fontFamily: 'Fredoka One, cursive'
                  }}>
                    {item.title}
                  </h6>
                  <span style={{
                    color: '#666',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    fontFamily: 'Poppins, sans-serif',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    display: 'inline-block'
                  }}>
                    {item.category}
                  </span>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedImage(null)}
          >
            <div style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '10px'
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
              <div style={{
                position: 'absolute',
                bottom: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                textAlign: 'center'
              }}>
                <h5 style={{ margin: 0, marginBottom: '0.5rem' }}>{selectedImage.title}</h5>
                <span style={{ color: '#87CEEB' }}>{selectedImage.category}</span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default SimpleGallery;
