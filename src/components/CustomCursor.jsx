import React, { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ring, setRing] = useState({ x: -100, y: -100 })
  const [state, setState] = useState('default') // default | hover | view | external
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on desktop pointer devices
    if (typeof window === 'undefined') return
    if (window.matchMedia('(max-width: 1024px)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let animId
    let mouseX = -100
    let mouseY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const onMouseEnter = () => setVisible(true)
    const onMouseLeave = () => setVisible(false)

    const lerp = () => {
      setRing((prev) => {
        const nx = prev.x + (mouseX - prev.x) * 0.15
        const ny = prev.y + (mouseY - prev.y) * 0.15
        return { x: nx, y: ny }
      })
      animId = requestAnimationFrame(lerp)
    }
    animId = requestAnimationFrame(lerp)

    const onMouseOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input, textarea, select')
      if (!el) {
        setState('default')
        return
      }
      const cursorType = el.getAttribute('data-cursor')
      if (cursorType === 'view') setState('view')
      else if (cursorType === 'external') setState('external')
      else setState('hover')
    }

    const onMouseOut = () => setState('default')

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(animId)
    }
  }, [visible])

  // Don't render on mobile / touch
  if (!visible) return null
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) return null
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Glow Dot */}
      <div
        className={`${styles.dot} ${styles[state]}`}
        style={{ transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)` }}
        aria-hidden="true"
      />
      {/* Outer Ring */}
      <div
        className={`${styles.ring} ${styles[`ring_${state}`]}`}
        style={{ transform: `translate3d(${ring.x - 20}px, ${ring.y - 20}px, 0)` }}
        aria-hidden="true"
      >
        {state === 'view' && <span className={styles.viewLabel}>VIEW</span>}
      </div>
    </>
  )
}

export default CustomCursor
