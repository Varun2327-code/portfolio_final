import React, { useEffect, useState, useRef } from 'react';
import styles from './AboutMeEnhanced.module.css';
import profilePhoto from '/varun2.png';

const AboutMeComplete = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if(sectionRef.current) observer.unobserve(sectionRef.current); }
  }, []);

  const handleDownloadResume = () => {
    setDownloadStatus('downloading');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/VARUN-SHRIMAL-RESUME.pdf';
      link.download = 'VARUN-SHRIMAL-RESUME.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStatus('completed');
      setTimeout(() => setDownloadStatus('idle'), 2000);
    }, 800);
  };

  const skills = {
    'Frontend': ['HTML', 'CSS', 'JavaScript', 'React','Tailwind CSS', 'Bootstrap'],
    'Backend': ['Node.js', 'Express.js', 'PHP', 'Python', 'RESTful APIs'],
    'Database': ['MySQL', 'MongoDB', 'Firebase', 'Firestore'],
    'Security': ['Cybersecurity' , 'Ethical Hacking', 'Network Security', 'Vulnerability Assessment', 'Penetration Testing'],
    'DevOps': ['Git', 'Linux', 'VS Code', 'XAMPP', 'Postman', 'Nodemon'],
    'Tools': ['VS Code', 'Postman', 'Nodemon', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'Kali Linux']
  };

  const timeline = [
    {
      date: '2023 - Present',
      title: 'Integrated MCA - Cyber Security',
      organization: 'Parul University',
      description: 'Pursuing advanced studies in Cyber Security and Forensics with focus on secure application development, Web development, and digital forensics.',
      icon: '🎓'
    },
    {
      date: '2021 - 2022',
      title: 'Higher Secondary Education',
      organization: 'Dungarpur Public School',
      description: 'Completed Higher Secondary education with a focus on Commerce stream, achieving strong academic results and developing foundational skills for further studies.',
      icon: '🎓'
      },
  ];

  const stats = [
    { number: '10+', label: 'Projects Completed', icon: '🚀' },
    { number: '3', label: 'Security Certifications', icon: '🛡️' },
    { number: '1', label: 'Vulnerabilities Found', icon: '🔍' },
    { number: 'FRESHER', label: 'Years Experience', icon: '⭐' }
  ];

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={styles.container}>
        <h2 className={`${styles.title} ${isVisible ? styles.fadeIn : ''}`}>
          About Me <span className={styles.underline}></span>
        </h2>

        <div className={`${styles.content} ${isVisible ? styles.fadeInUp : ''}`}>
          {/* Profile Section */}
          <div className={styles.profileSection}>
            <div className={styles.profileWrapper}>
              <img src={profilePhoto} alt="Varun Shrimal" className={styles.profileImage} loading="lazy" />
              <div className={styles.profileOverlay}></div>
              <div className={styles.profileInfo}>
                <h3>Varun Shrimal</h3>
                <p>Cyber Security Analyst & Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className={styles.bioSection}>
            <h3>Hello! I'm a passionate developer</h3>
            <p className={styles.bioText}>
              I'm currently pursuing Integrated MCA in Cyber Security and Forensics, specializing in building secure, scalable web applications.
            </p>
            <p className={styles.bioText}>
              I create solutions that work flawlessly and are secure against modern cyber threats. Outside coding, I explore vulnerabilities and contribute to open-source.
            </p>
            <div className={styles.ctaButtons}>
              <a href="#contact" className={styles.ctaButton}>Get In Touch</a>
              <button 
                onClick={handleDownloadResume}
                className={`${styles.ctaButton} ${styles.secondary}`}
                disabled={downloadStatus === 'downloading'}
              >
                {downloadStatus === 'idle' && 'Download Resume'}
                {downloadStatus === 'downloading' && 'Downloading...'}
                {downloadStatus === 'completed' && 'Downloaded!'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${styles.statsSection} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3>My Journey in Numbers</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <h4>{stat.number}</h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
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
                  {skillList.map((skill, idx) => <span key={idx} className={styles.skillTag}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className={`${styles.timelineSection} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3>Education & Experience Timeline</h3>
          <div className={styles.timeline}>
            {timeline.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>{item.icon}</div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineDate}>{item.date}</span>
                  <h4 className={styles.timelineTitle}>{item.title}</h4>
                  <p className={styles.timelineOrg}>{item.organization}</p>
                  <p className={styles.timelineDescription}>{item.description}</p>
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
