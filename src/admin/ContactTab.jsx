import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './AdminTabs.module.css'

const ContactTab = () => {
  const { messages, deleteMessage, toggleMessageRead, setMessages } = usePortfolio()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRead, setFilterRead] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const filtered = messages.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.subject && m.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterRead === 'unread') return matchesSearch && !m.read
    if (filterRead === 'read') return matchesSearch && m.read
    return matchesSearch
  })

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([])
    }
  }

  const handleOpenDetail = (msg) => {
    setSelectedMessage(msg)
    if (!msg.read) {
      toggleMessageRead(msg.id)
    }
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabHeader}>
        <div>
          <h2 className={styles.tabTitle}>Contact Inbox &amp; Inquiries</h2>
          <p className={styles.tabDesc}>View, filter, manage, and respond to incoming inquiries from your portfolio.</p>
        </div>
        {messages.length > 0 && (
          <button onClick={handleClearAll} className={styles.btnDanger}>
            Clear All Inbox
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className={styles.card} style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search inquiries by name, email, or message..."
            className={styles.input}
            style={{ maxWidth: '400px' }}
          />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFilterRead('all')}
              className={filterRead === 'all' ? styles.btnPrimary : styles.btnSecondary}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilterRead('unread')}
              className={filterRead === 'unread' ? styles.btnPrimary : styles.btnSecondary}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
            >
              Unread ({messages.filter(m => !m.read).length})
            </button>
            <button
              onClick={() => setFilterRead('read')}
              className={filterRead === 'read' ? styles.btnPrimary : styles.btnSecondary}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
            >
              Read ({messages.filter(m => m.read).length})
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📬 Messages ({filtered.length})</h3>

        {filtered.length === 0 ? (
          <p style={{ color: '#8892A4', fontSize: '0.85rem', padding: '1rem 0' }}>
            {searchTerm ? 'No messages matching your search.' : 'Your inbox is empty.'}
          </p>
        ) : (
          <div className={styles.itemList}>
            {filtered.map(msg => (
              <div
                key={msg.id}
                className={styles.itemRow}
                style={{
                  borderLeft: !msg.read ? '4px solid #39FF14' : '4px solid rgba(255,255,255,0.1)',
                  background: !msg.read ? 'rgba(57, 255, 20, 0.03)' : undefined,
                }}
              >
                <div className={styles.itemInfo} style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span className={styles.itemTitle}>{msg.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#00F5FF' }}>&lt;{msg.email}&gt;</span>
                    {!msg.read ? (
                      <span className={`${styles.badge} ${styles.badgeGreen}`}>UNREAD</span>
                    ) : (
                      <span className={styles.badge} style={{ color: '#8892A4', borderColor: 'rgba(255,255,255,0.1)' }}>READ</span>
                    )}
                    <span style={{ fontSize: '0.7rem', color: '#64748B', marginLeft: 'auto' }}>{msg.date}</span>
                  </div>

                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E2E8F0', marginTop: '0.25rem' }}>
                    {msg.subject ? `Subject: ${msg.subject}` : 'No Subject'}
                  </span>

                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, marginTop: '0.2rem' }}>
                    {msg.message}
                  </p>
                </div>

                <div className={styles.itemActions}>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className={styles.btnSecondary}
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                  >
                    ✉️ Reply
                  </a>
                  <button
                    onClick={() => toggleMessageRead(msg.id)}
                    className={styles.btnSecondary}
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    title="Toggle Read / Unread"
                  >
                    {msg.read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className={styles.btnDanger}
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    title="Delete Message"
                  >
                    ✕
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

export default ContactTab
