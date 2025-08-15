import React, { useState } from 'react'
import styles from './ContactMe.module.css'

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message || 'Message sent! Thank you for contacting me.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactContainer}>
        <h2>Get In Touch</h2>
        <p className={styles.subtitle}>Let's create something amazing together</p>
        
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h3>Let's Talk</h3>
            <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
            
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.icon}>📧</div>
                <div>
                  <h4>Email</h4>
                  <p>varunshrimal27@gmail.com</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.icon}>📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Available Worldwide</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.icon}>⚡</div>
                <div>
                  <h4>Response Time</h4>
                  <p>Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.formTextarea}
                rows="5"
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

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
  )
}

export default ContactMe
