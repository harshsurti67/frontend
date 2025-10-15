import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { apiService } from '../services/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await apiService.getBlogs();
        const blogs = response.data?.results || response.data;
        
        if (Array.isArray(blogs)) {
          // Try to find by slug first, then by ID if slug is a number
          let foundBlog = blogs.find(blog => blog.slug === slug);
          if (!foundBlog && !isNaN(slug)) {
            foundBlog = blogs.find(blog => blog.id === parseInt(slug));
          }
          
          if (foundBlog) {
            // Transform API data to match expected format
            const transformedBlog = {
              id: foundBlog.id,
              title: foundBlog.title,
              excerpt: foundBlog.excerpt,
              content: foundBlog.content,
              image: foundBlog.image || 'https://via.placeholder.com/800x400?text=No+Image',
              author: "Kidoo Preschool", // Default author
              date: foundBlog.created_at,
              readTime: "5 min read", // Default read time
              category: "Education" // Default category
            };
            setCurrentPost(transformedBlog);
          } else {
            setError('Blog post not found');
          }
        } else {
          setError('Failed to load blog data');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <h3>Loading Blog Post...</h3>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFCCBC 0%, #B2EBF2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#4B0082' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <h3>{error || 'Blog post not found'}</h3>
          <Link 
            to="/blog"
            style={{
              color: '#4B0082',
              textDecoration: 'underline',
              marginTop: '1rem',
              display: 'block'
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      background: `
        linear-gradient(135deg, 
          #FFF3E0 0%, 
          #E1F5FE 50%,
          #FCE4EC 100%
        )
      `,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link 
            to="/blog"
            style={{
              background: 'linear-gradient(135deg, #87CEEB, #20B2AA)',
              color: 'white',
              textDecoration: 'none',
              padding: '12px 25px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '2rem',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <div style={{ 
            marginBottom: '3rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
              color: 'white',
              padding: '10px 25px',
              borderRadius: '25px',
              display: 'inline-block',
              fontSize: '1rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)',
              fontFamily: 'Poppins, sans-serif'
            }}>
              📝 {currentPost.category}
            </div>
            
            <h1 style={{ 
              fontSize: '3.5rem', 
              background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              fontFamily: 'Fredoka One, cursive',
              lineHeight: '1.2',
              textAlign: 'center'
            }}>
              {currentPost.title}
            </h1>
            
            <p style={{ 
              fontSize: '1.4rem', 
              color: '#555',
              marginBottom: '2rem',
              lineHeight: '1.6',
              textAlign: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontStyle: 'italic'
            }}>
              {currentPost.excerpt}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '2rem',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
                padding: '12px 20px',
                borderRadius: '20px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#1E88E5',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(30, 136, 229, 0.2)'
              }}>
                <span>👤</span>
                <span>By {currentPost.author}</span>
                </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
                padding: '12px 20px',
                borderRadius: '20px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#8E24AA',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(142, 36, 170, 0.2)'
              }}>
                <span>📅</span>
                <span>{formatDate(currentPost.date)}</span>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #FFF9C4, #FFF59D)',
                padding: '12px 20px',
                borderRadius: '20px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#F57F17',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(245, 127, 23, 0.2)'
              }}>
                <span>⏱️</span>
                <span>{currentPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ 
              width: '100%', 
              height: '600px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              <div style={{
                position: 'absolute',
                top: '20%',
                right: '20%',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
              
            <img
              src={currentPost.image}
              alt={currentPost.title}
              style={{
                width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                borderRadius: '20px',
                  position: 'relative',
                  zIndex: 2
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
            </div>
          </div>

          {/* Article Content */}
          <Row>
            <Col lg={8}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '25px',
                padding: '3.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                marginBottom: '3rem',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                <div style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  {currentPost.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} style={{
                          background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '2rem',
                          marginTop: '2.5rem',
                          marginBottom: '1.5rem',
                          fontFamily: 'Fredoka One, cursive',
                          fontWeight: 'bold'
                        }}>
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} style={{
                          color: '#1E88E5',
                          fontSize: '1.6rem',
                          marginTop: '2rem',
                          marginBottom: '1rem',
                          fontFamily: 'Fredoka One, cursive',
                          fontWeight: 'bold'
                        }}>
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    } else if (paragraph.startsWith('- **')) {
                      const text = paragraph.replace('- **', '').replace('**:', ':');
                      return (
                        <div key={index} style={{ 
                          marginBottom: '0.8rem',
                          background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
                          padding: '12px 20px',
                          borderRadius: '15px',
                          border: '2px solid #64B5F6'
                        }}>
                          <strong style={{ 
                            color: '#1E88E5',
                            fontSize: '1.1rem',
                            fontFamily: 'Poppins, sans-serif'
                          }}>{text}</strong>
                        </div>
                      );
                    } else if (paragraph.startsWith('- ')) {
                      return (
                        <div key={index} style={{ 
                          marginBottom: '0.8rem', 
                          paddingLeft: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            color: '#42A5F5',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                          }}>✓</span>
                          <span style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1.1rem'
                          }}>{paragraph.replace('- ', '')}</span>
                        </div>
                      );
                    } else if (paragraph.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} style={{ 
                          marginBottom: '1.8rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1.1rem'
                        }}>
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>
                
                {/* Article Footer */}
                <div style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '3px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                      color: 'white',
                      padding: '10px 18px',
                      borderRadius: '25px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)'
                    }}>
                      📝 {currentPost.category}
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #AB47BC, #8E24AA)',
                      color: 'white',
                      padding: '10px 18px',
                      borderRadius: '25px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      boxShadow: '0 4px 15px rgba(171, 71, 188, 0.3)'
                    }}>
                      ⏱️ {currentPost.readTime}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.8rem'
                  }}>
                    <button style={{
                      background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 18px',
                      borderRadius: '50%',
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(66, 165, 245, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(66, 165, 245, 0.3)';
                    }}
                    >
                      👍
                    </button>
                    <button style={{
                      background: 'linear-gradient(135deg, #AB47BC, #8E24AA)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 18px',
                      borderRadius: '50%',
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(171, 71, 188, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(171, 71, 188, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(171, 71, 188, 0.3)';
                    }}
                    >
                      💬
                    </button>
                    <button style={{
                      background: 'linear-gradient(135deg, #66BB6A, #43A047)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 18px',
                      borderRadius: '50%',
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(102, 187, 106, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 187, 106, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 187, 106, 0.3)';
                    }}
                    >
                      📤
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={4}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '25px',
                padding: '2.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                position: 'sticky',
                top: '120px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                <h4 style={{ 
                  background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '2rem',
                  fontFamily: 'Fredoka One, cursive',
                  fontSize: '1.8rem',
                  textAlign: 'center'
                }}>
                  📤 Share This Article
                </h4>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginBottom: '2.5rem',
                  justifyContent: 'center'
                }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #3b5998, #2d4373)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(59, 89, 152, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(59, 89, 152, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(59, 89, 152, 0.3)';
                  }}
                  >
                    📘 Facebook
                  </button>
                  <button style={{
                    background: 'linear-gradient(135deg, #1da1f2, #0d8bd9)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(29, 161, 242, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(29, 161, 242, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(29, 161, 242, 0.3)';
                  }}
                  >
                    🐦 Twitter
                  </button>
                </div>
                
                <h4 style={{ 
                  background: 'linear-gradient(135deg, #4B0082, #8E24AA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1.5rem',
                  fontFamily: 'Fredoka One, cursive',
                  fontSize: '1.6rem',
                  textAlign: 'center'
                }}>
                  📚 Related Articles
                </h4>
                <div style={{ fontSize: '1rem' }}>
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
                    borderRadius: '15px',
                    border: '2px solid #64B5F6',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(100, 181, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  >
                    <Link to="/blog/2" style={{ 
                      color: '#1E88E5', 
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.1rem'
                    }}>
                      🏠 Creating a Safe Learning Environment for Toddlers
                    </Link>
                  </div>
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
                    borderRadius: '15px',
                    border: '2px solid #BA68C8',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(186, 104, 200, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  >
                    <Link to="/blog/3" style={{ 
                      color: '#8E24AA', 
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.1rem'
                    }}>
                      👥 Building Social Skills Through Group Activities
                    </Link>
                  </div>
                  <div style={{ 
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #FFF9C4, #FFF59D)',
                    borderRadius: '15px',
                    border: '2px solid #FDD835',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(253, 216, 53, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  >
                    <Link to="/blog/4" style={{ 
                      color: '#F57F17', 
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.1rem'
                    }}>
                      🥗 Nutrition Tips for Growing Preschoolers
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogDetail;
