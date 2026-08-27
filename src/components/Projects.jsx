import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './Projects.module.css'
import societyManagementImage from '../assets/society-management.png'
import courierManagementImage from '../assets/courier-management.png'
import youtubeCloneImage from '../assets/youtube-clone.png'
import musicPlayerImage from '../assets/music-player.png'
import imageCollectionImage from '../assets/image-collection.png'
import medicalDashboardImage from '../assets/medical-dashboard.png'
import smartSocietyImage from '../assets/smartsociety.png'
import passwordStrengthCheckerImage from '../assets/password strength checker.jpg'
import networkIntrusionDetectionSystemImage from '../assets/Network Intrusion Detection System (NIDS).png'
import imageEncryptionDecryptionSystemImage from '../assets/Image Encryption and Decryption System.png'
import FoodDeliveryPlatformImage from '../assets/Food Delivery Platform.jpg'

const PROJECTS = [
  {
    id: 12,
    title: 'Kiruvar Technology — Elite Software & AI Solutions',
    image: '/kiruvar-technology.jpg',
    description: 'Official corporate platform for Kiruvar Technology, delivering elite software engineering, high-performance web applications, mobile platforms, and robust custom AI solutions with enterprise-grade security and modern digital aesthetics.',
    github: 'https://github.com/Varun2327-code',
    liveDemo: 'https://kiruvartechnology.in/',
    techStack: ['React', 'Node.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'SEO Optimization'],
    category: 'web',
    accent: '#00F5FF',
    wip: false,
  },
  {
    id: 1,
    title: 'Multi-Vendor Food Delivery Platform',
    image: FoodDeliveryPlatformImage,
    description: 'A real-world multi-vendor food delivery system with role-based dashboards for Customers, Vendors, Delivery Partners, and Super Admin. Supports 100+ restaurants with real-time order tracking.',
    github: 'https://github.com/Varun2327-code/QUICKBITES',
    liveDemo: 'https://quickbites-khaki.vercel.app/',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Firebase'],
    category: 'web',
    accent: '#00B4D8',
    wip: false,
  },
  {
    id: 2,
    title: 'Smart Society Management',
    image: smartSocietyImage,
    description: 'A comprehensive smart society system with visitor tracking, booking management, and communication tools for residents and administrators.',
    github: 'https://github.com/Varun2327-code/Smartsocietymanagementfrontend',
    liveDemo: 'https://smartsocietymanagementfrontend.vercel.app/',
    techStack: ['React', 'Node.js', 'Firebase', 'Express', 'Material-UI'],
    category: 'web',
    accent: '#7C3AED',
    wip: false,
  },
  {
    id: 3,
    title: 'Music Player',
    image: musicPlayerImage,
    description: 'A feature-rich music application with playlist management, audio controls, and a responsive UI built with vanilla web technologies.',
    github: 'https://github.com/Varun2327-code/music_app-frontend',
    liveDemo: 'https://music-app-frontend-eta.vercel.app/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    accent: '#00F5FF',
    wip: false,
  },
  {
    id: 4,
    title: 'Password Strength Checker',
    image: passwordStrengthCheckerImage,
    description: 'A Python-based security tool that evaluates password strength using regex patterns, entropy analysis, and security rules.',
    github: 'https://github.com/Varun2327-code/password-strength-checker',
    liveDemo: null,
    techStack: ['Python', 'Linux', 'Regex'],
    category: 'cybersecurity',
    accent: '#39FF14',
    wip: true,
    progress: 99,
  },
  {
    id: 5,
    title: 'Network Intrusion Detection System',
    image: networkIntrusionDetectionSystemImage,
    description: 'A real-time ML-powered traffic monitoring and intrusion detection system for identifying malicious network activity.',
    github: 'https://github.com/Varun2327-code/nids',
    liveDemo: null,
    techStack: ['Python', 'Linux', 'Scikit-learn', 'TensorFlow'],
    category: 'cybersecurity',
    accent: '#FFD700',
    wip: false,
  },
  {
    id: 6,
    title: 'Image Encryption & Decryption',
    image: imageEncryptionDecryptionSystemImage,
    description: 'Securely encrypt and decrypt images using industry-standard AES and RSA cryptographic algorithms.',
    github: 'https://github.com/Varun2327-code/image-encryption',
    liveDemo: null,
    techStack: ['Python', 'Linux', 'Crypto', 'AES', 'RSA'],
    category: 'cybersecurity',
    accent: '#7C3AED',
    wip: true,
    progress: 80,
  },
  {
    id: 7,
    title: 'Society Management System',
    image: societyManagementImage,
    description: 'An Android application to manage society tasks, announcements, and communication for residents and admins.',
    github: 'https://github.com/Varun2327-code/My-society-management-system',
    liveDemo: null,
    techStack: ['Android', 'Firebase', 'Java'],
    category: 'mobile',
    accent: '#FF6B6B',
    wip: false,
  },
  {
    id: 8,
    title: 'Courier Management System',
    image: courierManagementImage,
    description: 'A streamlined system for booking and tracking parcels with real-time status updates.',
    github: 'https://github.com/Varun2327-code/courier_managment_system',
    liveDemo: null,
    techStack: ['Java', 'Spring Boot', 'MySQL'],
    category: 'web',
    accent: '#00B4D8',
    wip: false,
  },
  {
    id: 9,
    title: 'YouTube Clone',
    image: youtubeCloneImage,
    description: 'A video search and playback application built with YouTube API integration and responsive CSS design.',
    github: 'https://github.com/Varun2327-code/Youtubeclone',
    liveDemo: 'https://youtubeclone-chi-blond.vercel.app/',
    techStack: ['React', 'YouTube API', 'CSS3'],
    category: 'web',
    accent: '#FF6B6B',
    wip: false,
  },
  {
    id: 10,
    title: 'Image Market Clone',
    image: imageCollectionImage,
    description: 'A stock image browsing application clone with search functionality and responsive grid layout.',
    github: 'https://github.com/Varun2327-code/ImageMarketClone',
    liveDemo: 'https://image-market-clone.vercel.app/',
    techStack: ['React', 'CSS3', 'Responsive'],
    category: 'web',
    accent: '#FFD700',
    wip: false,
  },
  {
    id: 11,
    title: 'Medical Dashboard',
    image: medicalDashboardImage,
    description: 'A hospital admin dashboard featuring patient statistics, appointment management, and interactive charts.',
    github: 'https://github.com/Varun2327-code/medical-frontend',
    liveDemo: 'https://medical-frontend.vercel.app',
    techStack: ['React', 'Chart.js', 'CSS'],
    category: 'dashboard',
    accent: '#7C3AED',
    wip: false,
  },
]

const CATEGORIES = ['all', 'web', 'mobile', 'dashboard', 'cybersecurity']

// Project Modal
const ProjectModal = ({ project, onClose, onProjectClick }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Badge & Close Button */}
          <div className={styles.modalTopBar}>
            <div className={styles.modalMeta}>
              <span className={styles.modalCategory}>{project.category.toUpperCase()}</span>
              {project.wip && <span className={styles.modalWipBadge}>🚧 IN DEVELOPMENT {project.progress && `(${project.progress}%)`}</span>}
            </div>

            <button
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close project modal"
              data-cursor="hover"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Scrollable Container */}
          <div className={styles.modalScrollBody}>
            {/* Image */}
            <div className={styles.modalImageWrapper}>
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>

            {/* Content */}
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{project.title}</h2>
              <p className={styles.modalDesc}>{project.description}</p>

              {/* Tech stack */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Technologies &amp; Architecture</h3>
                <div className={styles.modalTechStack}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className={styles.modalTech} style={{ '--accent': project.accent }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Bar */}
              <div className={styles.modalActions}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onProjectClick(project.id, 'github', project.title)}
                    className={styles.modalBtnPrimary}
                    data-cursor="external"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    Source Code
                  </a>
                )}
                {project.liveDemo && !project.wip && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onProjectClick(project.id, 'liveDemo', project.title)}
                    className={styles.modalBtnOutline}
                    data-cursor="external"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Project Card
