import React, { useState, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './Skills.module.css'

const Skills = () => {
  const { skillCategories } = usePortfolio()
  const [activeTab, setActiveTab] = useState(skillCategories[0]?.id || 'fullstack')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Total count
  const totalSkillsCount = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0)
  }, [skillCategories])

  // Filtered skills
  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (query) {
      // When user searches, search across all categories
      let pool = []
      skillCategories.forEach((cat) => {
        cat.skills.forEach((s) => {
          pool.push({ ...s, categoryName: cat.label, categoryColor: cat.color })
        })
      })
      return pool.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          (s.desc && s.desc.toLowerCase().includes(query)) ||
          (s.level && s.level.toLowerCase().includes(query)) ||
          (s.categoryName && s.categoryName.toLowerCase().includes(query))
      )
    }

    const cat = skillCategories.find((c) => c.id === activeTab) || skillCategories[0]
    if (!cat) return []

    return (cat.skills || []).map((s) => ({
      ...s,
      categoryName: cat.label,
      categoryColor: cat.color,
    }))
  }, [skillCategories, activeTab, searchQuery])

  return (
    <section id="skills" className={styles.skills} ref={ref} aria-label="Technical Skills & Cybersecurity Capabilities">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

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
            TECHNICAL ARSENAL &amp; CAPABILITIES
          </span>
          <h2 className={styles.heading}>What I Work With</h2>
          <p className={styles.subheading}>
            A curated full-stack development &amp; cybersecurity stack built for scalable architecture, offensive auditing, and zero-day defense.
          </p>
        </motion.div>

        {/* Controls: Search Bar + Tab Filter */}
        <motion.div
          className={styles.controlsWrapper}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Live Search Input */}
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${totalSkillsCount}+ technologies, security tools & frameworks...`}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.clearBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Skill categories">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeTab === cat.id}
                className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
                onClick={() => {
                  setActiveTab(cat.id)
                  if (searchQuery) setSearchQuery('')
                }}
                style={{ '--tab-color': cat.color }}
                data-cursor="hover"
              >
                <span className={styles.tabText}>
                  {cat.label} ({cat.skills?.length || 0})
                </span>
                {activeTab === cat.id && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tabIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${searchQuery}`}
            className={styles.panel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {filteredSkills.length > 0 ? (
              <div className={styles.skillGrid}>
                {filteredSkills.map((skill, i) => (
                  <motion.div
                    key={`${skill.name}-${i}`}
                    className={`${styles.skillCard} ${hoveredSkill === skill.name ? styles.skillCardActive : ''}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.25 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ '--skill-color': skill.categoryColor || '#00B4D8' }}
                  >
                    <div className={styles.skillCardTop}>
                      <div className={styles.skillNameGroup}>
                        <span className={styles.skillDot} />
                        <span className={styles.skillName}>{skill.name}</span>
                      </div>
                      {skill.level && (
                        <span
                          className={`${styles.skillLevelPill} ${
                            skill.level === 'Expert'
                              ? styles.levelExpert
                              : skill.level === 'Advanced'
                              ? styles.levelAdvanced
                              : styles.levelProficient
                          }`}
                        >
                          {skill.level}
                        </span>
                      )}
                    </div>

                    <p className={styles.skillDesc}>{skill.desc}</p>

                    {Boolean(searchQuery) && (
                      <div className={styles.skillMeta}>
                        <span className={styles.skillCategoryTag}>{skill.categoryName}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No technologies matched "<strong>{searchQuery}</strong>"</p>
                <button
                  className={styles.resetSearchBtn}
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search Filter
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills