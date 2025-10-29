import React, { useState, useEffect } from 'react'
import styles from './Skills.module.css'

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    skills: [
      { name: 'HTML', level: 95, icon: '🌐' },
      { name: 'CSS', level: 90, icon: '🎨' },
      { name: 'JavaScript', level: 80, icon: '🟨' },
      { name: 'React', level: 85, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 75, icon: '🔷' },
    ]
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 75, icon: '🟩' },
      { name: 'Python', level: 65, icon: '🐍' },
      { name: 'PHP', level: 55, icon: '🐘' },
      { name: 'MySQL', level: 80, icon: '🟦' },
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'Firebase', level: 75, icon: '🔥' }
    ]
  },
  {
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 90, icon: '🐙' },
      { name: 'Cybersecurity', level: 50, icon: '🔒' },
      { name: 'Linux', level: 80, icon: '🐧' },
      { name: 'Wireshark', level: 50, icon: '🔍' },
      { name: 'Nmap', level: 50, icon: '🗺️' }
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
        }, (categoryIndex * 200) + (skillIndex * 120))
      })
    })
  }

  return (
    <section className={styles.skills} id="skills">
      {/* Golden Glow Orbs */}
      <div className={styles.glowOrb} style={{ top: '15%', left: '25%' }} />
      <div className={styles.glowOrb} style={{ top: '40%', left: '75%' }} />
      <div className={styles.glowOrb} style={{ top: '70%', left: '35%' }} />

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
