import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './Timeline.module.css'

const TimelineItem = ({ item, index, inView }) => (
  <motion.div
    className={`${styles.item} ${item.current ? styles.current : ''}`}
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Node */}
    <div className={styles.node} aria-hidden="true">
      <div className={styles.nodeDot}>
        {item.type === 'education' ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm0 2.33L19.32 9 12 12.67 4.68 9 12 5.33zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        )}
      </div>
    </div>

    {/* Card */}
    <div className={styles.card}>
      {item.current && (
        <span className={styles.currentBadge}>
          <span className={styles.dot} aria-hidden="true" />
          Current
        </span>
      )}

      <span className={styles.date}>{item.date}</span>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.org}>{item.organization}</p>
      <p className={styles.desc}>{item.description}</p>

      {/* Tags */}
      <div className={styles.tags}>
        {item.type === 'education' ? (
          <span className={styles.tag}>Education</span>
        ) : (
          <span className={styles.tag}>Experience</span>
        )}
        {item.current && <span className={`${styles.tag} ${styles.tagActive}`}>In Progress</span>}
      </div>
    </div>
  </motion.div>
)

const Timeline = () => {
  const { timeline } = usePortfolio()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className={styles.timeline} ref={ref} aria-label="Education and Experience Timeline">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionLabel}>
            <span className={styles.labelLine} aria-hidden="true" />
            JOURNEY
          </span>
          <h2 className={styles.heading}>Education &amp; Experience</h2>
        </motion.div>

        {/* Timeline items */}
        <div className={styles.items} role="list">
          {/* Vertical line */}
          <div className={styles.line} aria-hidden="true">
            <motion.div
              className={styles.lineFill}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {timeline.map((item, i) => (
            <TimelineItem key={item.id || i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
