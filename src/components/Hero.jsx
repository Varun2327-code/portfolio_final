import React, { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const Hero = () => {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  
  const roles = ['Cybersecurity Analyst', 'Web Developer', 'Security Researcher', 'Full Stack Developer']
  const fullText = roles[loopNum % roles.length]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1))
        setTypingSpeed(50)
      } else {
        setText(fullText.substring(0, text.length + 1))
        setTypingSpeed(150)
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, fullText, typingSpeed])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.floatingElements}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.name}>VARUN SHRIMAL</h1>
        <p className={styles.role}>
          <span className={styles.typewriter}>{text}</span>
          <span className={styles.cursor}>|</span>
        </p>
        <p className={styles.intro}>
          Passionate about building secure, scalable applications and protecting digital assets. 
          I combine cybersecurity expertise with modern web development to create robust solutions.
        </p>
        <div className={styles.buttons}>
          <button 
            onClick={() => scrollToSection('projects')} 
            className={`${styles.button} ${styles.primary}`}
          >
            <span>View Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className={`${styles.button} ${styles.secondary}`}
          >
            <span>Contact Me</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>FRESHER</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>5+</span>
            <span className={styles.statLabel}>Technologies</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} onClick={() => scrollToSection('about')}>
        <div className={styles.scrollArrow}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
