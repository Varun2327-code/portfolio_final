import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardTab from './DashboardTab'
import AnalyticsTab from './AnalyticsTab'
import StatsTab from './StatsTab'
import HomeTab from './HomeTab'
import AboutTab from './AboutTab'
import SkillsTab from './SkillsTab'
import TimelineTab from './TimelineTab'
import ProjectsTab from './ProjectsTab'
import ResumeTab from './ResumeTab'
import ContactTab from './ContactTab'
import SettingsTab from './SettingsTab'
import styles from './AdminPanel.module.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'analytics', label: 'Analytics & Downloads', icon: '📈' },
  { id: 'stats', label: 'Stats & Metrics', icon: '🎯' },
  { id: 'projects', label: 'Featured Projects', icon: '💻' },
  { id: 'resume', label: 'Resume & CV', icon: '📄' },
  { id: 'skills', label: 'Technical Skills', icon: '⚡' },
  { id: 'home', label: 'Home / Hero', icon: '🏠' },
  { id: 'about', label: 'About Us', icon: '👤' },
  { id: 'experience', label: 'Experience & Journey', icon: '🎓' },
  { id: 'contact', label: 'Contact Inbox', icon: '📬' },
  { id: 'settings', label: 'System & Security', icon: '🔒' },
]

const AdminPanel = ({ onGoToLiveSite, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
      case 'analytics':
        return <AnalyticsTab />
      case 'stats':
        return <StatsTab />
      case 'projects':
        return <ProjectsTab />
      case 'resume':
        return <ResumeTab />
      case 'skills':
        return <SkillsTab />
      case 'home':
        return <HomeTab />
      case 'about':
        return <AboutTab />
      case 'experience':
        return <TimelineTab />
      case 'contact':
        return <ContactTab />
      case 'settings':
        return <SettingsTab />
      default:
        return <DashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
    }
  }

  return (
    <div className={styles.adminWrapper}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
          <div className={styles.brand}>
            <span className={styles.brandV}>V</span>
            <span className={styles.brandText}>PORTFOLIO ADMIN</span>
            <span className={styles.routePill}>/shrimal</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button onClick={onGoToLiveSite} className={styles.viewSiteBtn}>
            🌐 View Live Website
          </button>

          <div className={styles.adminUserBadge}>
            <div className={styles.userAvatar}>V</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Varun Shrimal</span>
              <span className={styles.userRole}>SUPER_ADMIN</span>
            </div>
          </div>

          <button onClick={onLogout} className={styles.logoutBtn} title="Log Out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarSectionTitle}>NAVIGATION</span>
            <nav className={styles.navMenu}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {activeTab === item.id && <span className={styles.activeIndicator} />}
                </button>
              ))}
            </nav>
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.systemStatus}>
              <span className={styles.statusDot} />
              <span>Admin Core v2.4 (Active)</span>
            </div>
            <button onClick={onGoToLiveSite} className={styles.sidebarLink}>
              ← Back to Portfolio
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className={styles.contentArea}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.tabContentInner}
          >
            {renderActiveTab()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
