import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-app.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Programs
  getPrograms: () => api.get('/programs/'),
  getProgram: (id) => api.get(`/programs/${id}/`),

  // Gallery
  getGallery: (params = {}) => api.get('/gallery/', { params }),
  getGalleryItem: (id) => api.get(`/gallery/${id}/`),

  // Testimonials
  getTestimonials: () => api.get('/testimonials/'),
  getTestimonial: (id) => api.get(`/testimonials/${id}/`),

  // Events
  getEvents: (params = {}) => api.get('/events/', { params }),
  getUpcomingEvents: () => api.get('/events/upcoming/'),
  getEvent: (id) => api.get(`/events/${id}/`),

  // Branches
  getBranches: () => api.get('/branches/'),
  getBranch: (id) => api.get(`/branches/${id}/`),

  // Inquiries
  createInquiry: (data) => api.post('/inquiries/', data),

  // Blog
  getBlogs: (params = {}) => api.get('/blogs/', { params }),
  getBlog: (slug) => api.get(`/blogs/${slug}/`),
  getRelatedBlogs: (id) => api.get(`/blogs/${id}/related/`),

  // Team
  getTeamMembers: () => api.get('/team/'),
  getTeamMember: (id) => api.get(`/team/${id}/`),

  // FAQs
  getFAQs: (params = {}) => api.get('/faqs/', { params }),
  getFAQ: (id) => api.get(`/faqs/${id}/`),

  // Settings
  getSettings: () => api.get('/settings/'),
  getSetting: (key) => api.get(`/settings/?key=${key}`),

  // About Us
  getAboutPage: () => api.get('/about-page/'),
  getAboutFeatures: (params = {}) => api.get('/about-features/', { params }),
  getAboutFeaturesByCategory: () => api.get('/about-features/by_category/'),

  // Home Slider
  getHomeSlider: () => api.get('/home-slider/'),

  // Home Stats
  getHomeStats: () => api.get('/home-stats/'),

  // Admissions
  submitAdmission: (data) => api.post('/admissions/', data),
};

export default api;
