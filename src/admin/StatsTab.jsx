import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const ICONS = [
  { id: 'projects', label: '💻 Laptop / Projects' },
  { id: 'security', label: '🛡️ Shield / Security' },
  { id: 'bug', label: '🔍 Search / Vulnerability' },
  { id: 'star', label: '⭐ Star / Experience' },
  { id: 'code', label: '⚡ Code / Tech' },
  { id: 'zap', label: '⚡ Lightning / Speed' },
]

const COLORS = [
  { name: 'Cyan Blue', hex: '#00B4D8' },
  { name: 'Neon Violet', hex: '#7C3AED' },
  { name: 'Bright Cyan', hex: '#00F5FF' },
  { name: 'Gold / Amber', hex: '#FFD700' },
  { name: 'Matrix Green', hex: '#39FF14' },
  { name: 'Crimson Red', hex: '#FF3366' },
]

const StatsTab = () => {
  const { stats, setStats } = usePortfolio()
  const [statsList, setStatsList] = useState(
    stats && stats.length > 0
      ? stats.map(s => ({ ...s }))
      : [
          { id: 1, iconType: 'projects', value: 10, suffix: '+', label: 'Projects Completed', color: '#00B4D8', isText: false, textValue: '' },
          { id: 2, iconType: 'security', value: 3, suffix: '', label: 'Security Certifications', color: '#7C3AED', isText: false, textValue: '' },
          { id: 3, iconType: 'bug', value: 1, suffix: '', label: 'Vulnerability Found', color: '#00F5FF', isText: false, textValue: '' },
          { id: 4, iconType: 'star', value: null, suffix: '', label: 'Experience Level', color: '#FFD700', isText: true, textValue: 'FRESHER' },
        ]
  )
  const [saved, setSaved] = useState(false)

  const handleStatChange = (index, field, value) => {
    const updated = [...statsList]
    updated[index][field] = value
    setStatsList(updated)
    setSaved(false)
  }

  const handleSave = (e) => {
    if (e) e.preventDefault()
    setStats(statsList)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Career Stats &amp; Counter Metrics</h2>
          <p className={styles.tabDesc}>
            Manage the 4 prominent stat cards displayed on your portfolio (*Projects Completed*, *Security Certifications*, *Vulnerabilities*, *Experience Level*).
          </p>
        </div>
        <button onClick={handleSave} className={styles.btnPrimary}>
          💾 Save Stats Changes
        </button>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ Career stats updated and active on the live website!
        </div>
      )}

      {/* Live Preview Strip */}
      <div className={styles.card} style={{ background: 'rgba(5, 10, 20, 0.7)', border: '1px solid rgba(0, 245, 255, 0.2)' }}>
        <h3 className={styles.cardTitle} style={{ color: '#00F5FF' }}>👁️ Live Portfolio Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
          {statsList.map((stat, i) => (
            <div
              key={stat.id || i}
              style={{
                padding: '1.25rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: `3px solid ${stat.color || '#00F5FF'}`,
                borderRadius: 10,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>
                {stat.iconType === 'projects' ? '💻' : stat.iconType === 'security' ? '🛡️' : stat.iconType === 'bug' ? '🔍' : stat.iconType === 'star' ? '⭐' : stat.iconType === 'code' ? '⚡' : '🔥'}
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color || '#00F5FF', fontFamily: 'Space Grotesk' }}>
                {stat.isText ? stat.textValue || 'FRESHER' : `${stat.value || 0}${stat.suffix || ''}`}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#8892A4' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Stat Editors */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {statsList.map((stat, index) => (
          <div key={stat.id || index} className={styles.card} style={{ borderLeft: `4px solid ${stat.color || '#00F5FF'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                Card #{index + 1}: <span style={{ color: stat.color || '#00F5FF' }}>{stat.label || `Metric ${index + 1}`}</span>
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#8892A4', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={stat.isText}
                    onChange={(e) => handleStatChange(index, 'isText', e.target.checked)}
                  />
                  Text Mode (e.g. "FRESHER")
                </label>
              </div>
            </div>

            <div className={styles.formGrid}>
              {/* Value Input */}
              {stat.isText ? (
                <div className={styles.formGroup}>
                  <label className={styles.label}>TEXT VALUE (DISPLAYED IN LARGE FONT)</label>
                  <input
                    type="text"
                    value={stat.textValue || ''}
                    onChange={(e) => handleStatChange(index, 'textValue', e.target.value)}
                    className={styles.input}
                    placeholder="e.g. FRESHER, 2+ YRS, MID-LEVEL"
                  />
                </div>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>NUMERIC COUNT (ANIMATED COUNTER)</label>
                    <input
                      type="number"
                      value={stat.value === null || stat.value === undefined ? '' : stat.value}
                      onChange={(e) => handleStatChange(index, 'value', Number(e.target.value))}
                      className={styles.input}
                      placeholder="e.g. 10"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>SUFFIX (+, %, k)</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => handleStatChange(index, 'suffix', e.target.value)}
                      className={styles.input}
                      placeholder="e.g. +"
                    />
                  </div>
                </>
              )}

              {/* Label */}
              <div className={styles.formGroup}>
                <label className={styles.label}>METRIC LABEL / TITLE</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Projects Completed"
                />
              </div>

              {/* Icon Type */}
              <div className={styles.formGroup}>
                <label className={styles.label}>ICON SYMBOL</label>
                <select
                  value={stat.iconType || 'projects'}
                  onChange={(e) => handleStatChange(index, 'iconType', e.target.value)}
                  className={styles.select}
                >
                  {ICONS.map((ico) => (
                    <option key={ico.id} value={ico.id}>
                      {ico.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selector */}
              <div className={`${styles.formGroup} ${styles.formFull}`}>
                <label className={styles.label}>ACCENT COLOR</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {COLORS.map((col) => (
                    <button
                      type="button"
                      key={col.hex}
                      onClick={() => handleStatChange(index, 'color', col.hex)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 20,
                        background: stat.color === col.hex ? 'rgba(255,255,255,0.1)' : 'transparent',
                        border: `1.5px solid ${col.hex}`,
                        color: '#F8FAFC',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: col.hex }} />
                      {col.name}
                    </button>
                  ))}
                  <input
                    type="color"
                    value={stat.color || '#00F5FF'}
                    onChange={(e) => handleStatChange(index, 'color', e.target.value)}
                    style={{ width: 36, height: 32, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                    title="Custom Color"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button onClick={handleSave} className={styles.btnPrimary}>
          💾 Save All Career Stats
        </button>
      </div>
    </div>
  )
}

export default StatsTab
