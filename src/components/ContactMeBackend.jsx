import React, { useState } from 'react';
import styles from './ContactMe.module.css';
import { API_CONFIG } from '../config/api';

const ContactMeBackend = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactContainer}>
        <h2>Get In Touch</h2>
        <p className={styles.subtitle}>Let's create something amazing together</p>
        
        <div className={styles.contactContent}>
          {/* === Left Side Info Section === */}
          <div className={styles.contactInfo}>
            <h3>Let's Talk</h3>
            <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
            
            <div className={styles.infoCards}>
              {/* 📧 Email Card - Clickable Mailto */}
              <a 
                href="mailto:varunshrimal27@gmail.com" 
                className={styles.infoCard}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.icon}>📧</div>
                <div>
                  <h4>Email</h4>
                  <p>varunshrimal27@gmail.com</p>
                </div>
              </a>
              
              {/* 📍 Location */}
              <div className={styles.infoCard}>
                <div className={styles.icon}>📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Vadodara</p>
                </div>
              </div>
              
              {/* ⚡ Response Time */}
              <div className={styles.infoCard}>
                <div className={styles.icon}>⚡</div>
                <div>
                  <h4>Response Time</h4>
                  <p>Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* === Contact Form Section === */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.formInput} ${errors.name ? styles.errorInput : ''}`}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.formInput} ${errors.email ? styles.errorInput : ''}`}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className={`${styles.formTextarea} ${errors.message ? styles.errorInput : ''}`}
                rows="5"
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            {submitStatus && (
              <div className={`${styles.statusMessage} ${submitStatus.type === 'success' ? styles.success : styles.error}`}>
                {submitStatus.message}
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* === Social Links === */}
        <div className={styles.socialLinks}>
          <a 
            href="https://www.linkedin.com/in/varun-shrimal-203705283" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <span className={styles.socialIcon}>💼</span>
            LinkedIn
          </a>
          <a 
            href="https://github.com/Varun2327-code" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <span className={styles.socialIcon}>🐱</span>
            GitHub
          </a>
          <a 
            href="https://instagram.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <span className={styles.socialIcon}>📸</span>
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactMeBackend;
