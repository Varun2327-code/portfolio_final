import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './Stats.module.css'

const renderStatIcon = (iconType) => {
  switch (iconType) {
    case 'projects':
    case 'laptop':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    case 'security':
    case 'shield':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    case 'bug':
    case 'search':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    case 'star':
    case 'award':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    case 'code':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    case 'zap':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
  }
}

function useCountUp(target, inView, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView || target === null || target === undefined || isNaN(Number(target))) return
    const num = Number(target)
    let start = 0
    const step = num / (duration / 16)
    const interval = setInterval(() => {
      start += step
      if (start >= num) {
        setCount(num)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(interval)
  }, [inView, target])
  return count
}

const StatCard = ({ stat, index, inView }) => {
  const count = useCountUp(stat.value, inView)

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--stat-color': stat.color || '#00F5FF' }}
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        {renderStatIcon(stat.iconType)}
      </div>

      <div className={styles.value}>
        {stat.isText ? (
          <span className={styles.textValue}>{inView ? (stat.textValue || 'FRESHER') : ''}</span>
        ) : (
          <>
            <span className={styles.num}>{count}</span>
            <span className={styles.suffix}>{stat.suffix || ''}</span>
          </>
        )}
      </div>

      <div className={styles.label}>{stat.label}</div>

      {/* Bottom accent line */}
      <motion.div
        className={styles.accentLine}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
      />
    </motion.div>
  )
}

const Stats = () => {
  const { stats } = usePortfolio()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const displayStats = stats && stats.length > 0 ? stats : [
    { id: 1, iconType: 'projects', value: 10, suffix: '+', label: 'Projects Completed', color: '#00B4D8' },
    { id: 2, iconType: 'security', value: 3, suffix: '', label: 'Security Certifications', color: '#7C3AED' },
    { id: 3, iconType: 'bug', value: 1, suffix: '', label: 'Vulnerability Found', color: '#00F5FF' },
    { id: 4, iconType: 'star', value: null, isText: true, textValue: 'FRESHER', label: 'Experience Level', color: '#FFD700' },
  ]

  return (
    <section id="stats" className={styles.stats} ref={ref} aria-label="Statistics">
      <div className={styles.container}>
        <div className={styles.grid}>
          {displayStats.map((stat, i) => (
            <StatCard key={stat.id || i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
