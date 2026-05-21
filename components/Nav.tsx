'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cd-theme') : null
    const dark = saved === 'dark'
    setIsDark(dark)
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'

    gsap.from(navRef.current, {
      opacity: 0, y: -16, duration: 0.8, delay: 2.6, ease: 'power2.out',
    })
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('cd-theme', next ? 'dark' : 'light')
  }

  const fgHov = isDark ? '#f0ede8' : '#14120e'

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, right: 0, zIndex: 100,
        padding: '1.5rem 2rem',
      }}
    >
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.45rem',
          padding: '0.35rem 0.85rem',
          border: `1px solid ${fgHov}`,
          borderRadius: '20px',
          background: isDark ? 'rgba(242,240,235,0.08)' : 'rgba(14,12,10,0.07)',
          cursor: 'none',
          color: fgHov,
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          transition: 'background 0.2s, opacity 0.2s',
          opacity: 0.85,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
        <span>{isDark ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  )
}
