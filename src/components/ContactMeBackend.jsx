import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactMe.module.css';

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
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_bylqbgl',          // ✅ Service ID
        'template_m6lyjgc',         // ✅ Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'RNW4YECMg1KNDiWrX'          // ✅ Public Key
      );

      setSubmitStatus({
        type: 'success',
        message: "Message sent successfully! I'll get back to you soon."
      });

      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
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

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.name ? styles.errorInput : ''}`}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.email ? styles.errorInput : ''}`}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.formTextarea} ${errors.message ? styles.errorInput : ''}`}
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>

          {submitStatus && (
            <div className={`${styles.statusMessage} ${
              submitStatus.type === 'success' ? styles.success : styles.error
            }`}>
              {submitStatus.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMeBackend;
