import React from 'react'
import { useState } from 'react'
import Hero from './components/Hero'
import AboutMe from './components/AboutMeComplete'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactMe from './components/ContactMeBackend'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import NavigationMenu from './components/NavigationMenu'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <div>
      <NavigationMenu />
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <ContactMe />
      <ScrollToTop />
    </div>
  )
}

export default App
