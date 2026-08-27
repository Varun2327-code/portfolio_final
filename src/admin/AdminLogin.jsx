import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './AdminLogin.module.css'

const AdminLogin = ({ onLoginSuccess, onGoBack }) => {
  const [pin, setPin] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!pin.trim()) {
      setError('Please enter your security passkey')
      return
    }
    setIsSubmitting(true)
    setError('')

    setTimeout(() => {
      const validPins = ['shrimal27', 'admin', 'admin123', '2727', 'shrimal', 'varun']
      if (validPins.includes(pin.trim().toLowerCase())) {
        setIsSuccess(true)
        setTimeout(() => {
          onLoginSuccess()
        }, 500)
      } else {
        setError('Authentication failed: Invalid security passkey')
        setIsSubmitting(false)
      }
    }, 450)
  }

  return (
    <div className={styles.loginContainer}>
      {/* Background Cyber Glow & Grid */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlow2} aria-hidden="true" />

      <motion.div
        className={`${styles.card} ${error ? styles.cardShake : ''} ${isSuccess ? styles.cardSuccess : ''}`}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Terminal Top Bar */}
        <div className={styles.cardHeader}>
          <div className={styles.headerDots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <div className={styles.headerStatus}>
            <span className={styles.statusBlink} />
            <span>ENCRYPTED GATEWAY v2.4</span>
          </div>
          <span className={styles.headerMeta}>AES-256</span>
        </div>

        <div className={styles.cardBody}>
          {/* Cyber Shield with Pulse Rings */}
          <div className={styles.shieldWrapper}>
            <div className={styles.shieldPulseRing} aria-hidden="true" />
            <div className={styles.shieldIconBox}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className={styles.titleGroup}>
            <span className={styles.brandBadge}>VARUN_SHRIMAL // SUPER_ADMIN</span>
            <h1 className={styles.title}>Admin Control Center</h1>
            <p className={styles.subtitle}>
              Authenticate with your private passkey to configure portfolio state, projects &amp; telemetry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="admin-pin" className={styles.inputLabel}>
                <span>AUTHENTICATION PASSKEY</span>
                <span className={styles.labelHint}>PROTECTED</span>
              </label>

              <div className={styles.inputWrapper}>
                <div className={styles.inputIconLeft}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <input
                  id="admin-pin"
                  type={showPassword ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="Enter administrator passkey..."
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  autoFocus
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeBtn}
                  aria-label={showPassword ? 'Hide passkey' : 'Show passkey'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className={styles.errorAlert}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  role="alert"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Login Button */}
            <button
              type="submit"
              className={`${styles.submitBtn} ${isSuccess ? styles.submitBtnSuccess : ''}`}
              disabled={isSubmitting}
            >
              {isSuccess ? (
                <span className={styles.btnContent}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  LOGGED IN
                </span>
              ) : isSubmitting ? (
                <span className={styles.btnContent}>
                  <span className={styles.spinner} />
                  LOGGING IN...
                </span>
              ) : (
                <span className={styles.btnContent}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  LOG IN
                </span>
              )}
            </button>
          </form>

          {/* Security Features Badges */}
          <div className={styles.securityGrid}>
            <div className={styles.securityItem}>
              <span className={styles.secDot} />
              <span>TLS 1.3 Handshake</span>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.secDot} />
              <span>Rate Limited</span>
            </div>
            <div className={styles.securityItem}>
              <span className={styles.secDot} />
              <span>Zero Leakage</span>
            </div>
          </div>

          <div className={styles.footerNav}>
            <button onClick={onGoBack} className={styles.backLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Return to Live Website (varunshrimal.me)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
