import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const SettingsTab = () => {
  const { hero, about, skillCategories, timeline, projects, messages, resetAllData } = usePortfolio()
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleExportBackup = () => {
    const backupData = {
      hero,
      about,
      skillCategories,
      timeline,
      projects,
      messages,
      exportedAt: new Date().toISOString(),
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `portfolio_backup_${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()

    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('⚠️ WARNING: This will reset all your customizations (projects, bio, timeline, skills) to initial original portfolio data. Proceed?')) {
      resetAllData()
      alert('Portfolio reset to initial default state!')
      window.location.reload()
    }
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>System &amp; Security Settings</h2>
          <p className={styles.tabDesc}>Data persistence, backups, passkey authentication, and site maintenance.</p>
        </div>
      </div>

      {downloadSuccess && (
        <div className={styles.savedAlert}>
          ✓ Full portfolio JSON backup downloaded successfully!
        </div>
      )}

      {/* Security Credentials */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>🔒 Security &amp; Access Controls</h3>
        <p style={{ fontSize: '0.85rem', color: '#8892A4', lineHeight: 1.5 }}>
          Admin Panel is protected with a secure passkey gate at <code style={{ color: '#00F5FF', background: 'rgba(0,245,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>/shrimal</code>.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.5rem' }}>
          <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}>
            <span style={{ fontSize: '0.75rem', color: '#8892A4' }}>ACTIVE PASSKEY</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#39FF14', fontFamily: 'JetBrains Mono' }}>
              shrimal27
            </div>
          </div>

          <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}>
            <span style={{ fontSize: '0.75rem', color: '#8892A4' }}>SESSION STATUS</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00F5FF', fontFamily: 'JetBrains Mono' }}>
              AUTHENTICATED
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Export */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📦 Data Backup &amp; Portability</h3>
        <p style={{ fontSize: '0.85rem', color: '#8892A4' }}>
          Export all portfolio projects, skills, journey timelines, and contact messages to a single portable JSON file.
        </p>
        <div>
          <button onClick={handleExportBackup} className={styles.btnPrimary}>
            ⬇ Export Full Portfolio JSON Backup
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={styles.card} style={{ borderColor: 'rgba(255, 107, 107, 0.4)', background: 'rgba(255, 107, 107, 0.02)' }}>
        <h3 className={styles.cardTitle} style={{ color: '#FF6B6B' }}>⚠️ Danger Zone</h3>
        <p style={{ fontSize: '0.85rem', color: '#8892A4' }}>
          Reset all stored edits in localStorage and revert to the default template data.
        </p>
        <div>
          <button onClick={handleReset} className={styles.btnDanger}>
            Reset Everything to Default Template
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsTab
