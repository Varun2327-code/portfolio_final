import React, { useState, useEffect, useCallback } from 'react'
import styles from './ScrollRail.module.css'

const RAIL_SECTIONS = [
  { id: 'hero', label: 'HOME', num: '01' },
  { id: 'about', label: 'ABOUT', num: '02' },
  { id: 'stats', label: 'STATS', num: '03' },
  { id: 'skills', label: 'SKILLS', num: '04' },
  { id: 'experience', label: 'EXPERIENCE', num: '05' },
  { id: 'projects', label: 'PROJECTS', num: '06' },
  { id: 'security', label: 'SECURITY', num: '07' },
  { id: 'contact', label: 'CONTACT', num: '08' },
]

const ScrollRail = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)

          const scrollPos = scrollY + window.innerHeight * 0.35
          let found = 'hero'
          for (const sec of RAIL_SECTIONS) {
            const el = document.getElementById(sec.id)
            if (el && el.offsetTop <= scrollPos) found = sec.id
          }
          setActiveSection(found)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const activeIndex = RAIL_SECTIONS.findIndex(s => s.id === activeSection)

  return (
    <nav className={styles.rail} aria-label="Section navigation rail">
      {/* Background line */}
      <div className={styles.line} aria-hidden="true">
        <div
          className={styles.lineFill}
          style={{ height: `${progress}%` }}
        />
      </div>

      {RAIL_SECTIONS.map((sec, i) => (
        <button
          key={sec.id}
          className={`${styles.node} ${activeSection === sec.id ? styles.active : ''} ${i < activeIndex ? styles.passed : ''}`}
          onClick={() => scrollTo(sec.id)}
          aria-label={`Go to ${sec.label} section`}
          aria-current={activeSection === sec.id ? 'page' : undefined}
        >
          <span className={styles.nodeNum}>{sec.num}</span>
          <div className={styles.nodeDot} aria-hidden="true" />
          <span className={styles.nodeLabel}>{sec.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default ScrollRail
