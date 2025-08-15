import React, { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!visible) {
    return null
  }

  return (
    <button className={styles.scrollToTop} onClick={scrollToTop} aria-label="Scroll to top">
      ↑
    </button>
  )
}

export default ScrollToTop
