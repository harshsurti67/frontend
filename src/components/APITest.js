import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const APITest = () => {
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('Testing...');

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true);
        setApiStatus('Fetching data from API...');
        
        console.log('Testing API connection to:', process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api');
        
        // Test Programs API
        const programsResponse = await apiService.getPrograms();
        console.log('Programs API Response:', programsResponse);
        setPrograms(programsResponse.data.results || programsResponse.data);
        
        // Test Events API
        const eventsResponse = await apiService.getEvents();
        console.log('Events API Response:', eventsResponse);
        setEvents(eventsResponse.data.results || eventsResponse.data);

        // Test Blogs API
        const blogsResponse = await apiService.getBlogs();
        console.log('Blogs API Response:', blogsResponse);
        setBlogs(blogsResponse.data.results || blogsResponse.data);

        setApiStatus('✅ API Connection Successful!');
        setError(null);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        setApiStatus('❌ API Connection Failed');
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ 
      padding: '2rem', 
      background: '#f8f9fa', 
      borderRadius: '10px',
      margin: '2rem',
      border: '2px solid #007bff'
    }}>
      <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>
        🔗 API Connection Test
      </h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Status:</strong> {apiStatus}
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api'}
      </div>

      {loading && (
        <div style={{ color: '#007bff' }}>
          ⏳ Loading programs...
        </div>
      )}

      {error && (
        <div style={{ color: '#dc3545', background: '#f8d7da', padding: '1rem', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {programs.length > 0 && (
        <div>
          <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>
            ✅ Found {programs.length} Programs:
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {programs.map((program, index) => (
              <div key={program.id} style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ color: '#007bff', marginBottom: '0.5rem' }}>
                  {program.name}
                </h4>
                <p><strong>Age Group:</strong> {program.age_group}</p>
                <p><strong>Description:</strong> {program.description}</p>
                {program.image && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Image:</strong> 
                    <br />
                    <img 
                      src={program.image} 
                      alt={program.name}
                      style={{ 
                        width: '200px', 
                        height: '150px', 
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginTop: '0.5rem'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>
            ✅ Found {events.length} Events:
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {events.map((event, index) => (
              <div key={event.id} style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ color: '#dc3545', marginBottom: '0.5rem' }}>
                  {event.title}
                </h4>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {event.description}</p>
                {event.image && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Image:</strong> 
                    <br />
                    <img 
                      src={event.image} 
                      alt={event.title}
                      style={{ 
                        width: '200px', 
                        height: '150px', 
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginTop: '0.5rem'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {blogs.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>
            ✅ Found {blogs.length} Blog Posts:
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {blogs.map((blog, index) => (
              <div key={blog.id} style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ color: '#17a2b8', marginBottom: '0.5rem' }}>
                  {blog.title}
                </h4>
                <p><strong>Excerpt:</strong> {blog.excerpt}</p>
                <p><strong>Created:</strong> {new Date(blog.created_at).toLocaleDateString()}</p>
                {blog.image && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Image:</strong>
                    <br />
                    <img
                      src={blog.image}
                      alt={blog.title}
                      style={{
                        width: '200px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginTop: '0.5rem'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default APITest;
