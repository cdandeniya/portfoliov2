'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader() {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const countRef    = useRef<HTMLSpanElement>(null)
  const nameRef     = useRef<HTMLDivElement>(null)
  const barRef      = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!wrapRef.current || !countRef.current || !nameRef.current || !barRef.current) return

    // Prevent scroll while loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setDone(true)
      },
    })

    // 1 — Fade in name + bar
    tl.from(nameRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    })

    // 2 — Count 0 → 100 while bar fills
    const counter = { val: 0 }
    tl.to(
      counter,
      {
        val: 100,
        duration: 1.6,
        ease: 'power1.inOut',
        onUpdate() {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0')
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${counter.val / 100})`
          }
        },
      },
      '-=0.2'
    )

    // 3 — Brief pause at 100
    tl.to({}, { duration: 0.3 })

    // 4 — Slide the whole preloader up and out
    tl.to(wrapRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050508',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Name */}
      <div ref={nameRef} style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            color: '#f0ede8',
            letterSpacing: '0.05em',
            fontStyle: 'italic',
          }}
        >
          Chanul Dandeniya
        </p>
      </div>

      {/* Progress row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          width: 'clamp(200px, 30vw, 340px)',
        }}
      >
        {/* Bar */}
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(240,237,232,0.12)',
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              width: '100%',
              height: '100%',
              background: '#f0ede8',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Counter */}
        <span
          ref={countRef}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'rgba(240,237,232,0.5)',
            minWidth: '3ch',
            textAlign: 'right',
          }}
        >
          000
        </span>
      </div>
    </div>
  )
}
