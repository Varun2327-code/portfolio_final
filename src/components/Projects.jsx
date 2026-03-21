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
import { useState } from 'react'

const projects = [
  {
    title: 'Multi-Vendor Food Delivery Platform',
    image: FoodDeliveryPlatformImage,
    description:
      'A real-world multi-vendor food delivery system with role-based dashboards for Customers, Vendors, Delivery Partners, and Super Admin, Built a platform supporting 100+ restaurants with real-time order tracking.',
    github: 'https://github.com/Varun2327-code/QUICKBITES',
    liveDemo: 'https://quickbites-khaki.vercel.app/',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Firebase'],
    category: 'web',
    color: '#FF6B35',
    wip: false,
  },
  {
    title: 'Smart Society Management',
    image: smartSocietyImage,
    description:
      'A comprehensive smart society system with visitor tracking, booking, and communication tools.',
    github: 'https://github.com/Varun2327-code/Smartsocietymanagementfrontend',
    liveDemo: 'https://smartsocietymanagementfrontend.vercel.app/',
    techStack: ['React', 'Node.js', 'Firebase', 'Express', 'Material-UI'],
    category: 'web',
    color: '#FF8C42',
    wip: false
  },
  {
    title: 'Music Player',
    image: musicPlayerImage,
    description: 'Music app with playlist and controls.',
    github: 'https://github.com/Varun2327-code/music_app-frontend',
    liveDemo: 'https://music-app-frontend-eta.vercel.app/',
    techStack: ['HTML', 'CSS', 'JS'],
    category: 'web',
    color: '#96CEB4',
    wip: false
  },
  {
    title: 'Password Strength Checker',
    image: passwordStrengthCheckerImage,
    description:
      'A Python-based security tool that evaluates the strength of user passwords using regex, entropy, and rules.',
    github: 'https://github.com/Varun2327-code/password-strength-checker',
    liveDemo: 'https://password-checker-demo.com',
    techStack: ['Python', 'Linux', 'Regex'],
    category: 'cybersecurity',
    color: '#4ECDC4',
    wip: true,
    progress: 99
  },
  {
    title: 'Network Intrusion Detection System (NIDS)',
    image: networkIntrusionDetectionSystemImage,
    description: 'A real-time ML powered traffic monitoring & intrusion detection system.',
    github: 'https://github.com/Varun2327-code/nids',
    liveDemo: 'https://nids-demo.com',
    techStack: ['Python', 'Linux', 'Scikit-learn', 'TensorFlow'],
    category: 'cybersecurity',
    color: '#45B7D1',
    wip: false
  },
  {
    title: 'Image Encryption & Decryption System',
    image: imageEncryptionDecryptionSystemImage,
    description: 'Securely encrypt and decrypt images using AES and RSA.',
    github: 'https://github.com/Varun2327-code/image-encryption',
    liveDemo: 'https://image-encryption-demo.com',
    techStack: ['Python', 'Linux', 'Crypto', 'AES', 'RSA'],
    category: 'cybersecurity',
    color: '#96CEB4',
    wip: true,
    progress: 80
  },
  {
    title: 'Society Management System',
    image: societyManagementImage,
    description: 'Android app to manage society tasks for residents and admins.',
    github: 'https://github.com/Varun2327-code/My-society-management-system',
    liveDemo: 'https://project-one-demo.com',
    techStack: ['Android', 'Firebase', 'Java'],
    category: 'mobile',
    color: '#FF6B6B',
    wip: false
  },
  {
    title: 'Courier Management System',
    image: courierManagementImage,
    description: 'Streamline booking and tracking of parcels.',
    github: 'https://github.com/Varun2327-code/courier_managment_system',
    liveDemo: 'https://project-two-demo.com',
    techStack: ['Java', 'Spring Boot', 'MySQL'],
    category: 'web',
    color: '#4ECDC4',
    wip: false
  },
  {
    title: 'YouTube Clone',
    image: youtubeCloneImage,
    description: 'Video search & playback using YouTube API.',
    github: 'https://github.com/Varun2327-code/Youtubeclone',
    liveDemo: 'https://youtubeclone-chi-blond.vercel.app/',
    techStack: ['React', 'YouTube API', 'CSS3'],
    category: 'web',
    color: '#45B7D1',
    wip: false
  },
  {
    title: 'Image Market Clone',
    image: imageCollectionImage,
    description: 'Stock image browsing app clone.',
    github: 'https://github.com/Varun2327-code/ImageMarketClone',
    liveDemo: 'https://image-market-clone.vercel.app/',
    techStack: ['React', 'CSS3', 'Responsive'],
    category: 'web',
    color: '#FECA57',
    wip: false
  },
  {
    title: 'Medical Dashboard',
    image: medicalDashboardImage,
    description: 'Hospital admin dashboard with stats & charts.',
    github: 'https://github.com/Varun2327-code/medical-frontend',
    liveDemo: 'https://medical-frontend.vercel.app',
    techStack: ['React', 'Chart.js', 'CSS'],
    category: 'dashboard',
    color: '#DDA0DD',
    wip: false
  }
]

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some(t =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  const displayProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6)

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            Explore my latest work and creative solutions
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filterTabs}>
            {['all', 'web', 'mobile', 'dashboard', 'cybersecurity'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.filterTab} ${selectedCategory === cat ? styles.active : ''
                  }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              placeholder="Search projects..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {displayProjects.map((project, index) => (
            <div
              key={index}
              className={styles.projectCard}
              style={{ '--accent-color': project.color }}
            >
              <div className={styles.cardImage}>
                {project.wip && (
                  <div className={styles.wipBadge}>
                    🚧 In Development
                    {project.progress && ` • ${project.progress}%`}
                  </div>
                )}

                <img src={project.image} alt={project.title} />

                <div className={styles.imageOverlay}>
                  <div className={styles.overlayContent}>
                    <h3>{project.title}</h3>
                    <p>{project.techStack.join(' • ')}</p>
                  </div>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>

                <div className={styles.techStack}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <a
                    href={project.github}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => project.wip && e.preventDefault()}
                  >
                    🐙 Code
                  </a>

                  <a
                    href={project.liveDemo}
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => project.wip && e.preventDefault()}
                  >
                    🚀 Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
