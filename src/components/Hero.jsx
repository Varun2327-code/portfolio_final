import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import styles from './Hero.module.css'

const ROLES = [
  'FULL STACK DEVELOPER',
  'CYBERSECURITY SPECIALIST',
  'MERN STACK ARCHITECT',
  'VAPT & SECURITY RESEARCHER',
  'ELITE WEB & AI BUILDER',
]

const Hero = () => {
  const { hero, downloadResume } = usePortfolio()
  const sectionRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Role cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  // 3D Tilt calculation
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({
      x: (y / (rect.height / 2)) * -8,
      y: (x / (rect.width / 2)) * 10,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResumeDownload = () => {
    downloadResume('Hero Section')
  }

  // Animation variants
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero section"
    >
      {/* Background Cyber Ambient Lights */}
      <div className={styles.bgGlow1} aria-hidden="true" />
      <div className={styles.bgGlow2} aria-hidden="true" />
      <div className={styles.cyberGrid} aria-hidden="true" />

      {/* Floating Animated Particles */}
      <div className={styles.particlesContainer} aria-hidden="true">
        <span className={`${styles.particle} ${styles.p1}`}>&lt;dev /&gt;</span>
        <span className={`${styles.particle} ${styles.p2}`}>JWT.verify()</span>
        <span className={`${styles.particle} ${styles.p3}`}>01001010</span>
        <span className={`${styles.particle} ${styles.p4}`}>OWASP Top 10</span>
        <span className={`${styles.particle} ${styles.p5}`}>sha256()</span>
      </div>

      <motion.div className={styles.container} style={{ opacity }}>
        {/* Left: Content */}
        <motion.div
          className={styles.content}
          style={{ y: contentY }}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Dynamic Animated Role Badge */}
          <motion.div variants={fadeUp} className={styles.label}>
            <span className={styles.statusPulseDot} />
            <div className={styles.roleCarousel}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={styles.labelTag}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Intro */}
          <motion.p variants={fadeUp} className={styles.intro}>
            {hero.intro || "Hi, I'm"}
          </motion.p>

          {/* Name with dynamic shimmer */}
          <motion.h1 variants={fadeUp} className={styles.name}>
            <span className={styles.nameFirst}>{hero.firstName || 'VARUN'} </span>
            <span className={styles.nameLast}>{hero.lastName || 'SHRIMAL'}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className={styles.subtitle}>
            {hero.subtitle || 'I build fast, scalable and secure web applications with clean code and great user experience.'}
          </motion.p>

          {/* CTA Buttons with hover glow */}
          <motion.div variants={fadeUp} className={styles.buttons}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollTo('projects')}
              data-cursor="hover"
            >
              <span className={styles.btnShimmer} />
              VIEW MY WORK
              <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              className={styles.btnOutline}
              onClick={handleResumeDownload}
              data-cursor="hover"
            >
              DOWNLOAD RESUME
              <svg className={styles.btnDownloadIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>

            <button
              className={styles.btnGhost}
              onClick={() => scrollTo('contact')}
              data-cursor="hover"
            >
              CONTACT ME
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeIn} className={styles.socials}>
            <a
              href={hero.githubUrl || 'https://github.com/Varun2327-code'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub profile"
              data-cursor="external"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href={hero.linkedinUrl || 'https://www.linkedin.com/in/varun-shrimal-203705283'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn profile"
              data-cursor="external"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${hero.email || 'varunshrimal27@gmail.com'}`}
              className={styles.socialLink}
              aria-label="Send email"
              data-cursor="hover"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3D Interactive Portrait & Tech Badges */}
        <motion.div
          className={styles.portrait}
          style={{
            y: portraitY,
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          {/* Animated 3D Cyber Orbit Rings */}
          <div className={styles.orbit1} aria-hidden="true" />
          <div className={styles.orbit2} aria-hidden="true" />
          <div className={styles.orbitGlowShield} aria-hidden="true" />

          {/* Photo Card Frame with Ambient Border Glow */}
          <div className={styles.photoWrapper}>
            <div className={styles.cornerBracketTL} />
            <div className={styles.cornerBracketBR} />
            <img
              src={hero.heroImage || '/hero-cinematic.jpg'}
              alt="Varun Shrimal — Full Stack Developer & Cybersecurity Specialist"
              className={styles.photo}
              loading="eager"
            />
            <div className={styles.photoOverlay} aria-hidden="true" />
            <div className={styles.scanlineSweep} aria-hidden="true" />
          </div>

          {/* Live Status Badge with Radar Pulse */}
          {hero.availableForWork !== false && (
            <div className={styles.statusBadge} aria-label="Currently available for opportunities">
              <span className={styles.radarPulse}>
                <span className={styles.radarRing} />
                <span className={styles.statusDot} />
              </span>
              <span>Available for opportunities</span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator with animated pulse */}
      <motion.button
        className={styles.scrollIndicator}
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to About section"
      >
        <span className={styles.scrollText}>EXPLORE</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </motion.button>
    </section>
  )
}

export default Hero