const ProjectCard = ({ project, index, onClick, onProjectClick, inView }) => (
  <motion.div
    className={styles.card}
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: (index % 6) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    style={{ '--accent': project.accent }}
    onClick={() => onClick(project)}
    role="button"
    tabIndex={0}
    aria-label={`View ${project.title} project details`}
    onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
    data-cursor="view"
  >
    {/* Image */}
    <div className={styles.cardImage}>
      {project.wip && (
        <div className={styles.wipBadge}>
          🚧 {project.progress ? `${project.progress}%` : 'In Dev'}
        </div>
      )}
      <img src={project.image} alt={project.title} loading="lazy" />
      <div className={styles.cardOverlay}>
        <span className={styles.viewLabel}>VIEW PROJECT</span>
      </div>
    </div>

    {/* Content */}
    <div className={styles.cardContent}>
      <div className={styles.cardMeta}>
        <span className={styles.cardCategory}>{project.category}</span>
      </div>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>

      <div className={styles.cardFooter}>
        <div className={styles.cardTech}>
          {project.techStack.slice(0, 3).map((t, i) => (
            <span key={i} className={styles.techTag}>{t}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className={styles.techMore}>+{project.techStack.length - 3}</span>
          )}
        </div>

        <div className={styles.cardLinks} onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={() => onProjectClick(project.id, 'github', project.title)} aria-label="GitHub repository" data-cursor="external">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          )}
          {project.liveDemo && !project.wip && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onClick={() => onProjectClick(project.id, 'liveDemo', project.title)} aria-label="Live demo" data-cursor="external">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>

    {/* Accent bottom line */}
    <div className={styles.cardAccent} aria-hidden="true" />
  </motion.div>
)

const Projects = () => {
  const { projects, trackProjectView, trackProjectClick } = usePortfolio()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleOpenProject = (project) => {
    trackProjectView(project.id, project.title)
    setSelectedProject(project)
  }

  const filtered = projects.filter(p =>
    activeCategory === 'all' || p.category === activeCategory
  )
  const displayed = showAll ? filtered : filtered.slice(0, 6)

  return (
    <section id="projects" className={styles.projects} ref={ref} aria-label="Featured Projects">
      <div className={styles.bgGlow} aria-hidden="true" />

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
            FEATURED WORK
          </span>
          <h2 className={styles.heading}>Projects &amp; Builds</h2>
          <p className={styles.subheading}>
            A selection of production-ready applications and security tools.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          role="tablist"
          aria-label="Filter projects by category"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => { setActiveCategory(cat); setShowAll(false) }}
              data-cursor="hover"
            >
              {cat === 'all' ? 'ALL' : cat.toUpperCase()}
              {activeCategory === cat && (
                <motion.div className={styles.filterIndicator} layoutId="filterIndicator" />
              )}
            </button>
          ))}

          <div className={styles.projectCount}>
            <span>{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={handleOpenProject}
                onProjectClick={trackProjectClick}
                inView={inView}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {filtered.length > 6 && (
          <motion.div
            className={styles.showMore}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button
              className={styles.showMoreBtn}
              onClick={() => setShowAll(!showAll)}
              data-cursor="hover"
            >
              {showAll ? 'SHOW LESS' : `LOAD MORE (${filtered.length - 6} remaining)`}
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onProjectClick={trackProjectClick}
        />
      )}
    </section>
  )
}

export default Projects
