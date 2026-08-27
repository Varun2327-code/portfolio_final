import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const AnalyticsTab = () => {
  const { analytics, projects, resume, resetAnalytics } = usePortfolio()
  const [resetSuccess, setResetSuccess] = useState(false)

  const pageViews = analytics.pageViews || 1
  const resumeDownloads = analytics.resumeDownloads || 0
  const projectViewsMap = analytics.projectViews || {}
  const projectClicksMap = analytics.projectClicks || {}
  const downloadLogs = analytics.resumeDownloadLogs || []
  const recentActivity = analytics.recentActivity || []

  // Calculate total project views
  const totalProjectViews = Object.values(projectViewsMap).reduce((a, b) => a + b, 0)
  
  // Calculate total outbound clicks
  const totalClicks = Object.values(projectClicksMap).reduce((acc, curr) => {
    return acc + (curr.github || 0) + (curr.liveDemo || 0)
  }, 0)

  // Calculate conversion rate: (resumeDownloads + totalClicks) / pageViews * 100
  const conversionRate = pageViews > 0 ? (((resumeDownloads + totalClicks) / pageViews) * 100).toFixed(1) : 0

  // Sort projects by view count
  const sortedProjects = [...projects].map(p => ({
    ...p,
    views: projectViewsMap[p.id] || 0,
    clicks: projectClicksMap[p.id] || { github: 0, liveDemo: 0 },
  })).sort((a, b) => b.views - a.views)

  const maxViews = sortedProjects[0]?.views || 1

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all analytics counters to 0?')) {
      resetAnalytics()
      setResetSuccess(true)
      setTimeout(() => setResetSuccess(false), 3000)
    }
  }

  return (
    <div className={styles.tabContainer}>
      {/* Header */}
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Portfolio Telemetry &amp; Analytics</h2>
          <p className={styles.tabDesc}>Real-time visitor engagement, resume downloads, top project interactions, and conversion rates.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleReset} className={styles.btnDanger}>
            ↺ Reset Analytics Counters
          </button>
        </div>
      </div>

      {resetSuccess && (
        <div className={styles.savedAlert}>
          ✓ Analytics counters reset successfully!
        </div>
      )}

      {/* Top 4 Performance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
        <div className={styles.card} style={{ borderLeft: '4px solid #00B4D8' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL SITE VISITS</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00F5FF', fontFamily: 'Space Grotesk' }}>
            {pageViews}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Portfolio impressions</span>
        </div>

        <div className={styles.card} style={{ borderLeft: '4px solid #39FF14' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>RESUME DOWNLOADS</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#39FF14', fontFamily: 'Space Grotesk' }}>
            {resumeDownloads}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {pageViews > 0 ? `${((resumeDownloads / pageViews) * 100).toFixed(1)}% of total visitors` : '0%'}
          </span>
        </div>

        <div className={styles.card} style={{ borderLeft: '4px solid #7C3AED' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>PROJECT MODAL VIEWS</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#A78BFA', fontFamily: 'Space Grotesk' }}>
            {totalProjectViews}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Deep-dive inspections</span>
        </div>

        <div className={styles.card} style={{ borderLeft: '4px solid #FFD700' }}>
          <span style={{ fontSize: '0.75rem', color: '#8892A4', fontWeight: 600, letterSpacing: '0.05em' }}>RECRUITER CONVERSION</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFD700', fontFamily: 'Space Grotesk' }}>
            {conversionRate}%
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Outbound clicks &amp; downloads</span>
        </div>
      </div>

      {/* Top Viewed Projects Analytics */}
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className={styles.cardTitle}>🏆 Top Viewed Projects &amp; Engagement</h3>
          <span style={{ fontSize: '0.75rem', color: '#8892A4' }}>Ranked by total modal views and outbound clicks</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          {sortedProjects.map((proj, index) => {
            const percentOfMax = maxViews > 0 ? (proj.views / maxViews) * 100 : 0
            const totalProjClicks = (proj.clicks.github || 0) + (proj.clicks.liveDemo || 0)

            return (
              <div
                key={proj.id}
                style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: index === 0 ? '#FFD700' : index === 1 ? '#CBD5E1' : index === 2 ? '#B45309' : 'rgba(255,255,255,0.1)',
                        color: index < 3 ? '#050A14' : '#94A3B8',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {index + 1}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC' }}>{proj.title}</span>
                    <span className={styles.badge} style={{ color: proj.accent || '#00F5FF' }}>
                      {proj.category.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.7rem', color: '#8892A4' }}>VIEWS</span>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#00F5FF', fontFamily: 'Space Grotesk' }}>
                        {proj.views}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.7rem', color: '#8892A4' }}>CLICKS</span>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#39FF14', fontFamily: 'Space Grotesk' }}>
                        {totalProjClicks}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.max(percentOfMax, 4)}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${proj.accent || '#00B4D8'}, #00F5FF)`,
                      borderRadius: 3,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                  <span>GitHub: {proj.clicks.github || 0} clicks · Live Demo: {proj.clicks.liveDemo || 0} clicks</span>
                  <span>{percentOfMax.toFixed(0)}% relative interest</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resume Download Tracker & Log */}
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className={styles.cardTitle}>📥 Resume Download Telemetry Log</h3>
          <span className={`${styles.badge} ${styles.badgeGreen}`}>
            Total Downloads: {resumeDownloads}
          </span>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#8892A4' }}>
          Real-time logs of recruiters and visitors downloading your CV (<code style={{ color: '#00F5FF' }}>{resume.fileName}</code>).
        </p>

        {downloadLogs.length === 0 ? (
          <p style={{ color: '#8892A4', fontSize: '0.85rem', padding: '1rem 0' }}>No resume downloads recorded yet.</p>
        ) : (
          <div className={styles.itemList}>
            {downloadLogs.slice(0, 8).map((log) => (
              <div key={log.id} className={styles.itemRow}>
                <div className={styles.itemInfo}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#39FF14' }}>📥 Resume Downloaded</span>
                    <span className={styles.badge}>{log.source}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#8892A4' }}>Origin: {log.location}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'JetBrains Mono' }}>{log.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Real-time Activity Stream */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📡 Recent Visitor Activity Stream</h3>
        <div className={styles.itemList}>
          {recentActivity.map((act) => (
            <div key={act.id} className={styles.itemRow} style={{ padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span>{act.type === 'resume' ? '📥' : act.type === 'project' ? '👁️' : act.type === 'contact' ? '📬' : '⚡'}</span>
                <span style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>{act.text}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsTab
