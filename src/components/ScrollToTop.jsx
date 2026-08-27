import React, { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setProgress(pct)
      setVisible(scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle math
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      data-cursor="hover"
    >
      {/* Progress ring */}
      <svg
        className={styles.ring}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        {/* Track */}
        <circle cx="22" cy="22" r={radius} className={styles.track} />
        {/* Fill */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className={styles.fill}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Arrow */}
      <svg
        className={styles.arrow}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default ScrollToTop
