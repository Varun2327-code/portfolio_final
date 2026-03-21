import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";

const skillCategories = [
  {
    title: "Full Stack Development",
    icon: "💻",
    skills: [
      { name: "React.js", level: 85, icon: "⚛️" },
      { name: "Node.js", level: 80, icon: "🟩" },
      { name: "Express.js", level: 78, icon: "🚀" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "Redis", level: 65, icon: "🔴" },
      { name: "REST APIs", level: 85, icon: "🔗" },
      { name: "Tailwind CSS", level: 80, icon: "🎨" },
      { name: "Material UI", level: 75, icon: "📦" }
    ]
  },
  {
    title: "Web Security",
    icon: "🔐",
    skills: [
      { name: "JWT Authentication", level: 80, icon: "🔑" },
      { name: "OAuth 2.0", level: 70, icon: "🛡️" },
      { name: "RBAC", level: 75, icon: "👥" },
      { name: "OWASP Top 10", level: 65, icon: "⚠️" },
      { name: "Penetration Testing", level: 60, icon: "🧪" },
      { name: "VAPT", level: 60, icon: "🔍" },
      { name: "SQL Injection Prevention", level: 75, icon: "💉" }
    ]
  },
  {
    title: "Programming Languages",
    icon: "🧠",
    skills: [
      { name: "JavaScript", level: 85, icon: "🟨" },
      { name: "Python", level: 70, icon: "🐍" },
      { name: "SQL", level: 80, icon: "🗄️" },
      { name: "HTML5", level: 95, icon: "🌐" },
      { name: "CSS3", level: 90, icon: "🎨" },
      { name: "PHP", level: 60, icon: "🐘" }
    ]
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 90, icon: "🐙" },
      { name: "GitHub", level: 90, icon: "🐱" },
      { name: "Postman", level: 85, icon: "📬" },
      { name: "Linux", level: 80, icon: "🐧" },
      { name: "Firebase", level: 75, icon: "🔥" },
      { name: "MySQL", level: 80, icon: "🟦" },
      { name: "Vercel", level: 85, icon: "▲" },
      { name: "Netlify", level: 85, icon: "🌍" }
    ]
  }
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // run only once ✅
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.skills} id="skills">
      {/* Glow Effects */}
      <div className={styles.glowOrb} style={{ top: "15%", left: "25%" }} />
      <div className={styles.glowOrb} style={{ top: "40%", left: "75%" }} />
      <div className={styles.glowOrb} style={{ top: "70%", left: "35%" }} />

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        SKILLS
      </motion.h2>

      <div className={styles.skillsGrid}>
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            className={`${styles.skillCategory} ${styles["hover-glow"]}`}
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: categoryIndex * 0.2 }}
          >
            <h3>
              <span className={styles.skillIcon}>{category.icon}</span>
              {category.title}
            </h3>

            <div className={styles.skillList}>
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className={styles.skillItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: categoryIndex * 0.2 + skillIndex * 0.1,
                  }}
                >
                  <div className={styles.skillName}>
                    <span className={styles.skillIconSmall}>
                      {skill.icon}
                    </span>
                    {skill.name}
                  </div>

                  <div className={styles.skillProgress}>
                    <motion.div
                      className={styles.skillProgressBar}
                      initial={{ width: 0 }}
                      animate={
                        isVisible ? { width: `${skill.level}%` } : {}
                      }
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <span className={styles.skillLevel}>
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;