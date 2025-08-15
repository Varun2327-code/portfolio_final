import React from 'react'
import { useState } from 'react'
import Hero from './components/Hero'
import AboutMeEnhanced from './components/AboutMeEnhanced'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactMe from './components/ContactMe'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import NavigationMenu from './components/NavigationMenu'
import './App.css'

function AppEnhanced() {
  // TODO: Add your component logic and return statement here
  return (
	<div>
	  {/* Add your components here */}
	  <Hero />
	  <AboutMeEnhanced />
	  <Projects />
	  <Skills />
	  <ContactMe />
	  <Preloader />
	  <ScrollToTop />
	  <NavigationMenu />
	</div>
  );
}

<list_files>
<path>src</path>
<recursive>true</recursive>
</list_files>
