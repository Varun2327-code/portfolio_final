import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const CATEGORIES = ['web', 'cybersecurity', 'mobile', 'dashboard', 'ai']

const ProjectsTab = () => {
  const { projects, setProjects } = usePortfolio()
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [filterCat, setFilterCat] = useState('all')
  const [saved, setSaved] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github: '',
    liveDemo: '',
    techStack: '',
    category: 'web',
    accent: '#00B4D8',
    wip: false,
    progress: 100,
  })

  const filtered = projects.filter(p => filterCat === 'all' || p.category === filterCat)

  const handleOpenAdd = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      description: '',
      image: '/varun2.png',
      github: '',
      liveDemo: '',
      techStack: 'React, Node.js, Express, MongoDB',
      category: 'web',
      accent: '#00B4D8',
      wip: false,
      progress: 100,
    })
    setIsEditing(true)
  }

  const handleOpenEdit = (project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack,
    })
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id))
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const parsedTech = formData.techStack
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const projectPayload = {
      ...formData,
      techStack: parsedTech.length > 0 ? parsedTech : ['React', 'JavaScript'],
      progress: Number(formData.progress) || 100,
    }

    if (editingProject) {
      setProjects(prev =>
        prev.map(p => p.id === editingProject.id ? { ...projectPayload, id: p.id } : p)
      )
    } else {
      setProjects(prev => [
        { ...projectPayload, id: Date.now() },
        ...prev
      ])
    }

    setIsEditing(false)
    setEditingProject(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Featured Projects Management</h2>
          <p className={styles.tabDesc}>Create, update, reorder, and link source code repositories and live deployments.</p>
        </div>
        <button onClick={handleOpenAdd} className={styles.btnPrimary}>
          + Add New Project
        </button>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ Projects updated and synchronized with live portfolio!
        </div>
      )}

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['all', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={cat === filterCat ? styles.btnPrimary : styles.btnSecondary}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
          >
            {cat} {cat === 'all' ? `(${projects.length})` : `(${projects.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(project => (
          <div
            key={project.id}
            className={styles.card}
            style={{
              borderLeft: `4px solid ${project.accent || '#00B4D8'}`,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={styles.badge} style={{ color: project.accent || '#00F5FF' }}>
                  {project.category.toUpperCase()}
                </span>
                {project.wip && <span className={`${styles.badge} ${styles.badgeRed}`}>In Dev ({project.progress}%)</span>}
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '0.4rem' }}>
                {project.title}
              </h4>

              <p style={{ fontSize: '0.8rem', color: '#8892A4', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                {project.description.slice(0, 110)}...
              </p>

              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {(Array.isArray(project.techStack) ? project.techStack : []).map((t, i) => (
                  <span key={i} style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 3, color: '#CBD5E1' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#00F5FF' }}>
                    Code ↗
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#39FF14' }}>
                    Live ↗
                  </a>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => handleOpenEdit(project)} className={styles.btnSecondary} style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className={styles.btnDanger} style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalWindow}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className={styles.cardTitle}>
                {editingProject ? `Edit: ${editingProject.title}` : '+ Add New Project'}
              </h3>
              <button onClick={() => setIsEditing(false)} className={styles.btnSecondary} style={{ padding: '0.3rem 0.6rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formFull}`}>
                <label className={styles.label}>PROJECT TITLE</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Multi-Vendor Food Delivery Platform"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>CATEGORY</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={styles.select}
                >
                  <option value="web" style={{ background: '#090E1A' }}>Web Application</option>
                  <option value="cybersecurity" style={{ background: '#090E1A' }}>Cybersecurity / VAPT</option>
                  <option value="mobile" style={{ background: '#090E1A' }}>Mobile Application</option>
                  <option value="dashboard" style={{ background: '#090E1A' }}>Dashboard / Analytics</option>
                  <option value="ai" style={{ background: '#090E1A' }}>AI / Machine Learning</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>ACCENT COLOR</label>
                <input
                  type="text"
                  value={formData.accent}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                  placeholder="e.g. #00B4D8, #7C3AED, #39FF14"
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.formFull}`}>
                <label className={styles.label}>IMAGE URL / PATH</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="e.g. /hero-cinematic.jpg or asset link"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>GITHUB REPOSITORY URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>LIVE DEMO URL (OPTIONAL)</label>
                <input
                  type="url"
                  value={formData.liveDemo}
                  onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                  placeholder="https://...vercel.app"
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.formFull}`}>
                <label className={styles.label}>TECH STACK (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="e.g. React, Node.js, Express, MongoDB, Stripe, Firebase"
                  className={styles.input}
                  required
                />
              </div>

              <div className={`${styles.formGroup} ${styles.formFull}`}>
                <label className={styles.label}>PROJECT DESCRIPTION</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of features, architecture, and role..."
                  className={styles.textarea}
                  rows={4}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.wip}
                    onChange={(e) => setFormData({ ...formData, wip: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#FF6B6B' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FF6B6B' }}>
                    🚧 In Active Development (WIP)
                  </span>
                </label>
              </div>

              {formData.wip && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>PROGRESS PERCENTAGE ({formData.progress}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="99"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                    style={{ accentColor: '#00F5FF' }}
                  />
                </div>
              )}

              <div className={styles.formFull} style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsEditing(false)} className={styles.btnSecondary}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsTab
