import React, { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const Preloader = () => {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 600) // smooth fade duration
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.animatedBackground}></div>

        <div className={styles.glowParticles}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={styles.particle}></span>
          ))}
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.logoContainer}>
            {'VARUN'.split('').map((letter, index) => (
              <span key={index} className={styles.letter}>{letter}</span>
            ))}
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
