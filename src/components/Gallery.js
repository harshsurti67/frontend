import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPlay, FaImage, FaFilter, FaTimes } from 'react-icons/fa';
import { apiService } from '../services/api';
import './Gallery.css';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const filters = ['All', 'Activities', 'Learning', 'Daily Life'];

  useEffect(() => {
    const mockData = [
          {
            id: 1,
            title: 'Children Playing in Garden',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Activities'
          },
          {
            id: 2,
            title: 'Art and Craft Session',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Activities'
          },
          {
            id: 3,
            title: 'Story Time',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Learning'
          },
          {
            id: 4,
            title: 'Outdoor Play',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Activities'
          },
          {
            id: 5,
            title: 'Science Experiment',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Learning'
          },
          {
            id: 6,
            title: 'Lunch Time',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Daily Life'
          }
        ];

    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await apiService.getGallery();
        console.log('Gallery API Response:', response.data); // Debug log
        const items = response.data?.results || response.data;
        if (Array.isArray(items) && items.length > 0) {
          console.log('Gallery setting API data:', items); // Debug log
          setGalleryItems(items);
          setFilteredItems(items);
          setError(null);
        } else {
          console.log('Gallery using mock data'); // Debug log
          setGalleryItems(mockData);
          setFilteredItems(mockData);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery');
        console.log('Gallery using mock data due to error'); // Debug log
        setGalleryItems(mockData);
        setFilteredItems(mockData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    if (!Array.isArray(galleryItems)) {
      setFilteredItems([]);
      return;
    }
    
    if (activeFilter === 'All') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter, galleryItems]);

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

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <section className="gallery-section">
        <Container>
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading gallery...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="gallery-section" ref={ref}>
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">
            Take a peek into our vibrant world of learning, play, and discovery
          </p>
        </motion.div>

        {error && (
          <div className="alert alert-warning text-center">
            {error}
          </div>
        )}

        {/* Filter Buttons */}
        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="filter-buttons">
            {filters.map((filter) => (
              <Button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                variant={activeFilter === filter ? 'primary' : 'outline-primary'}
                onClick={() => handleFilterChange(filter)}
              >
                <FaFilter className="me-2" />
                {filter}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Row className="g-3">
            {(Array.isArray(filteredItems) ? filteredItems : []).map((item, index) => (
              <Col lg={4} md={6} key={item.id}>
                <motion.div
                  className="gallery-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="gallery-item-inner">
                    <div className="gallery-image-container">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="gallery-image"
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-overlay-content">
                          {item.type === 'video' ? (
                            <FaPlay className="gallery-icon" />
                          ) : (
                            <FaImage className="gallery-icon" />
                          )}
                          <h6 className="gallery-title">{item.title}</h6>
                          <span className="gallery-category">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            className="no-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>No items found in this category.</p>
          </motion.div>
        )}
      </Container>

      {/* Lightbox Modal */}
      {selectedItem && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="lightbox-close"
              variant="light"
              onClick={closeLightbox}
            >
              <FaTimes />
            </Button>
            <div className="lightbox-media">
              {selectedItem.type === 'video' ? (
                <div className="video-container">
                  <iframe
                    src={selectedItem.url}
                    title={selectedItem.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="lightbox-image"
                />
              )}
            </div>
            <div className="lightbox-info">
              <h4>{selectedItem.title}</h4>
              <p className="lightbox-category">{selectedItem.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
