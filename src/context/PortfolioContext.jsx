import React, { createContext, useContext, useState, useEffect } from 'react'
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

// Initial Default Data
const DEFAULT_HERO = {
  label1: 'FULL STACK DEVELOPER',
  label2: 'CYBERSECURITY ENTHUSIAST',
  intro: "Hi, I'm",
  firstName: 'VARUN',
  lastName: 'SHRIMAL',
  subtitle: 'I build fast, scalable and secure web applications with clean code and great user experience.',
  githubUrl: 'https://github.com/Varun2327-code',
  linkedinUrl: 'https://www.linkedin.com/in/varun-shrimal-203705283',
  email: 'varunshrimal27@gmail.com',
  heroImage: '/hero-cinematic.jpg',
  availableForWork: true,
}

const DEFAULT_ABOUT = {
  headingLine1: 'Passionate',
  headingLine2: 'Developer',
  bio1: "I'm currently pursuing Integrated MCA in Cyber Security and Forensics, specializing in building secure, scalable web applications.",
  bio2: 'I create solutions that work flawlessly and are secure against modern cyber threats. Outside coding, I explore vulnerabilities and contribute to open-source projects.',
  role: 'Full Stack + Cybersecurity',
  location: 'Dungarpur, Rajasthan, India',
  aboutImage: '/about-studio.jpg',
  traits: [
    { id: 1, icon: '⚡', label: 'Performance-first', desc: 'Fast, optimized code' },
    { id: 2, icon: '🔐', label: 'Security-minded', desc: 'OWASP & best practices' },
    { id: 3, icon: '🎨', label: 'Clean UI/UX', desc: 'Intuitive interfaces' },
    { id: 4, icon: '🚀', label: 'Scalable systems', desc: 'Built to grow' },
  ]
}

const DEFAULT_STATS = [
  {
    id: 1,
    iconType: 'projects',
    value: 10,
    suffix: '+',
    label: 'Projects Completed',
    color: '#00B4D8',
    isText: false,
    textValue: '',
  },
  {
    id: 2,
    iconType: 'security',
    value: 3,
    suffix: '',
    label: 'Security Certifications',
    color: '#7C3AED',
    isText: false,
    textValue: '',
  },
  {
    id: 3,
    iconType: 'bug',
    value: 1,
    suffix: '',
    label: 'Vulnerability Found',
    color: '#00F5FF',
    isText: false,
    textValue: '',
  },
  {
    id: 4,
    iconType: 'star',
    value: null,
    suffix: '',
    label: 'Experience Level',
    color: '#FFD700',
    isText: true,
    textValue: 'FRESHER',
  },
]

