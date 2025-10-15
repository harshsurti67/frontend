import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import FloatingElements from './components/FloatingElements';
import ErrorBoundary from './components/ErrorBoundary';
import APITest from './components/APITest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Import i18n configuration
import './i18n';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Preloader />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/api-test" element={<APITest />} />
            </Routes>
          </main>
          <FloatingElements />
          <ScrollToTop />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
