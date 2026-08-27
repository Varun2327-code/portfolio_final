import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const DashboardTab = ({ onNavigateTab }) => {
  const { hero, projects, skillCategories, timeline, messages, analytics, stats } = usePortfolio()

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  const unreadMessages = messages.filter(m => !m.read).length
  const wipProjects = projects.filter(p => p.wip).length

  return (
    <div className={styles.tabContainer}>
      {/* Header */}
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Security &amp; Portfolio Dashboard</h2>
          <p className={styles.tabDesc}>Real-time system telemetry, content inventory, and visitor communications.</p>
        </div>
        <span className={`${styles.badge} ${styles.badgeGreen}`}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#39FF14' }} />
          SYSTEM ONLINE &amp; SECURE
        </span>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className={styles.card} style={{ borderLeft: '4px solid #00B4D8' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>RESUME DOWNLOADS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00F5FF', fontFamily: 'Space Grotesk' }}>
            {analytics?.resumeDownloads || 0}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#39FF14' }}>Active recruiter downloads</span>
        </div>

        <div className={styles.card} style={{ borderLeft: '4px solid #7C3AED' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL PROJECTS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#A78BFA', fontFamily: 'Space Grotesk' }}>
            {projects.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{wipProjects} in active development</span>
        </div>

        <div className={styles.card} style={{ borderLeft: '4px solid #39FF14' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>INQUIRIES &amp; MSGS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#39FF14', fontFamily: 'Space Grotesk' }}>
            {messages.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: unreadMessages > 0 ? '#FF6B6B' : '#64748B' }}>
            {unreadMessages} unread message{unreadMessages !== 1 ? 's' : ''}
          </span>
        </div>

        <div className={styles.card} style={{ borderLeft: '4px solid #FFD700' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL SITE VISITS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFD700', fontFamily: 'Space Grotesk' }}>
            {analytics?.pageViews || 1}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Telemetry impressions</span>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>⚡ Quick Operations</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigateTab('analytics')} className={styles.btnPrimary}>
            📈 View Analytics &amp; Top Projects
          </button>
          <button onClick={() => onNavigateTab('stats')} className={styles.btnSecondary}>
            🎯 Edit Career Stats ({stats?.length || 4} Cards)
          </button>
          <button onClick={() => onNavigateTab('resume')} className={styles.btnSecondary}>
            📄 Resume Manager
          </button>
          <button onClick={() => onNavigateTab('projects')} className={styles.btnSecondary}>
            + Manage Projects
          </button>
          <button onClick={() => onNavigateTab('skills')} className={styles.btnSecondary}>
            + Manage Skills
          </button>
          <button onClick={() => onNavigateTab('contact')} className={styles.btnSecondary}>
            View Inbox ({unreadMessages})
          </button>
        </div>
      </div>

      {/* Recent Contact Messages */}
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className={styles.cardTitle}>📬 Recent Inquiries</h3>
          <button onClick={() => onNavigateTab('contact')} className={styles.btnSecondary} style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
            View All →
          </button>
        </div>

        {messages.length === 0 ? (
          <p style={{ color: '#8892A4', fontSize: '0.85rem' }}>No messages received yet.</p>
        ) : (
          <div className={styles.itemList}>
            {messages.slice(0, 3).map(msg => (
              <div key={msg.id} className={styles.itemRow}>
                <div className={styles.itemInfo}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.itemTitle}>{msg.name}</span>
                    <span className={styles.itemSub}>&lt;{msg.email}&gt;</span>
                    {!msg.read && <span className={`${styles.badge} ${styles.badgeGreen}`}>NEW</span>}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '0.2rem' }}>
                    <strong>{msg.subject || 'No Subject'}</strong>: {msg.message.slice(0, 100)}...
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{msg.date}</span>
                </div>
                <div className={styles.itemActions}>
                  <button onClick={() => onNavigateTab('contact')} className={styles.btnSecondary} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardTab
