import React, { useState } from 'react'
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
const projects = [
   {
    title: 'Food Delivery Platform',
    image: FoodDeliveryPlatformImage,
    description: 'A multi-vendor food ordering system where users can browse restaurants, place orders, track deliveries, and make payments online.',
    github: 'https://github.com/Varun2327-code/food-delivery-platform',
    liveDemo: 'https://food-delivery-demo.com',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    category: 'web',
    color: '#FF6B35'
  },
  {
    title: 'Password Strength Checker',
    image: passwordStrengthCheckerImage,
    description: 'A Python-based security tool that evaluates the strength of user passwords using regex, entropy, and rules to suggest stronger alternatives.',
    github: 'https://github.com/Varun2327-code/password-strength-checker',
    liveDemo: 'https://password-checker-demo.com',
    techStack: ['Python', 'Linux', 'Regex'],
    category: 'cybersecurity',
    color: '#4ECDC4'
  },
   {
    title: 'Smart Society Management',
    image: smartSocietyImage,
    description: 'A comprehensive smart society management solution built with React and Node.js, featuring real-time visitor tracking, facility booking, member management, and communication tools. Currently operational and managing multiple residential societies with Firebase backend.',
    github: 'https://github.com/Varun2327-code/smart-society-management',
    liveDemo: 'https://smart-society-management.web.app',
    techStack: ['React', 'Node.js', 'Firebase', 'Express', 'Material-UI'],
    category: 'web',
    color: '#FF8C42'
  },
   {
    title: 'Network Intrusion Detection System (NIDS)',
    image: networkIntrusionDetectionSystemImage,
    description: 'A machine-learning powered cybersecurity system that monitors network traffic and detects suspicious or malicious activities in real time.',
    github: 'https://github.com/Varun2327-code/nids',
    liveDemo: 'https://nids-demo.com',
    techStack: ['Python', 'Linux', 'Scikit-learn', 'TensorFlow'],
    category: 'cybersecurity',
    color: '#45B7D1'
  },
  {
    title: 'Image Encryption & Decryption System',
    image: imageEncryptionDecryptionSystemImage,
    description: 'A cryptography project that uses AES and RSA algorithms to securely encrypt and decrypt image files, ensuring privacy and data protection.',
    github: 'https://github.com/Varun2327-code/image-encryption',
    liveDemo: 'https://image-encryption-demo.com',
    techStack: ['Python', 'Linux', 'Cryptography', 'AES', 'RSA'],
    category: 'cybersecurity',
    color: '#96CEB4'
  },
  {
    title: 'Society Management System',
    image: societyManagementImage,
    description: 'A comprehensive Android-based society management solution enabling residents and administrators to efficiently handle society-related tasks.',
    github: 'https://github.com/Varun2327-code/My-society-management-system',
    liveDemo: 'https://project-one-demo.com',
    techStack: ['Android', 'Firebase', 'Java'],
    category: 'mobile',
    color: '#FF6B6B'
  },
  {
    title: 'Courier Management System',
    image: courierManagementImage,
    description: 'An application that streamlines the booking, tracking, and delivery of parcels for customers and administrators.',
    github: 'https://github.com/Varun2327-code/courier_managment_system',
    liveDemo: 'https://project-two-demo.com',
    techStack: ['Java', 'Spring Boot', 'MySQL'],
    category: 'web',
    color: '#4ECDC4'
  },
  {
    title: 'YouTube Clone',
    image: youtubeCloneImage,
    description: 'Developed a YouTube Clone using React.js and YouTube API, featuring video search, playback, channel view, and responsive UI.',
    github: 'https://github.com/Varun2327-code/Youtubeclone',
    liveDemo: 'youtubeclone-chi-blond.vercel.app',
    techStack: ['React', 'YouTube API', 'CSS3'],
    category: 'web',
    color: '#45B7D1'
  },
  {
    title: 'Music Player',
    image: musicPlayerImage,
    description: 'Created a Music Player Web App with HTML, CSS, and JavaScript, enabling playlist creation, play/pause/seek controls, and animations.',
    github: 'https://github.com/Varun2327-code/music_app-frontend',
    liveDemo: 'https://music-app-frontend-eta.vercel.app/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    color: '#96CEB4'
  },
  {
    title: 'Image Collection',
    image: imageCollectionImage,
    description: 'Designed and developed a personal portfolio website using React.js, showcasing projects, skills, and contact information with a modern UI.',
    github: 'https://github.com/Varun2327-code/ImageMarketClone',
    liveDemo: 'https://image-market-clone.vercel.app/',
    techStack: ['React', 'CSS3', 'Responsive Design'],
    category: 'web',
    color: '#FECA57'
  },
  {
    title: 'Medical Dashboard',
    image: medicalDashboardImage,
    description: 'A modern hospital admin dashboard for managing patients, appointments, billing, and medical statistics with interactive charts and a clean UI.',
    github: 'https://github.com/Varun2327-code/medical-frontend',
    liveDemo: 'https://medical-frontend-51u8y1uv9-varuns-projects-599513ab.vercel.app',
    techStack: ['React', 'Chart.js', 'CSS3'],
    category: 'dashboard',
    color: '#DDA0DD'
  },
]

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)
  const hasMoreProjects = filteredProjects.length > 6
  const hiddenCount = filteredProjects.length - 6

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🚀' },
    { id: 'web', name: 'Web Apps', icon: '💻' },
    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
    { id: 'dashboard', name: 'Dashboards', icon: '📊' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' }
  ]

  const handleShowMore = () => {
    setIsExpanding(true)
    setShowAll(true)
    setTimeout(() => setIsExpanding(false), 600)
  }

  const handleShowLess = () => {
    setShowAll(false)
    // Scroll to top of projects section
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

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
              className={`${styles.projectCard} ${showAll && index >= 6 ? styles.fadeIn : ''}`}
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
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
                
                <div className={styles.cardActions}>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    <span>🐙</span>
                    Code
                  </a>
                  <a 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.btnSecondary}`}
                  >
                    <span>🚀</span>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreProjects && !showAll && (
          <div className={styles.showMoreContainer}>
            <button 
              onClick={handleShowMore}
              className={styles.showMoreBtn}
            >
              <span>Show More</span>
              <span className={styles.showMoreIcon}>↓</span>
              <span className={styles.showMoreCount}>+{hiddenCount} more</span>
            </button>
          </div>
        )}

        {showAll && filteredProjects.length > 6 && (
          <div className={styles.showLessContainer}>
            <button 
              onClick={handleShowLess}
              className={styles.showLessBtn}
            >
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
