import React, { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const Preloader = () => {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500) // Fade out duration
    }, 2500) // Show preloader for 2.5 seconds
    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (!loading) return null

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.animatedBackground}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.logoContainer}>
            <div className={styles.letter}>V</div>
            <div className={styles.letter}>A</div>
            <div className={styles.letter}>R</div>
            <div className={styles.letter}>U</div>
            <div className={styles.letter}>N</div>
          </div>
          <div className={styles.subtitle}>Portfolio</div>
          <div className={styles.loadingBar}>
            <div className={styles.loadingProgress}></div>
          </div>
          <div className={styles.dotsContainer}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
