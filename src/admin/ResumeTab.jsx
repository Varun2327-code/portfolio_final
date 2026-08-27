import React, { useState, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const ResumeTab = () => {
  const { resume, setResume, downloadResume } = usePortfolio()
  const [formData, setFormData] = useState({ ...resume })
  const [saved, setSaved] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    const fileSizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    const fileNameClean = file.name

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target.result
      const updated = {
        ...formData,
        url: dataUrl,
        fileName: fileNameClean,
        fileSize: fileSizeFormatted,
        uploadDate: new Date().toISOString().split('T')[0],
      }
      setFormData(updated)
      setResume(updated)
      setIsUploading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setResume(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleResetDefault = () => {
    if (window.confirm('Reset resume to default (/varun_Shrimal-Resume.pdf)?')) {
      const defaultRes = {
        url: '/varun_Shrimal-Resume.pdf',
        fileName: 'Varun_Shrimal_Resume.pdf',
        title: 'Varun Shrimal — Resume (Full Stack & Cybersecurity)',
        fileSize: '1.2 MB',
        uploadDate: '2026-08-26',
      }
      setFormData(defaultRes)
      setResume(defaultRes)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className={styles.tabContainer}>
      {/* Header */}
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Resume &amp; CV Document Manager</h2>
          <p className={styles.tabDesc}>Upload a new PDF resume, configure download settings, or link an external document.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={downloadResume} className={styles.btnSecondary}>
            ⬇ Test Download
          </button>
          <button onClick={handleSave} className={styles.btnPrimary}>
            💾 Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ Resume configuration updated successfully! All "Download Resume" buttons on the live site will now serve this file.
        </div>
      )}

      {/* Active Resume Card */}
      <div className={styles.card} style={{ borderLeft: '4px solid #00F5FF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className={styles.cardTitle}>📄 Active Resume Status</h3>
          <span className={`${styles.badge} ${styles.badgeGreen}`}>ACTIVE ON LIVE SITE</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6 }}>
            <span style={{ fontSize: '0.7rem', color: '#8892A4', fontFamily: 'JetBrains Mono' }}>FILE NAME</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC', marginTop: '0.2rem', wordBreak: 'break-all' }}>
              {formData.fileName || 'Varun_Shrimal_Resume.pdf'}
            </div>
          </div>

          <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6 }}>
            <span style={{ fontSize: '0.7rem', color: '#8892A4', fontFamily: 'JetBrains Mono' }}>FILE SIZE</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#00F5FF', marginTop: '0.2rem' }}>
              {formData.fileSize || '1.2 MB'}
            </div>
          </div>

          <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6 }}>
            <span style={{ fontSize: '0.7rem', color: '#8892A4', fontFamily: 'JetBrains Mono' }}>LAST UPDATED</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#39FF14', marginTop: '0.2rem' }}>
              {formData.uploadDate || '2026-08-26'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {formData.url && (
            <a
              href={formData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
            >
              👁️ Preview Document in New Tab ↗
            </a>
          )}
          <button
            onClick={downloadResume}
            className={styles.btnSecondary}
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
          >
            📥 Test Download from Site
          </button>
        </div>
      </div>

      {/* Upload New Resume */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>⬆️ Upload New Resume File (PDF)</h3>
        <p style={{ fontSize: '0.85rem', color: '#8892A4' }}>
          Select a local PDF file from your device. It will be immediately loaded and linked across the Hero, About, and Navigation sections.
        </p>

        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed rgba(0, 180, 216, 0.4)',
            borderRadius: 10,
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'rgba(0, 180, 216, 0.03)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00F5FF')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 180, 216, 0.4)')}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
          />
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📄</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>
            {isUploading ? 'Uploading & Processing Document...' : 'Click to Browse or Drag & Drop PDF Resume'}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
            Supports PDF, DOC, DOCX files (Up to 10MB)
          </div>
        </div>
      </div>

      {/* Manual URL / Configuration Form */}
      <form onSubmit={handleSave} className={styles.card}>
        <h3 className={styles.cardTitle}>⚙️ Resume Details &amp; Custom Link</h3>
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.label}>RESUME TITLE / DESCRIPTION</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Varun Shrimal — Full Stack & Cybersecurity Resume"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>DOWNLOAD FILENAME</label>
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleChange}
              placeholder="Varun_Shrimal_Resume.pdf"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>DIRECT URL / PATH (LOCAL OR GOOGLE DRIVE)</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="/varun_Shrimal-Resume.pdf or https://drive.google.com/..."
              className={styles.input}
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button type="button" onClick={handleResetDefault} className={styles.btnDanger}>
            ↺ Reset to Default Template Resume
          </button>
          <button type="submit" className={styles.btnPrimary}>
            💾 Save Resume Settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResumeTab
