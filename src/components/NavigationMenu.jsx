import React, { useState, useEffect, useCallback } from 'react'
import styles from './NavigationMenu.module.css'

const NAV_SECTIONS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'security', label: 'SECURITY' },
  { id: 'contact', label: 'CONTACT' },
]

const NavigationMenu = ({ darkMode, onToggleTheme }) => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 60)

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)

      // Active section
      const scrollPos = scrollY + window.innerHeight * 0.35
      let found = 'hero'
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.id)
        if (el && el.offsetTop <= scrollPos) found = sec.id
      }
      setActiveSection(found)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <nav
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <button
            className={styles.logo}
            onClick={() => scrollTo('hero')}
            aria-label="Scroll to top"
          >
            <span className={styles.logoV}>V</span>
            <span className={styles.logoText}>PORTFOLIO</span>
          </button>

          {/* Desktop Links */}
          <ul className={styles.navList} role="list">
            {NAV_SECTIONS.map(sec => (
              <li key={sec.id}>
                <button
                  className={`${styles.navLink} ${activeSection === sec.id ? styles.active : ''}`}
                  onClick={() => scrollTo(sec.id)}
                  aria-current={activeSection === sec.id ? 'page' : undefined}
                >
                  {sec.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className={styles.controls}>
            <button
              className={styles.talkBtn}
              onClick={() => scrollTo('contact')}
              aria-label="Contact me"
            >
              LET'S TALK
            </button>

            <button
              className={styles.themeToggle}
              onClick={onToggleTheme}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
          aria-hidden={!mobileOpen}
        >
          <ul role="list">
            {NAV_SECTIONS.map((sec, i) => (
              <li key={sec.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <button
                  className={`${styles.mobileLink} ${activeSection === sec.id ? styles.active : ''}`}
                  onClick={() => scrollTo(sec.id)}
                >
                  <span className={styles.mobileNum}>0{i + 1}</span>
                  {sec.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavigationMenu
