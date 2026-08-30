import React, { useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const SITE_URL = 'https://www.varunshrimal.me'
const DEFAULT_TITLE = 'Varun Shrimal | Full Stack Developer & Cybersecurity Portfolio'
const DEFAULT_DESC = 'Varun Shrimal is a Full Stack Developer & Cybersecurity Specialist building secure, high-performance web applications, MERN systems, and AI platforms.'
const DEFAULT_IMAGE = `${SITE_URL}/hero-cinematic.jpg`

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
}) => {
  const { hero, about, projects } = usePortfolio()

  useEffect(() => {
    // 1. Update Title
    const finalTitle = title || `${hero?.firstName || 'Varun'} ${hero?.lastName || 'Shrimal'} | Full Stack Developer & Cybersecurity Specialist`
    document.title = finalTitle

    // Helper to create or update meta tag by name or property
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attrName, attrValue)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Helper for link tags (canonical, etc.)
    const setLinkTag = (rel, href) => {
      if (!href) return
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    // 2. Standard Meta Tags
    const finalDesc = description || (about?.bio1 ? `${about.bio1} ${about.bio2 || ''}`.trim() : DEFAULT_DESC)
    setMetaTag('name', 'description', finalDesc)
    setMetaTag('name', 'keywords', 'Varun Shrimal, Full Stack Developer, Cybersecurity, MERN Stack, React Developer, Node.js, Python, Penetration Testing, VAPT, Web Security, Portfolio, Kiruvar Technology')
    setMetaTag('name', 'author', `${hero?.firstName || 'Varun'} ${hero?.lastName || 'Shrimal'}`)
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setLinkTag('canonical', url)

    // 3. Open Graph Tags
    setMetaTag('property', 'og:type', type)
    setMetaTag('property', 'og:title', finalTitle)
    setMetaTag('property', 'og:description', finalDesc)
    setMetaTag('property', 'og:image', image.startsWith('http') ? image : `${SITE_URL}${image}`)
    setMetaTag('property', 'og:url', url)
    setMetaTag('property', 'og:site_name', 'Varun Shrimal Portfolio')
    setMetaTag('property', 'og:locale', 'en_US')

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', finalTitle)
    setMetaTag('name', 'twitter:description', finalDesc)
    setMetaTag('name', 'twitter:image', image.startsWith('http') ? image : `${SITE_URL}${image}`)

    // 5. Schema.org JSON-LD Structured Data
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: `${hero?.firstName || 'Varun'} ${hero?.lastName || 'Shrimal'}`,
      givenName: hero?.firstName || 'Varun',
      familyName: hero?.lastName || 'Shrimal',
      url: SITE_URL,
      image: `${SITE_URL}${hero?.heroImage || '/hero-cinematic.jpg'}`,
      jobTitle: 'Full Stack Developer & Cybersecurity Specialist',
      worksFor: {
        '@type': 'Organization',
        name: 'Kiruvar Technology',
        url: 'https://kiruvartechnology.in/',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Parul University',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dungarpur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
      email: hero?.email || 'varunshrimal27@gmail.com',
      sameAs: [
        hero?.githubUrl || 'https://github.com/Varun2327-code',
        hero?.linkedinUrl || 'https://www.linkedin.com/in/varun-shrimal-203705283',
        'https://kiruvartechnology.in/',
      ],
      knowsAbout: [
        'React.js',
        'Next.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Cybersecurity',
        'Vulnerability Assessment and Penetration Testing (VAPT)',
        'OWASP Top 10',
        'Network Security',
        'Digital Forensics',
        'Python',
        'JavaScript',
        'TypeScript',
      ],
    }

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Varun Shrimal Portfolio',
      description: finalDesc,
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: 'en-US',
    }

    const projectItemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: "Varun Shrimal's Featured Projects",
      description: 'Collection of Full Stack Web, Cybersecurity, and Software Engineering projects.',
      numberOfItems: projects?.length || 0,
      itemListElement: (projects || []).map((proj, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: proj.title,
          description: proj.description,
          applicationCategory: proj.category === 'cybersecurity' ? 'SecurityApplication' : 'WebApplication',
          operatingSystem: 'Cross-platform',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          ...(proj.liveDemo ? { url: proj.liveDemo } : {}),
          ...(proj.github ? { codeRepository: proj.github } : {}),
        },
      })),
    }

    const structuredDataArray = [personSchema, websiteSchema, projectItemListSchema]

    // Inject or update JSON-LD script tag
    let scriptTag = document.getElementById('dynamic-json-ld')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'dynamic-json-ld'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredDataArray)

    return () => {
      // Optional cleanup if component unmounts
    }
  }, [title, description, image, url, type, hero, about, projects])

  return null
}

export default SEO
