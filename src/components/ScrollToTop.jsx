import React, { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`${styles.scrollToTop} ${visible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span className={styles.arrow}>↑</span>
    </button>
  )
}

export default ScrollToTop
