import React, { useState, useEffect, lazy, Suspense } from 'react'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import NavigationMenu from './components/NavigationMenu'
import ScrollRail from './components/ScrollRail'
import Hero from './components/Hero'
import AboutMe from './components/AboutMeComplete'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import SecurityTerminal from './components/SecurityTerminal'
import ContactMe from './components/ContactMeUpdated'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SEO from './components/SEO'
import './App.css'

const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminPanel = lazy(() => import('./admin/AdminPanel'))

function PortfolioApp() {
  const { trackPageView } = usePortfolio()
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [isAdminRoute, setIsAdminRoute] = useState(false)
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('shrimal_admin_auth') === 'true'
  })

  // Track page visit on mount
  useEffect(() => {
    trackPageView()
  }, [])

  // Check URL route for /shrimal or #shrimal
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      const isShrimal = path.includes('shrimal') || hash.includes('shrimal') || path.includes('admin')
      setIsAdminRoute(isShrimal)
      if (isShrimal) {
        setLoading(false)
      }
    }

    checkRoute()
    window.addEventListener('popstate', checkRoute)
    window.addEventListener('hashchange', checkRoute)
    return () => {
      window.removeEventListener('popstate', checkRoute)
      window.removeEventListener('hashchange', checkRoute)
    }
  }, [])

  // Theme initialization — respect system preference on first visit
  useEffect(() => {
    const saved = localStorage.getItem('vportfolio-theme')
    if (saved) {
      const isDark = saved === 'dark'
      setDarkMode(isDark)
      document.documentElement.setAttribute('data-theme', saved)
      document.body.setAttribute('data-theme', saved)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = prefersDark ? 'dark' : 'light'
      setDarkMode(prefersDark)
      document.documentElement.setAttribute('data-theme', theme)
      document.body.setAttribute('data-theme', theme)
    }
  }, [])

  const handleToggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev
      const theme = next ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      document.body.setAttribute('data-theme', theme)
      localStorage.setItem('vportfolio-theme', theme)
      return next
    })
  }

  const handleLoadComplete = () => {
    setLoading(false)
  }

  const handleAdminLogin = () => {
    sessionStorage.setItem('shrimal_admin_auth', 'true')
    setIsAdminAuth(true)
  }

  const handleAdminLogout = () => {
    sessionStorage.removeItem('shrimal_admin_auth')
    setIsAdminAuth(false)
  }

  const handleGoToLiveSite = () => {
    window.history.pushState({}, '', '/')
    setIsAdminRoute(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // If user requested /shrimal admin panel
  if (isAdminRoute) {
    if (!isAdminAuth) {
      return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050A14' }} />}>
          <AdminLogin
            onLoginSuccess={handleAdminLogin}
            onGoBack={handleGoToLiveSite}
          />
        </Suspense>
      )
    }
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050A14' }} />}>
        <AdminPanel
          onGoToLiveSite={handleGoToLiveSite}
          onLogout={handleAdminLogout}
        />
      </Suspense>
    )
  }

  return (
    <div className="app">
      {/* Non-blocking Preloader Overlay */}
      {loading && <Preloader onComplete={handleLoadComplete} />}

      {/* SEO Engine */}
      <SEO />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Left scroll navigation rail — desktop only */}
      <ScrollRail />

      {/* Top navigation */}
      <NavigationMenu darkMode={darkMode} onToggleTheme={handleToggleTheme} />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. About */}
        <AboutMe />

        {/* 3. Stats */}
        <Stats />

        {/* 4. Skills */}
        <Skills />

        {/* 5. Education & Experience */}
        <Timeline />

        {/* 6. Featured Projects */}
        <Projects />

        {/* 7. Cybersecurity Focus */}
        <SecurityTerminal />

        {/* 8. Contact */}
        <ContactMe />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
      <ScrollToTop />
    </div>
  )
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  )
}

export default App
