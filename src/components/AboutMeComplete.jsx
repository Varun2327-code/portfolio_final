import React, { useEffect, useState, useRef } from 'react';
import styles from './AboutMeEnhanced.module.css';
import profilePhoto from '../assets/profile-pic.png';

const AboutMeComplete = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDownloadResume = () => {
    setDownloadStatus('downloading');
    
    setTimeout(() => {
      setDownloadStatus('completed');
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Varun-Shrimal-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => setDownloadStatus('idle'), 2000);
    }, 1000);
  };

  const skills = {
    'Frontend': ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express.js', 'PHP', 'Python', 'REST APIs'],
    'Database': ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis'],
    'Security': ['Cybersecurity',],
    'DevOps': ['Git', 'Docker', 'AWS', 'Linux', 'CI/CD'],
    'Tools': ['VS Code', 'Postman', 'Nodemon']
  };

  const timeline = [
    {
      date: '2022 - Present',
      title: 'Integrated MCA - Cyber Security',
      organization: 'Parul University',
      description: 'Pursuing advanced studies in Cyber Security and Forensics with focus on secure application development, Web development, and digital forensics.',
      icon: '🎓'
    }
  ];

  const stats = [
    { number: '15+', label: 'Projects Completed', icon: '🚀' },
    { number: '3', label: 'Security Certifications', icon: '🛡️' },
    { number: '0', label: 'Vulnerabilities Found', icon: '🔍' },
    { number: 'FRESHER', label: 'Years Experience', icon: '⭐' }
  ];

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={styles.container}>
        <h2 className={`${styles.title} ${isVisible ? styles.fadeIn : ''}`}>
          About Me
          <span className={styles.underline}></span>
        </h2>
        
        <div className={`${styles.content} ${isVisible ? styles.fadeInUp : ''}`}>
          <div className={styles.profileSection}>
            <div className={styles.profileWrapper}>
              <img 
                src={profilePhoto} 
                alt="Varun Shrimal" 
                className={styles.profileImage}
                loading="lazy"
              />
              <div className={styles.profileOverlay}></div>
              <div className={styles.profileInfo}>
                <h3>Varun Shrimal</h3>
                <p>Cyber Security & Full Stack Developer</p>
              </div>
            </div>
          </div>
          
          <div className={styles.bioSection}>
            <h3>Hello! I'm a passionate developer</h3>
            <p className={styles.bioText}>
              I'm currently pursuing Integrated MCA in Cyber Security and Forensics, specializing in 
              building secure, scalable web applications. My expertise spans from frontend 
              development with React to backend systems with Node.js, all while implementing 
              robust security measures.
            </p>
            <p className={styles.bioText}>
              I believe in creating digital solutions that not only work flawlessly but are also 
              protected against modern cyber threats. When I'm not coding, you'll find me exploring 
              new security vulnerabilities or contributing to open-source projects.
            </p>
            <div className={styles.ctaButtons}>
              <a href="#contact" className={styles.ctaButton}>
                Get In Touch
              </a>
              <button 
                onClick={handleDownloadResume}
                className={`${styles.ctaButton} ${styles.secondary} ${styles.downloadButton}`}
                disabled={downloadStatus === 'downloading'}
              >
                {downloadStatus === 'idle' && 'Download Resume'}
                {downloadStatus === 'downloading' && 'Downloading...'}
                {downloadStatus === 'completed' && 'Downloaded!'}
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.statsSection} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3>My Journey in Numbers</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <h4>{stat.number}</h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.skillsSection} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3>Technical Skills</h3>
          <div className={styles.skillsGrid}>
            {Object.entries(skills).map(([category, skillList]) => (
              <div 
                key={category} 
                className={`${styles.skillCategory} ${activeSkill === category ? styles.active : ''}`}
                onMouseEnter={() => setActiveSkill(category)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <h4>{category}</h4>
                <div className={styles.skillList}>
                  {skillList.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.timelineSection} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3>Education & Experience Timeline</h3>
          <div className={styles.timeline}>
            {timeline.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>{item.icon}</div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineDate}>{item.date}</span>
                  <h4>{item.title}</h4>
                  <p className={styles.timelineOrg}>{item.organization}</p>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeComplete;
