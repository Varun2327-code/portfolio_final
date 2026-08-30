import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AboutMeEnhanced.module.css'

const AboutMe = () => {
  const { about, downloadResume } = usePortfolio()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const handleDownload = () => {
    downloadResume()
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section id="about" className={styles.about} ref={ref} aria-label="About Varun Shrimal">
      {/* Subtle background accent */}
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section label */}
        <motion.div
          className={styles.sectionLabel}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.labelLine} aria-hidden="true" />
          ABOUT ME
        </motion.div>

        <div className={styles.grid}>
          {/* Left: Portrait */}
          <motion.div
            className={styles.imageCol}
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.imageFrame}>
              <img
                src={about.aboutImage || '/about-studio.jpg'}
                alt="Varun Shrimal in Engineering Studio"
                className={styles.image}
                width="650"
                height="407"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.imageOverlay} aria-hidden="true" />
              {/* Corner accents */}
              <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
            </div>

            {/* Info card */}
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ROLE</span>
                <span className={styles.infoValue}>{about.role || 'Full Stack + Cybersecurity'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>LOCATION</span>
                <span className={styles.infoValue}>{about.location || 'Vadodara, India'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>STATUS</span>
                <span className={styles.infoValueGreen}>
                  <span className={styles.dot} aria-hidden="true" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className={styles.textCol}
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2 className={styles.heading}>
              {about.headingLine1 || 'Passionate'}<br />
              <span className={styles.gradientText}>{about.headingLine2 || 'Developer'}</span>
            </h2>

            <p className={styles.bio}>
              {about.bio1}
            </p>
            <p className={styles.bio}>
              {about.bio2}
            </p>

            {/* Traits */}
            <div className={styles.traits}>
              {(about.traits || []).map((trait, i) => (
                <div key={trait.id || i} className={styles.trait}>
                  <span className={styles.traitIcon} aria-hidden="true">{trait.icon}</span>
                  <div>
                    <div className={styles.traitLabel}>{trait.label}</div>
                    <div className={styles.traitDesc}>{trait.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className={styles.ctas}>
              <a
                href="#contact"
                className={styles.btnPrimary}
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                data-cursor="hover"
              >
                LET'S CONNECT
              </a>
              <button
                className={styles.btnOutline}
                onClick={handleDownload}
                data-cursor="hover"
              >
                DOWNLOAD RESUME
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>

            {/* Signature */}
            <div className={styles.signature} aria-label="Varun Shrimal signature">
              <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 45 Q30 10 50 35 Q70 60 90 25 Q110 5 130 30 Q150 50 170 20 Q185 5 195 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
              <span>Varun Shrimal</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
