import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const PRESET_COLORS = ['#00B4D8', '#7C3AED', '#00F5FF', '#39FF14', '#FFD700', '#FF6B6B', '#EC4899', '#F97316']

const SkillsTab = () => {
  const { skillCategories, setSkillCategories } = usePortfolio()
  const [selectedCatId, setSelectedCatId] = useState(skillCategories[0]?.id || 'frontend')
  
  // Modals & Dialogs
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [saved, setSaved] = useState(false)

  // Form states
  const [skillForm, setSkillForm] = useState({ name: '', desc: '', level: 'Expert', categoryId: selectedCatId })
  const [catForm, setCatForm] = useState({ label: '', color: '#00B4D8' })

  const activeCategory = skillCategories.find(c => c.id === selectedCatId) || skillCategories[0]

  const handleOpenAddSkill = () => {
    setEditingSkill(null)
    setSkillForm({ name: '', desc: '', level: 'Expert', categoryId: selectedCatId })
    setIsAddingSkill(true)
  }

  const handleOpenEditSkill = (skill, catId) => {
    setEditingSkill({ ...skill, originalCatId: catId })
    setSkillForm({
      name: skill.name,
      desc: skill.desc || '',
      level: skill.level || 'Expert',
      categoryId: catId,
    })
    setIsAddingSkill(true)
  }

  const handleSaveSkill = (e) => {
    e.preventDefault()
    if (!skillForm.name.trim()) return

    if (editingSkill) {
      // If editing existing skill
      const updatedCategories = skillCategories.map(cat => {
        // If skill moved to another category
        if (cat.id === editingSkill.originalCatId && editingSkill.originalCatId !== skillForm.categoryId) {
          return {
            ...cat,
            skills: cat.skills.filter(s => (s.id || s.name) !== (editingSkill.id || editingSkill.name))
          }
        }
        if (cat.id === skillForm.categoryId) {
          if (editingSkill.originalCatId === skillForm.categoryId) {
            return {
              ...cat,
              skills: cat.skills.map(s => (s.id || s.name) === (editingSkill.id || editingSkill.name)
                ? { ...s, name: skillForm.name.trim(), desc: skillForm.desc.trim(), level: skillForm.level }
                : s
              )
            }
          } else {
            return {
              ...cat,
              skills: [
                ...cat.skills,
                { id: Date.now(), name: skillForm.name.trim(), desc: skillForm.desc.trim() || 'Core competency', level: skillForm.level }
              ]
            }
          }
        }
        return cat
      })
      setSkillCategories(updatedCategories)
    } else {
      // Add new skill
      const updated = skillCategories.map(cat => {
        if (cat.id === skillForm.categoryId) {
          return {
            ...cat,
            skills: [
              ...cat.skills,
              { id: Date.now(), name: skillForm.name.trim(), desc: skillForm.desc.trim() || 'Core competency', level: skillForm.level }
            ]
          }
        }
        return cat
      })
      setSkillCategories(updated)
    }

    setIsAddingSkill(false)
    setEditingSkill(null)
    setSkillForm({ name: '', desc: '', level: 'Expert', categoryId: selectedCatId })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleDeleteSkill = (catId, skillId) => {
    if (window.confirm('Delete this skill?')) {
      const updated = skillCategories.map(cat => {
        if (cat.id === catId) {
          return {
            ...cat,
            skills: cat.skills.filter(s => (s.id || s.name) !== skillId)
          }
        }
        return cat
      })
      setSkillCategories(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (!catForm.label.trim()) return

    const newId = catForm.label.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const newCategory = {
      id: newId,
      label: catForm.label.toUpperCase().trim(),
      color: catForm.color || '#00B4D8',
      skills: []
    }

    setSkillCategories(prev => [...prev, newCategory])
    setSelectedCatId(newId)
    setCatForm({ label: '', color: '#00B4D8' })
    setIsAddingCategory(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleDeleteCategory = (catId) => {
    if (skillCategories.length <= 1) {
      alert('You must have at least one skill category!')
      return
    }
    if (window.confirm('Are you sure you want to delete this entire category and all its skills?')) {
      const remaining = skillCategories.filter(c => c.id !== catId)
      setSkillCategories(remaining)
      setSelectedCatId(remaining[0].id)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Technical Skills Inventory</h2>
          <p className={styles.tabDesc}>Add, edit, reorganize, and manage skills and skill categories with instant live sync.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setIsAddingCategory(true)} className={styles.btnSecondary}>
            + New Category
          </button>
          <button onClick={handleOpenAddSkill} className={styles.btnPrimary}>
            + Add New Skill
          </button>
        </div>
      </div>

      {saved && (
        <div className={styles.savedAlert}>
          ✓ Technical skills inventory updated and applied to live site!
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {skillCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={cat.id === selectedCatId ? styles.btnPrimary : styles.btnSecondary}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              borderColor: cat.id === selectedCatId ? cat.color : undefined,
              background: cat.id === selectedCatId ? cat.color : undefined,
              color: cat.id === selectedCatId ? '#050A14' : undefined,
              fontWeight: 700,
            }}
          >
            {cat.label} ({cat.skills.length})
          </button>
        ))}

        <button
          onClick={() => setIsAddingCategory(true)}
          className={styles.btnSecondary}
          style={{ padding: '0.5rem 0.85rem', fontSize: '0.75rem', borderStyle: 'dashed' }}
        >
          + Add Category
        </button>
      </div>

      {/* Skills in Active Category */}
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h3 className={styles.cardTitle} style={{ color: activeCategory?.color }}>
              ⚡ {activeCategory?.label} Skills ({activeCategory?.skills.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#8892A4' }}>Accent: {activeCategory?.color}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleOpenAddSkill} className={styles.btnPrimary} style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>
              + Add Skill Here
            </button>
            <button onClick={() => handleDeleteCategory(activeCategory.id)} className={styles.btnDanger} style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
              Delete Category
            </button>
          </div>
        </div>

        {activeCategory?.skills.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#8892A4' }}>
            <p>No skills in this category yet.</p>
            <button onClick={handleOpenAddSkill} className={styles.btnPrimary} style={{ marginTop: '0.75rem', fontSize: '0.75rem' }}>
              + Add First Skill
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {activeCategory?.skills.map((skill) => (
              <div
                key={skill.id || skill.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '0.85rem 1.1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid rgba(255, 255, 255, 0.08)`,
                  borderLeft: `3px solid ${activeCategory.color}`,
                  borderRadius: '8px',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#F8FAFC' }}>{skill.name}</span>
                    {skill.level && (
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.45rem',
                        borderRadius: '10px',
                        background: skill.level === 'Expert' ? 'rgba(57,255,20,0.1)' : skill.level === 'Advanced' ? 'rgba(0,245,255,0.1)' : 'rgba(255,215,0,0.1)',
                        color: skill.level === 'Expert' ? '#39FF14' : skill.level === 'Advanced' ? '#00F5FF' : '#FFD700',
                        border: `1px solid ${skill.level === 'Expert' ? 'rgba(57,255,20,0.3)' : skill.level === 'Advanced' ? 'rgba(0,245,255,0.3)' : 'rgba(255,215,0,0.3)'}`,
                      }}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#8892A4' }}>{skill.desc}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    onClick={() => handleOpenEditSkill(skill, activeCategory.id)}
                    className={styles.btnSecondary}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                    title="Edit Skill"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(activeCategory.id, skill.id || skill.name)}
                    className={styles.btnDanger}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                    title="Delete Skill"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Skill Modal */}
      {isAddingSkill && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalWindow}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className={styles.cardTitle}>
                {editingSkill ? `Edit Skill: ${editingSkill.name}` : `+ Add New Skill`}
              </h3>
              <button onClick={() => setIsAddingSkill(false)} className={styles.btnSecondary} style={{ padding: '0.3rem 0.6rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>CATEGORY</label>
                <select
                  value={skillForm.categoryId}
                  onChange={(e) => setSkillForm({ ...skillForm, categoryId: e.target.value })}
                  className={styles.select}
                >
                  {skillCategories.map(cat => (
                    <option key={cat.id} value={cat.id} style={{ background: '#090E1A' }}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>SKILL NAME</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. TypeScript, GraphQL, Next.js, Docker, Kubernetes"
                  className={styles.input}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>SHORT DESCRIPTION / KEY USE CASE</label>
                <input
                  type="text"
                  value={skillForm.desc}
                  onChange={(e) => setSkillForm({ ...skillForm, desc: e.target.value })}
                  placeholder="e.g. Type-safe development & modern tooling"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>PROFICIENCY LEVEL</label>
                <select
                  value={skillForm.level || 'Expert'}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className={styles.select}
                >
                  <option value="Expert" style={{ background: '#090E1A' }}>Expert (Core Mastery)</option>
                  <option value="Advanced" style={{ background: '#090E1A' }}>Advanced (Production Experienced)</option>
                  <option value="Proficient" style={{ background: '#090E1A' }}>Proficient (Working Knowledge)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAddingSkill(false)} className={styles.btnSecondary}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Category Modal */}
      {isAddingCategory && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalWindow}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className={styles.cardTitle}>+ Create New Skill Category</h3>
              <button onClick={() => setIsAddingCategory(false)} className={styles.btnSecondary} style={{ padding: '0.3rem 0.6rem' }}>✕</button>
            </div>

            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>CATEGORY NAME / LABEL</label>
                <input
                  type="text"
                  value={catForm.label}
                  onChange={(e) => setCatForm({ ...catForm, label: e.target.value })}
                  placeholder="e.g. AI &amp; ML, CLOUD ARCHITECTURE, MOBILE"
                  className={styles.input}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>ACCENT COLOR</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCatForm({ ...catForm, color: c })}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: c,
                        border: catForm.color === c ? '3px solid #FFFFFF' : '1px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        transform: catForm.color === c ? 'scale(1.15)' : 'none',
                        transition: 'all 0.2s',
                      }}
                      title={c}
                    />
                  ))}
                  <input
                    type="text"
                    value={catForm.color}
                    onChange={(e) => setCatForm({ ...catForm, color: e.target.value })}
                    placeholder="#00B4D8"
                    className={styles.input}
                    style={{ maxWidth: 110, textAlign: 'center', marginLeft: '0.5rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAddingCategory(false)} className={styles.btnSecondary}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsTab
