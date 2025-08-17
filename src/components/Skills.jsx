import React, { useState, useEffect } from 'react'
import styles from './Skills.module.css'

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    skills: [
      { name: 'HTML', level: 95, icon: '🌐' },
      { name: 'CSS', level: 90, icon: '🎨' },
      { name: 'JavaScript', level: 70, icon: '🟨' },
      { name: 'React', level: 80, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 70, icon: '🔷' },
    ]
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 75, icon: '🟩' },
      { name: 'Python', level: 60, icon: '🐍' },
      { name: 'PHP', level: 50, icon: '🐘' },
      { name: 'MySQL', level: 80, icon: '🟦' },
      { name: 'MongoDB', level: 78, icon: '🍃' }
    ]
  },
  {
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 90, icon: '🐙' },
      { name: 'AWS', level: 70, icon: '☁️' },
      { name: 'Cybersecurity', level: 45, icon: '🔒' },
      { name: 'Linux', level: 50, icon: '🐧' }
    ]
  }
]

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            animateSkills()
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('skills')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const animateSkills = () => {
    skillCategories.forEach((category, categoryIndex) => {
      category.skills.forEach((skill, skillIndex) => {
        setTimeout(() => {
          setVisibleSkills(prev => [...prev, `${categoryIndex}-${skillIndex}`])
        }, (categoryIndex * 200) + (skillIndex * 100))
      })
    })
  }

  const SkillProgressRing = ({ percentage, icon }) => {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

    return (
      <div className={styles.progressRing}>
        <svg viewBox="0 0 120 120">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
          <circle
            className={styles.progressRingBg}
            cx="60"
            cy="60"
            r={radius}
          />
          <circle
            className={styles.progressRingFill}
            cx="60"
            cy="60"
            r={radius}
            strokeDasharray={strokeDasharray}
          />
        </svg>
        <div className={styles.progressRingText}>{icon}</div>
      </div>
    )
  }

  return (
    <section className={styles.skills} id="skills">
      <h2 className={`${isVisible ? styles['fade-in'] : ''}`}>SKILLS</h2>
      
      <div className={styles.skillsGrid}>
        {skillCategories.map((category, categoryIndex) => (
          <div 
            key={categoryIndex} 
            className={`${styles.skillCategory} ${isVisible ? styles['slide-in-left'] : ''} ${styles['hover-glow']}`}
            style={{ animationDelay: `${categoryIndex * 0.2}s` }}
          >
            <h3>
              <span className={styles.skillIcon}>{category.icon}</span>
              {category.title}
            </h3>
            
            <div className={styles.skillList}>
              {category.skills.map((skill, skillIndex) => {
                const key = `${categoryIndex}-${skillIndex}`
                const isSkillVisible = visibleSkills.includes(key)
                
                return (
                  <div 
                    key={skillIndex} 
                    className={`${styles.skillItem} ${isSkillVisible ? styles['fade-in'] : ''}`}
                  >
                    <div className={styles.skillName}>
                      <span className={styles.skillIconSmall}>{skill.icon}</span>
                      {skill.name}
                    </div>
                    
                    <div className={styles.skillProgress}>
                      <div 
                        className={styles.skillProgressBar}
                        style={{ 
                          width: isSkillVisible ? `${skill.level}%` : '0%',
                          transition: 'width 1s ease-in-out'
                        }}
                      />
                    </div>
                    
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      
    </section>
  )
}

export default Skills
