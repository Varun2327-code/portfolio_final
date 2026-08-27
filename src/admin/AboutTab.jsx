import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const AboutTab = () => {
  const { about, setAbout } = usePortfolio()
  const [formData, setFormData] = useState({ ...about })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleTraitChange = (index, field, value) => {
    const newTraits = [...formData.traits]
    newTraits[index][field] = value
    setFormData(prev => ({ ...prev, traits: newTraits }))
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setAbout(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>About Us Section Management</h2>
          <p className={styles.tabDesc}>Edit bio content, credentials, developer traits, and studio visual.</p>
        </div>
        <button onClick={handleSave} className={styles.btnPrimary}>
          💾 Save Changes
        </button>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ About section changes saved and active on live site!
        </div>
      )}

      <form onSubmit={handleSave} className={styles.card}>
        <h3 className={styles.cardTitle}>📝 Bio &amp; Story</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>HEADING LINE 1</label>
            <input
              type="text"
              name="headingLine1"
              value={formData.headingLine1}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>HEADING LINE 2 (GRADIENT)</label>
            <input
              type="text"
              name="headingLine2"
              value={formData.headingLine2}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>ROLE LABEL</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LOCATION</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.label}>ABOUT IMAGE URL / PATH</label>
            <input
              type="text"
              name="aboutImage"
              value={formData.aboutImage}
              onChange={handleChange}
              className={styles.input}
              placeholder="/about-studio.jpg"
            />
          </div>

          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.label}>BIO PARAGRAPH 1 (EDUCATION &amp; SPECIALIZATION)</label>
            <textarea
              name="bio1"
              value={formData.bio1}
              onChange={handleChange}
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.label}>BIO PARAGRAPH 2 (PASSION &amp; SECURITY FOCUS)</label>
            <textarea
              name="bio2"
              value={formData.bio2}
              onChange={handleChange}
              className={styles.textarea}
              rows={3}
            />
          </div>
        </div>

        <h3 className={styles.cardTitle} style={{ marginTop: '1.25rem' }}>✨ 4 Core Trait Cards</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {formData.traits.map((trait, index) => (
            <div key={trait.id || index} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={trait.icon}
                  onChange={(e) => handleTraitChange(index, 'icon', e.target.value)}
                  style={{ width: 45, textAlign: 'center', fontSize: '1.2rem' }}
                  className={styles.input}
                  title="Emoji Icon"
                />
                <input
                  type="text"
                  value={trait.label}
                  onChange={(e) => handleTraitChange(index, 'label', e.target.value)}
                  className={styles.input}
                  placeholder="Trait Name"
                />
              </div>
              <input
                type="text"
                value={trait.desc}
                onChange={(e) => handleTraitChange(index, 'desc', e.target.value)}
                className={styles.input}
                placeholder="Short Description"
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" className={styles.btnPrimary}>
            💾 Save About Us Updates
          </button>
        </div>
      </form>
    </div>
  )
}

export default AboutTab