const DEFAULT_SKILL_CATEGORIES = [
  {
    id: 'fullstack',
    label: 'FULL STACK & WEB',
    color: '#00B4D8',
    skills: [
      { id: 1, name: 'React.js', level: 'Expert', desc: 'Component architecture, Hooks, Context, custom hooks & state patterns' },
      { id: 2, name: 'Next.js', level: 'Advanced', desc: 'SSR, Static Generation, Server Components & SEO optimization' },
      { id: 3, name: 'Node.js', level: 'Expert', desc: 'Asynchronous event-driven server runtime, stream processing & microservices' },
      { id: 4, name: 'Express.js', level: 'Expert', desc: 'Scalable RESTful API routing, error middleware & secure authentication' },
      { id: 5, name: 'TypeScript', level: 'Advanced', desc: 'Static type checking, interfaces, generics & enterprise code maintainability' },
      { id: 6, name: 'MongoDB', level: 'Expert', desc: 'NoSQL document database, aggregation pipelines, schema validation & indexing' },
      { id: 7, name: 'Redis', level: 'Advanced', desc: 'In-memory high-speed caching, pub/sub messaging & rate limiting' },
      { id: 8, name: 'WebSockets & Socket.io', level: 'Advanced', desc: 'Real-time bidirectional event communication & live streaming feeds' },
      { id: 9, name: 'REST APIs', level: 'Expert', desc: 'Secure endpoint architecture, payload sanitization & CORS policies' },
      { id: 10, name: 'Tailwind CSS', level: 'Expert', desc: 'Utility-first modern responsive UI styling & design system tokens' },
      { id: 11, name: 'Material-UI', level: 'Advanced', desc: 'Enterprise component library, custom theming & accessible components' },
      { id: 12, name: 'React Native', level: 'Proficient', desc: 'Cross-platform mobile applications for Android & iOS' },
    ],
  },
  {
    id: 'security',
    label: 'CYBERSECURITY & AUDITING',
    color: '#39FF14',
    skills: [
      { id: 13, name: 'Burp Suite', level: 'Advanced', desc: 'Web vulnerability scanning, HTTP proxy interception, Repeater & Intruder' },
      { id: 14, name: 'Wireshark', level: 'Advanced', desc: 'Deep network packet analysis, protocol disassembly & traffic inspection' },
      { id: 15, name: 'Nmap', level: 'Expert', desc: 'Network discovery, port auditing, NSE vulnerability scripts & OS fingerprinting' },
      { id: 16, name: 'Metasploit', level: 'Advanced', desc: 'Offensive penetration testing framework, exploit payloads & post-exploitation' },
      { id: 17, name: 'VAPT', level: 'Expert', desc: 'Vulnerability Assessment and Penetration Testing lifecycle & audit reporting' },
      { id: 18, name: 'OWASP Top 10', level: 'Expert', desc: 'Vulnerability mitigation (Injection, Broken Auth, XSS, SSRF, CSRF, IDOR)' },
      { id: 19, name: 'Digital Forensics (DFIR)', level: 'Advanced', desc: 'Incident response, artifact extraction, memory forensics & chain of custody' },
      { id: 20, name: 'Cryptography (AES/RSA/SHA)', level: 'Advanced', desc: 'Symmetric & asymmetric encryption, hashing, HMAC & SSL/TLS certificate chains' },
      { id: 21, name: 'JWT & OAuth 2.0', level: 'Expert', desc: 'Stateless token lifecycle, signature verification, token rotation & social auth' },
      { id: 22, name: 'RBAC Access Control', level: 'Expert', desc: 'Role-Based Access Control, principle of least privilege & authorization guards' },
      { id: 23, name: 'NIDS (Snort / Suricata)', level: 'Advanced', desc: 'Network Intrusion Detection Systems, custom rule writing & alert parsing' },
      { id: 24, name: 'SQL Injection Defense', level: 'Expert', desc: 'SQLi vector mitigation, parameterized queries & ORM security' },
    ],
  },
  {
    id: 'languages',
    label: 'LANGUAGES & SCRIPTS',
    color: '#7C3AED',
    skills: [
      { id: 25, name: 'JavaScript (ES6+)', level: 'Expert', desc: 'Async/await, closures, event loop, Promises & modern DOM APIs' },
      { id: 26, name: 'TypeScript', level: 'Advanced', desc: 'Strict type safety, custom utility types & backend/frontend contracts' },
      { id: 27, name: 'Python', level: 'Expert', desc: 'Security tooling, network automation scripts, analysis & ML integration' },
      { id: 28, name: 'SQL', level: 'Expert', desc: 'Relational query design, indexing, joins, stored procedures & query optimization' },
      { id: 29, name: 'Bash & Shell', level: 'Advanced', desc: 'Linux terminal scripting, task automation, cron jobs & process orchestration' },
      { id: 30, name: 'HTML5 & CSS3', level: 'Expert', desc: 'Semantic layout, CSS Grid, Flexbox, custom variables & smooth micro-animations' },
      { id: 31, name: 'PHP', level: 'Proficient', desc: 'Server-side application logic, MySQL database connectivity & legacy integration' },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS, CLOUD & DEVOPS',
    color: '#FFD700',
    skills: [
      { id: 32, name: 'Git & GitHub', level: 'Expert', desc: 'Distributed version control, branching strategies, PR workflows & CI/CD Actions' },
      { id: 33, name: 'Docker & Containers', level: 'Advanced', desc: 'Containerization, Dockerfile optimization, isolated microservices & Compose' },
      { id: 34, name: 'Postman', level: 'Expert', desc: 'Automated API test suites, environment configurations & mock endpoints' },
      { id: 35, name: 'Linux Administration', level: 'Expert', desc: 'Debian/Ubuntu/Kali Linux server management, SSH, firewall & systemctl' },
      { id: 36, name: 'PostgreSQL & MySQL', level: 'Advanced', desc: 'ACID transactions, relational schemas, foreign keys & performance indexing' },
      { id: 37, name: 'Firebase', level: 'Advanced', desc: 'Cloud Firestore, real-time sync, cloud storage & Firebase Auth' },
      { id: 38, name: 'Vercel & Netlify', level: 'Expert', desc: 'Serverless deployment, edge rewrites, custom domains & automated CI/CD' },
      { id: 39, name: 'OpenAI API & LLMs', level: 'Advanced', desc: 'Prompt engineering, intelligent agent integration & API automation' },
    ],
  },
]

const DEFAULT_TIMELINE = [
  {
    id: 1,
    date: '2022 – 2026',
    title: 'Integrated MCA – Cyber Security & Forensics',
    organization: 'Parul University, Vadodara',
    description: 'Pursuing advanced studies in Cyber Security and Forensics with focus on secure application development, full-stack web development, and digital forensics.',
    type: 'education',
    current: true,
  },
  {
    id: 2,
    date: '2021 – 2022',
    title: 'Higher Secondary Education',
    organization: 'Dungarpur Public School',
    description: 'Completed Higher Secondary education with a focus on Commerce stream, achieving strong academic results and developing foundational analytical skills.',
    type: 'education',
    current: false,
  },
]

const DEFAULT_PROJECTS = [
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
    liveDemo: '',
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
    liveDemo: '',
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
    liveDemo: '',
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
    liveDemo: '',
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
    liveDemo: '',
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

const DEFAULT_RESUME = {
  url: '/varun_Shrimal-Resume.pdf',
  fileName: 'Varun_Shrimal_Resume.pdf',
  title: 'Varun Shrimal — Resume (Full Stack & Cybersecurity)',
  fileSize: '1.2 MB',
  uploadDate: '2026-08-26',
}

const DEFAULT_ANALYTICS = {
  pageViews: 0,
  resumeDownloads: 0,
  resumeDownloadLogs: [],
  projectViews: {},
  projectClicks: {},
  recentActivity: [],
}

const DEFAULT_MESSAGES = []

const PortfolioContext = createContext(null)

export const PortfolioProvider = ({ children }) => {
  // Load saved state or fall back to defaults
  const [hero, setHero] = useState(() => {
    const saved = localStorage.getItem('vportfolio_hero')
    return saved ? JSON.parse(saved) : DEFAULT_HERO
  })

  const [about, setAbout] = useState(() => {
    const saved = localStorage.getItem('vportfolio_about')
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT
  })

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('vportfolio_stats')
    return saved ? JSON.parse(saved) : DEFAULT_STATS
  })

  const [skillCategories, setSkillCategories] = useState(() => {
    const saved = localStorage.getItem('vportfolio_skills_v3')
    return saved ? JSON.parse(saved) : DEFAULT_SKILL_CATEGORIES
  })

  const [timeline, setTimeline] = useState(() => {
    const saved = localStorage.getItem('vportfolio_timeline')
    return saved ? JSON.parse(saved) : DEFAULT_TIMELINE
  })

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('vportfolio_projects_v3')
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS
  })

  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem('vportfolio_resume')
    return saved ? JSON.parse(saved) : DEFAULT_RESUME
  })

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('vportfolio_messages_live')
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES
  })

  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('vportfolio_analytics_live')
    return saved ? JSON.parse(saved) : DEFAULT_ANALYTICS
  })

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('vportfolio_hero', JSON.stringify(hero))
  }, [hero])

  useEffect(() => {
    localStorage.setItem('vportfolio_about', JSON.stringify(about))
  }, [about])

  useEffect(() => {
    localStorage.setItem('vportfolio_stats', JSON.stringify(stats))
  }, [stats])

  useEffect(() => {
    localStorage.setItem('vportfolio_skills_v3', JSON.stringify(skillCategories))
  }, [skillCategories])

  useEffect(() => {
    localStorage.setItem('vportfolio_timeline', JSON.stringify(timeline))
  }, [timeline])

  useEffect(() => {
    localStorage.setItem('vportfolio_projects_v3', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('vportfolio_resume', JSON.stringify(resume))
  }, [resume])

  useEffect(() => {
    localStorage.setItem('vportfolio_messages_live', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem('vportfolio_analytics_live', JSON.stringify(analytics))
  }, [analytics])

  // Track Page View
  const trackPageView = () => {
    setAnalytics(prev => ({
      ...prev,
      pageViews: (prev.pageViews || 0) + 1
    }))
  }

  // Track Resume Download
  const trackResumeDownload = (source = 'Direct') => {
    setAnalytics(prev => {
      const newLog = {
        id: Date.now(),
        date: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        location: 'Visitor (Web)',
        source: source,
      }
      const newActivity = {
        id: Date.now(),
        type: 'resume',
        text: `Resume downloaded from ${source}`,
        time: 'Just now',
      }
      return {
        ...prev,
        resumeDownloads: (prev.resumeDownloads || 0) + 1,
        resumeDownloadLogs: [newLog, ...(prev.resumeDownloadLogs || []).slice(0, 19)],
        recentActivity: [newActivity, ...(prev.recentActivity || []).slice(0, 9)],
      }
    })
  }

  // Global Resume Downloader with analytics tracking
  const downloadResume = (source = 'Website Button') => {
    trackResumeDownload(source)
    const link = document.createElement('a')
    link.href = resume.url || '/varun_Shrimal-Resume.pdf'
    link.download = resume.fileName || 'Varun_Shrimal_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Track Project View (when modal opens)
  const trackProjectView = (projectId, projectTitle) => {
    setAnalytics(prev => {
      const currentViews = prev.projectViews || {}
      const newViews = {
        ...currentViews,
        [projectId]: (currentViews[projectId] || 0) + 1,
      }
      const newActivity = {
        id: Date.now(),
        type: 'project',
        text: `Viewed project "${projectTitle || 'Project #' + projectId}"`,
        time: 'Just now',
      }
      return {
        ...prev,
        projectViews: newViews,
        recentActivity: [newActivity, ...(prev.recentActivity || []).slice(0, 9)],
      }
    })
  }

  // Track Project Click (GitHub or Live Demo)
  const trackProjectClick = (projectId, clickType, projectTitle) => {
    setAnalytics(prev => {
      const currentClicks = prev.projectClicks || {}
      const currentProjClicks = currentClicks[projectId] || { github: 0, liveDemo: 0 }
      const newClicks = {
        ...currentClicks,
        [projectId]: {
          ...currentProjClicks,
          [clickType]: (currentProjClicks[clickType] || 0) + 1,
        }
      }
      const newActivity = {
        id: Date.now(),
        type: 'click',
        text: `Clicked ${clickType === 'github' ? 'Source Code' : 'Live Demo'} for "${projectTitle || 'Project #' + projectId}"`,
        time: 'Just now',
      }
      return {
        ...prev,
        projectClicks: newClicks,
        recentActivity: [newActivity, ...(prev.recentActivity || []).slice(0, 9)],
      }
    })
  }

  // Reset Analytics
  const resetAnalytics = () => {
    setAnalytics({
      pageViews: 1,
      resumeDownloads: 0,
      resumeDownloadLogs: [],
      projectViews: {},
      projectClicks: {},
      recentActivity: [
        { id: Date.now(), type: 'system', text: 'Analytics metrics reset', time: 'Just now' }
      ]
    })
  }

  // Helper actions
  const addMessage = (msg) => {
    const newMsg = {
      id: Date.now(),
      ...msg,
      date: new Date().toLocaleString(),
      read: false,
    }
    setMessages((prev) => [newMsg, ...prev])
    setAnalytics(prev => ({
      ...prev,
      recentActivity: [
        { id: Date.now(), type: 'contact', text: `New inquiry from ${msg.name || 'Visitor'}`, time: 'Just now' },
        ...(prev.recentActivity || []).slice(0, 9)
      ]
    }))
  }

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const toggleMessageRead = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    )
  }

  const resetAllData = () => {
    setHero(DEFAULT_HERO)
    setAbout(DEFAULT_ABOUT)
    setStats(DEFAULT_STATS)
    setSkillCategories(DEFAULT_SKILL_CATEGORIES)
    setTimeline(DEFAULT_TIMELINE)
    setProjects(DEFAULT_PROJECTS)
    setResume(DEFAULT_RESUME)
    setMessages(DEFAULT_MESSAGES)
    setAnalytics(DEFAULT_ANALYTICS)
    localStorage.clear()
  }

  return (
    <PortfolioContext.Provider
      value={{
        hero,
        setHero,
        about,
        setAbout,
        stats,
        setStats,
        skillCategories,
        setSkillCategories,
        timeline,
        setTimeline,
        projects,
        setProjects,
        resume,
        setResume,
        downloadResume,
        analytics,
        setAnalytics,
        trackPageView,
        trackResumeDownload,
        trackProjectView,
        trackProjectClick,
        resetAnalytics,
        messages,
        setMessages,
        addMessage,
        deleteMessage,
        toggleMessageRead,
        resetAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
