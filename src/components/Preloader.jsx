import React, { useState, useEffect } from 'react'
import styles from './Preloader.module.css'

const TERMINAL_LINES = [
  '> Initializing portfolio...',
  '> Loading interface...',
  '> Loading projects...',
  '> Loading security modules...',
  '> Establishing secure connection...',
  '> System ready.',
]

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentLines, setCurrentLines] = useState([])
  const [accessGranted, setAccessGranted] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation entirely
      setProgress(100)
      setCurrentLines(TERMINAL_LINES)
      setAccessGranted(true)
      const t = setTimeout(() => {
        setLeaving(true)
        setTimeout(() => onComplete?.(), 300)
      }, 300)
      return () => clearTimeout(t)
    }

    const totalDuration = 2200 // ms
    const startTime = Date.now()

    // Progress counter
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(Math.floor((elapsed / totalDuration) * 100), 100)
      setProgress(newProgress)
      if (newProgress >= 100) clearInterval(progressInterval)
    }, 22)

    // Terminal lines — stagger over first 1800ms
    TERMINAL_LINES.forEach((_, i) => {
      const delay = (i / TERMINAL_LINES.length) * 1800
      setTimeout(() => {
        setCurrentLines(prev => [...prev, TERMINAL_LINES[i]])
      }, delay)
    })

    // Access granted at 100%
    const accessTimer = setTimeout(() => {
      setAccessGranted(true)
    }, totalDuration - 100)

    // Exit
    const exitTimer = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => onComplete?.(), 700)
    }, totalDuration + 200)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(accessTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  return (
    <div className={`${styles.preloader} ${leaving ? styles.leaving : ''}`} aria-label="Loading portfolio" role="status">
      {/* Background grid */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logo} aria-label="VPORTFOLIO">
          <span className={styles.logoV}>V</span>
          <span className={styles.logoPorfolio}>PORTFOLIO</span>
        </div>

        <div className={styles.name}>VARUN SHRIMAL</div>

        {/* Terminal */}
        <div className={styles.terminal} role="log" aria-live="polite">
          {currentLines.map((line, i) => (
            <div key={i} className={styles.terminalLine}>
              <span className={styles.terminalText}>{line}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressLabel}>
            {accessGranted
              ? <span className={styles.accessGranted}>ACCESS GRANTED</span>
              : <span className={styles.progressNum}>{String(progress).padStart(2, '0')}%</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
