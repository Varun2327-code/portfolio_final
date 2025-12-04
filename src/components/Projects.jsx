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
    title: 'Food Delivery Platform',
    image: FoodDeliveryPlatformImage,
    description: 'A multi-vendor food ordering system where users can browse restaurants, place orders, track deliveries, and make payments online.',
    github: 'https://github.com/Varun2327-code/food-delivery-platform',
    liveDemo: 'https://food-delivery-demo.com',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    category: 'web',
    color: '#FF6B35',
    wip: true // ⚠️ WIP alert will show only for this project
  },
  {
    title: 'Password Strength Checker',
    image: passwordStrengthCheckerImage,
    description: 'A Python-based security tool that evaluates the strength of user passwords using regex, entropy, and rules to suggest stronger alternatives.',
    github: 'https://github.com/Varun2327-code/password-strength-checker',
    liveDemo: 'https://password-checker-demo.com',
    techStack: ['Python', 'Linux', 'Regex'],
    category: 'cybersecurity',
    color: '#4ECDC4',
    wip: true  // ⚠️ WIP alert will show only for this project
  },
  {
    title: 'Smart Society Management',
    image: smartSocietyImage,
    description: 'A comprehensive smart society system with visitor tracking, booking, and communication tools.',
    github: 'https://github.com/Varun2327-code/Smartsocietymanagementfrontend',
    liveDemo: 'https://smartsocietymanagementfrontend.vercel.app/',
    techStack: ['React', 'Node.js', 'Firebase', 'Express', 'Material-UI'],
    category: 'web',
    color: '#FF8C42',
    wip: false
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
    wip: true  // ⚠️ Only this will show WIP alert
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
    liveDemo: 'youtubeclone-chi-blond.vercel.app',
    techStack: ['React', 'YouTube API', 'CSS3'],
    category: 'web',
    color: '#45B7D1',
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
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)
  const hiddenCount = filteredProjects.length - 6

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🚀' },
    { id: 'web', name: 'Web Apps', icon: '💻' },
    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
    { id: 'dashboard', name: 'Dashboards', icon: '📊' },
    { id: 'cybersecurity', name: 'Cyber Tools', icon: '🔒' }
  ]

  const handleShowMore = () => {
    setIsExpanding(true)
    setShowAll(true)
    setTimeout(() => setIsExpanding(false), 600)
  }

  const handleShowLess = () => {
    setShowAll(false)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>Explore my latest work and creative solutions</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filterTabs}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${styles.filterTab} ${selectedCategory === category.id ? styles.active : ''}`}
              >
                <span className={styles.tabIcon}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>

        <div className={`${styles.projectsGrid} ${isExpanding ? styles.expanding : ''}`}>
          {displayProjects.map((project, index) => (
            <div
              key={index}
              className={styles.projectCard}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ '--accent-color': project.color }}
            >
              <div className={styles.cardImage}>
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
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  {/* Code Button */}
                  <a
                    href="#"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={(e) => {
                      if (project.wip) {
                        e.preventDefault()
                        alert("⚠️ This project is a Work in Progress and currently not live.")
                      } else {
                        window.open(project.github, '_blank')
                      }
                    }}
                  >
                    <span>🐙</span> Code
                  </a>

                  {/* Live Demo Button */}
                  <a
                    href="#"
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={(e) => {
                      if (project.wip) {
                        e.preventDefault()
                        alert("⚠️ This project is a Work in Progress and currently not live.")
                      } else {
                        window.open(project.liveDemo, '_blank')
                      }
                    }}
                  >
                    <span>🚀</span> Live Demo
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {!showAll && filteredProjects.length > 6 && (
          <div className={styles.showMoreContainer}>
            <button onClick={handleShowMore} className={styles.showMoreBtn}>
              <span>Show More</span>
              <span className={styles.showMoreIcon}>↓</span>
              <span className={styles.showMoreCount}>+{hiddenCount} more</span>
            </button>
          </div>
        )}

        {showAll && filteredProjects.length > 6 && (
          <div className={styles.showLessContainer}>
            <button onClick={handleShowLess} className={styles.showLessBtn}>
              <span>Show Less</span>
              <span className={styles.showLessIcon}>↑</span>
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p>No projects found matching your criteria.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default Projects
