import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const TimelineTab = () => {
  const { timeline, setTimeline } = usePortfolio()
  const [isAdding, setIsAdding] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    organization: '',
    description: '',
    type: 'education',
    current: false,
  })
  const [saved, setSaved] = useState(false)

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData({
      date: '2022 – 2026',
      title: '',
      organization: '',
      description: '',
      type: 'education',
      current: false,
    })
    setIsAdding(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({ ...item })
    setIsAdding(true)
  }

  const handleDelete = (id) => {
    setTimeline(prev => prev.filter(item => item.id !== id))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    if (editingItem) {
      setTimeline(prev =>
        prev.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item)
      )
    } else {
      setTimeline(prev => [
        { ...formData, id: Date.now() },
        ...prev
      ])
    }

    setIsAdding(false)
    setEditingItem(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Experience &amp; Education Journey</h2>
          <p className={styles.tabDesc}>Manage your academic background, degrees, certifications, and work history.</p>
        </div>
        <button onClick={handleOpenAdd} className={styles.btnPrimary}>
          + Add New Milestone
        </button>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ Journey timeline updated and saved!
        </div>
      )}

      {/* List of Milestones */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📜 Timeline Milestones ({timeline.length})</h3>

        <div className={styles.itemList}>
          {timeline.map((item) => (
            <div key={item.id} className={styles.itemRow} style={{ borderLeft: item.current ? '3px solid #39FF14' : '3px solid #00B4D8' }}>
              <div className={styles.itemInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.badge}>{item.date}</span>
                  {item.current && <span className={`${styles.badge} ${styles.badgeGreen}`}>Current</span>}
                  <span className={styles.badge} style={{ textTransform: 'capitalize' }}>{item.type}</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#A78BFA' }}>{item.organization}</span>
                <p style={{ fontSize: '0.8rem', color: '#8892A4', lineHeight: 1.5, marginTop: '0.2rem' }}>
                  {item.description}
                </p>
              </div>

              <div className={styles.itemActions}>
                <button onClick={() => handleOpenEdit(item)} className={styles.btnSecondary} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className={styles.btnDanger}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAdding && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalWindow}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className={styles.cardTitle}>
                {editingItem ? 'Edit Milestone' : '+ Add Timeline Milestone'}
              </h3>
              <button onClick={() => setIsAdding(false)} className={styles.btnSecondary} style={{ padding: '0.3rem 0.6rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>YEARS / DURATION</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. 2022 – 2026"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>TYPE</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className={styles.select}
                  >
                    <option value="education" style={{ background: '#090E1A' }}>Education</option>
                    <option value="experience" style={{ background: '#090E1A' }}>Experience / Job</option>
                    <option value="certification" style={{ background: '#090E1A' }}>Certification</option>
                  </select>
                </div>

                <div className={`${styles.formGroup} ${styles.formFull}`}>
                  <label className={styles.label}>DEGREE / ROLE TITLE</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Integrated MCA – Cyber Security & Forensics"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.formFull}`}>
                  <label className={styles.label}>INSTITUTION / COMPANY</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Parul University, Vadodara"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.formFull}`}>
                  <label className={styles.label}>DESCRIPTION / KEY ACHIEVEMENTS</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide details on subjects, specializations, or impact..."
                    className={styles.textarea}
                    rows={3}
                  />
                </div>

                <div className={styles.formFull}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.current}
                      onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                      style={{ width: 18, height: 18, accentColor: '#39FF14' }}
                    />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#39FF14' }}>
                      Mark as Current / Ongoing Milestone
                    </span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAdding(false)} className={styles.btnSecondary}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  {editingItem ? 'Update Milestone' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimelineTab
