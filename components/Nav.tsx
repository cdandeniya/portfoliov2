'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const chapters = [
  { id: 'hero',     label: '01' },
  { id: 'about',    label: '02' },
  { id: 'work',     label: '03' },
  { id: 'projects', label: '04' },
  { id: 'contact',  label: '05' },
]

gsap.registerPlugin(ScrollTrigger)

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
  const [active,   setActive]  = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [isDark,   setIsDark]  = useState(false)

  useEffect(() => {
    // Restore persisted theme
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cd-theme') : null
    const dark  = saved === 'dark'   // default: light mode
    setIsDark(dark)
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'

    // Animate in after preloader
    gsap.from(navRef.current, {
      opacity: 0, y: -16, duration: 0.8, delay: 2.6, ease: 'power2.out',
    })

    // Backdrop on scroll
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    // Chapter indicator
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => { if (self.isActive) setActive(id) },
      })
    })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('cd-theme', next ? 'dark' : 'light')
  }

  const activeChapter = chapters.find(c => c.id === active)

  // Colors flip per theme
  const fg    = isDark ? 'rgba(240,237,232,0.45)' : 'rgba(20,18,14,0.45)'
  const fgHov = isDark ? '#f0ede8'                : '#14120e'
  const navBg = scrolled
    ? isDark ? 'rgba(5,5,8,0.72)' : 'rgba(245,240,232,0.72)'
    : 'transparent'

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.4s',
        background: navBg,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '1.1rem',
          color: isDark ? '#f0ede8' : '#14120e',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          fontStyle: 'italic',
          opacity: 0.9,
          transition: 'color 0.4s',
        }}
      >
        cd
      </a>

      {/* Chapter indicator */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-inter)', fontSize: '10px',
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: isDark ? 'rgba(240,237,232,0.3)' : 'rgba(20,18,14,0.3)',
        transition: 'color 0.4s',
      }}>
        {activeChapter?.label}&nbsp;<span style={{ margin: '0 0.5em' }}>—</span>&nbsp;
        <span style={{ textTransform: 'capitalize' }}>{active}</span>
      </div>

      {/* Right — social + theme toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/cdandeniya/"
          target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          style={{ color: fg, transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = fgHov)}
          onMouseLeave={e => (e.currentTarget.style.color = fg)}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/cdandeniya"
          target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          style={{ color: fg, transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = fgHov)}
          onMouseLeave={e => (e.currentTarget.style.color = fg)}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        {/* Theme toggle — pill */}
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
      </div>
    </nav>
  )
}
