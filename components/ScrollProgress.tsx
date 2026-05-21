'use client'

import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const fill = document.getElementById('scroll-progress-fill')
    if (!fill) return

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      fill.style.width = pct + '%'
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div id="scroll-progress" aria-hidden="true">
      <div id="scroll-progress-fill" />
    </div>
  )
}
