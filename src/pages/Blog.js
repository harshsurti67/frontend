import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../components/BlogBackground.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data as fallback
  const mockBlogPosts = [
    {
      id: 1,
      title: "The Importance of Play in Early Childhood Development",
      excerpt: "Discover how play-based learning helps children develop essential skills and prepares them for future academic success.",
      content: "Play is not just fun for children—it's essential for their development. Research shows that play-based learning helps children develop cognitive, social, emotional, and physical skills...",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Education"
    },
    {
      id: 2,
      title: "Creating a Safe Learning Environment for Toddlers",
      excerpt: "Learn practical tips for creating a safe, nurturing environment that encourages exploration and learning.",
      content: "A safe learning environment is crucial for toddlers to explore, learn, and grow. Here are some key strategies for creating spaces that are both safe and stimulating...",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      author: "Michael Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Safety"
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await apiService.getBlogs();
        const data = response.data?.results || response.data;
        
        if (Array.isArray(data) && data.length > 0) {
          // Transform API data to match the expected format
          const transformedBlogs = data.map(blog => ({
            id: blog.id,
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image || 'https://via.placeholder.com/400x250?text=No+Image',
            author: "Kidoo Preschool", // Default author since API doesn't have author
            date: blog.created_at,
            readTime: "5 min read", // Default read time
            category: "Education" // Default category
          }));
          setBlogPosts(transformedBlogs);
        } else {
          setBlogPosts(mockBlogPosts);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts');
        setBlogPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCardColors = (index) => {
    const colors = [
      { bg: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', border: '#64B5F6', badge: 'linear-gradient(135deg, #42A5F5, #1E88E5)', title: '#1E88E5', button: 'linear-gradient(135deg, #42A5F5, #1E88E5)', shadow: '0 20px 50px rgba(66, 165, 245, 0.3)', check: '#42A5F5' },
      { bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', border: '#BA68C8', badge: 'linear-gradient(135deg, #AB47BC, #8E24AA)', title: '#8E24AA', button: 'linear-gradient(135deg, #AB47BC, #8E24AA)', shadow: '0 20px 50px rgba(171, 71, 188, 0.3)', check: '#AB47BC' },
      { bg: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)', border: '#FDD835', badge: 'linear-gradient(135deg, #FFEB3B, #FBC02D)', title: '#F57F17', button: 'linear-gradient(135deg, #FFEB3B, #FBC02D)', shadow: '0 20px 50px rgba(255, 235, 59, 0.4)', check: '#FFEB3B', textColor: '#333' },
      { bg: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', border: '#FFA726', badge: 'linear-gradient(135deg, #FF9800, #F57C00)', title: '#F57C00', button: 'linear-gradient(135deg, #FF9800, #F57C00)', shadow: '0 20px 50px rgba(255, 152, 0, 0.3)', check: '#FF9800' },
      { bg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', border: '#66BB6A', badge: 'linear-gradient(135deg, #66BB6A, #43A047)', title: '#43A047', button: 'linear-gradient(135deg, #66BB6A, #43A047)', shadow: '0 20px 50px rgba(102, 187, 106, 0.3)', check: '#66BB6A' },
      { bg: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', border: '#F06292', badge: 'linear-gradient(135deg, #E91E63, #C2185B)', title: '#C2185B', button: 'linear-gradient(135deg, #E91E63, #C2185B)', shadow: '0 20px 50px rgba(233, 30, 99, 0.3)', check: '#E91E63' }
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFCCBC 0%, #B2EBF2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#4B0082' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📖</div>
          <h3>Loading Blog Posts...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      background: `
        linear-gradient(135deg, 
          #FFCCBC 0%, 
          #B2EBF2 100%
        )
      `,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Blog Elements */}
      <div className="blog-background-elements">
        <motion.div
          className="floating-blog-book book-1"
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
          📖
        </motion.div>
        <motion.div
          className="floating-blog-pen pen-1"
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
          ✍️
        </motion.div>
        <motion.div
          className="floating-blog-note note-1"
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
          📝
        </motion.div>
        <motion.div
          className="floating-blog-book book-2"
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
          📚
        </motion.div>
        <motion.div
          className="floating-blog-paper paper-1"
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
          📄
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
            Our Blog
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Expert insights, tips, and resources for parents and early childhood education
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🔄 Refresh Blog
          </button>
        </motion.div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '1rem', 
            borderRadius: '10px', 
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#dc3545'
          }}>
            <strong>⚠️ {error}</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
              Showing cached data. Please refresh the page.
            </p>
          </div>
        )}


        <Row>
          {(Array.isArray(blogPosts) ? blogPosts : []).map((post, index) => {
            const colors = getCardColors(index);
            return (
            <Col lg={4} md={6} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  background: colors.bg,
                  borderRadius: '25px',
                  padding: '0',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  marginBottom: '3rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: `3px solid ${colors.border}`
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -15,
                  boxShadow: colors.shadow,
                  transition: { duration: 0.3 }
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: colors.badge,
                    color: colors.textColor || 'white',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    📝 {post.category}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: colors.title,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    ⏱️ {post.readTime}
                  </div>
                </div>
                
                <div style={{ 
                  padding: '2.5rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h3 style={{ 
                    color: colors.title,
                    marginBottom: '1rem',
                    fontSize: '1.6rem',
                    fontFamily: 'Fredoka One, cursive',
                    fontWeight: 'bold',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.7',
                    marginBottom: '1.8rem',
                    fontSize: '1rem',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {post.excerpt}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    color: '#666',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: colors.title,
                      fontWeight: '600'
                    }}>
                      ✍️ By {post.author}
                    </span>
                  </div>

                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.7)',
                    padding: '1rem',
                    borderRadius: '15px',
                    marginBottom: '1.5rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <span style={{ 
                      color: colors.title,
                      fontSize: '0.9rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      📅 {formatDate(post.date)}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug || post.id}`}
                    style={{
                      background: colors.button,
                      color: colors.textColor || 'white',
                      border: 'none',
                      padding: '14px 30px',
                      borderRadius: '30px',
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'block',
                      textAlign: 'center',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      fontFamily: 'Poppins, sans-serif',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                    }}
                  >
                    📖 Read More
                  </Link>
                </div>
              </motion.div>
            </Col>
          );
          })}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white',
            marginTop: '3rem'
          }}
        >
          <h3 style={{ 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontFamily: 'Fredoka, cursive'
          }}>
            Stay Updated
          </h3>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Subscribe to our newsletter for the latest parenting tips and educational insights
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '12px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '1rem',
                minWidth: '250px',
                outline: 'none'
              }}
            />
            <button style={{
              background: 'white',
              color: '#4B0082',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Blog;
