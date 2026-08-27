import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './SecurityTerminal.module.css'

const TERMINAL_LINES = [
  { text: '> initializing security scan...', delay: 0 },
  { text: '> checking dependencies...', delay: 400 },
  { text: '> scanning vulnerabilities...', delay: 900 },
  { text: '> analyzing code quality...', delay: 1400 },
  { text: '> verifying authentication...', delay: 1900 },
  { text: '> checking API security...', delay: 2400 },
  { text: '> running OWASP checks...', delay: 2900 },
  { text: '', delay: 3400 },
  { text: '> SYSTEM STATUS: SECURE ✓', delay: 3600, highlight: true },
]

const SECURITY_CAPABILITIES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Secure Coding',
    desc: 'Writing code with security-first mindset, following OWASP guidelines and industry best practices.',
    color: '#00B4D8',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Vulnerability Testing',
    desc: 'Systematic identification and assessment of security weaknesses in web applications and systems.',
    color: '#7C3AED',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Penetration Testing',
    desc: 'Controlled ethical hacking using tools like Burp Suite, Nmap, and Metasploit.',
    color: '#00F5FF',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Authentication & AuthZ',
    desc: 'Implementing JWT, OAuth 2.0, and RBAC for robust access control systems.',
    color: '#39FF14',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: 'API Security',
    desc: 'Securing REST APIs with proper validation, rate limiting, and injection prevention.',
    color: '#FFD700',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    title: 'OWASP Standards',
    desc: 'Applying OWASP Top 10 principles to identify and remediate critical web application risks.',
    color: '#FF6B6B',
  },
]

const SecurityTerminal = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [visibleLines, setVisibleLines] = useState([])
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || started) return
    setStarted(true)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisibleLines(TERMINAL_LINES)
      return
    }

    TERMINAL_LINES.forEach((line) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, line.delay)
    })
  }, [inView])

  return (
    <section id="security" className={styles.security} ref={ref} aria-label="Cybersecurity Focus">
      {/* BG decoration */}
      <div className={styles.bgCode} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.bgCodeLine} style={{ animationDelay: `${i * 0.4}s` }}>
            {`0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`}
          </div>
        ))}
      </div>

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
            CYBERSECURITY FOCUS
          </span>
          <h2 className={styles.heading}>Building secure applications,<br />not just functional ones.</h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Terminal */}
          <motion.div
            className={styles.terminalWrapper}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Window chrome */}
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={`${styles.dot} ${styles.dotRed}`} aria-hidden="true" />
                <span className={`${styles.dot} ${styles.dotYellow}`} aria-hidden="true" />
                <span className={`${styles.dot} ${styles.dotGreen}`} aria-hidden="true" />
              </div>
              <div className={styles.terminalTitle}>
                <span className={styles.terminalUser}>cyber@varun</span>
                <span className={styles.terminalSep}>:</span>
                <span className={styles.terminalPath}>~</span>
              </div>
            </div>

            {/* Output */}
            <div className={styles.terminalBody} role="log" aria-live="polite" aria-label="Security terminal output">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={`${styles.terminalLine} ${line.highlight ? styles.terminalHighlight : ''}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {line.text}
                  {i === visibleLines.length - 1 && !line.highlight && (
                    <span className={styles.cursor} aria-hidden="true">█</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Capabilities */}
          <motion.div
            className={styles.capabilities}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {SECURITY_CAPABILITIES.map((cap, i) => (
              <motion.div
                key={i}
                className={styles.capability}
                style={{ '--cap-color': cap.color }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                role="article"
              >
                <div className={styles.capIcon}>{cap.icon}</div>
                <div className={styles.capContent}>
                  <h3 className={styles.capTitle}>{cap.title}</h3>
                  <p className={styles.capDesc}>{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SecurityTerminal
