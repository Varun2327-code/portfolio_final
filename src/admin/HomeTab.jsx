import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const HomeTab = () => {
  const { hero, setHero } = usePortfolio()
  const [formData, setFormData] = useState({ ...hero })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setHero(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Hero / Home Section Management</h2>
          <p className={styles.tabDesc}>Customize headlines, developer badges, bio subtitle, and availability status.</p>
        </div>
        <button onClick={handleSave} className={styles.btnPrimary}>
          💾 Save Changes
        </button>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ Hero section changes saved and applied to live site!
        </div>
      )}

      <form onSubmit={handleSave} className={styles.card}>
        <h3 className={styles.cardTitle}>👤 Identity &amp; Badges</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>TAG 1 (ROLE)</label>
            <input
              type="text"
              name="label1"
              value={formData.label1}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. FULL STACK DEVELOPER"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>TAG 2 (SPECIALIZATION)</label>
            <input
              type="text"
              name="label2"
              value={formData.label2}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. CYBERSECURITY ENTHUSIAST"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>INTRO GREETING</label>
            <input
              type="text"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              className={styles.input}
              placeholder="Hi, I'm"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>FIRST NAME</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              placeholder="VARUN"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LAST NAME (GRADIENT TEXT)</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              placeholder="SHRIMAL"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>HERO IMAGE URL / PATH</label>
            <input
              type="text"
              name="heroImage"
              value={formData.heroImage}
              onChange={handleChange}
              className={styles.input}
              placeholder="/hero-cinematic.jpg"
            />
          </div>

          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.label}>SUBTITLE / ELEVATOR PITCH</label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className={styles.textarea}
              rows={3}
            />
          </div>
        </div>

        <h3 className={styles.cardTitle} style={{ marginTop: '1rem' }}>🔗 Social Links &amp; Status</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>GITHUB URL</label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LINKEDIN URL</label>
            <input
              type="text"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CONTACT EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup} style={{ justifyContent: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', marginTop: '1rem' }}>
              <input
                type="checkbox"
                name="availableForWork"
                checked={formData.availableForWork}
                onChange={handleChange}
                style={{ width: 18, height: 18, accentColor: '#39FF14' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#39FF14' }}>
                🟢 Status: Available for Opportunities (Green Dot)
              </span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" className={styles.btnPrimary}>
            💾 Save Hero Updates
          </button>
        </div>
      </form>
    </div>
  )
}

export default HomeTab
