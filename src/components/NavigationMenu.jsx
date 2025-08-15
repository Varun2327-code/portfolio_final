import React, { useState, useEffect } from 'react'
import styles from './NavigationMenu.module.css'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
]

const NavigationMenu = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleClick = (e, id) => {
    e.preventDefault()
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>Portfolio</span>
        </div>
        
        <ul className={styles.navList}>
          {sections.map((section) => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`} 
                onClick={(e) => handleClick(e, section.id)}
                className={`${styles.navLink} ${activeSection === section.id ? styles.active : ''}`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.controls}>
          <button 
            className={`${styles.themeToggle} ${darkMode ? styles.dark : ''}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <span className={styles.toggleTrack}>
              <span className={styles.toggleThumb}></span>
            </span>
            <span className={styles.toggleText}>{darkMode ? '☀️' : '🌙'}</span>
          </button>
          
          <button 
            className={styles.mobileToggle}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavigationMenu
