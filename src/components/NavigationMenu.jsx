import React, { useState, useEffect } from 'react'
import styles from './NavigationMenu.module.css'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
]

const NavigationMenu = () => {
  const [darkMode, setDarkMode] = useState(false) // default to light
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setDarkMode(savedTheme === 'dark')
    document.body.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light'
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen)

  const handleClick = (e, id) => {
    e.preventDefault()
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>V<span>Portfolio</span></span>
        </div>

        <ul className={`${styles.navList} ${mobileOpen ? styles.open : ''}`}>
          {sections.map(section => (
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
          <button className={styles.themeToggle} onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
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
