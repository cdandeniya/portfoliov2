'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef     = useRef<HTMLParagraphElement>(null)
  const line1Ref   = useRef<HTMLDivElement>(null)
  const line2Ref   = useRef<HTMLDivElement>(null)
  const ruleRef    = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Entrance timeline (fires after preloader) ──────────────
      const tl = gsap.timeline({ delay: 2.5 })

      tl.from(tagRef.current, {
        opacity: 0, x: -16,
        duration: 0.6, ease: 'power2.out',
      })

      tl.from(line1Ref.current!.querySelectorAll('.char'), {
        yPercent: 115, opacity: 0,
        stagger: { amount: 0.45 },
        duration: 0.9, ease: 'power4.out',
      }, '-=0.2')

      tl.from(line2Ref.current!.querySelectorAll('.char'), {
        yPercent: 115, opacity: 0,
        stagger: { amount: 0.5 },
        duration: 0.9, ease: 'power4.out',
      }, '-=0.7')

      // Thin rule draws in left→right
      tl.from(ruleRef.current, {
        scaleX: 0, transformOrigin: 'left center',
        duration: 0.8, ease: 'power3.inOut',
      }, '-=0.3')

      tl.from([subRef.current, scrollRef.current], {
        opacity: 0, y: 14,
        stagger: 0.1,
        duration: 0.7, ease: 'power2.out',
      }, '-=0.4')

      // ── Scroll parallax — hero content drifts up slowly ────────
      gsap.to(sectionRef.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Chapter label */}
      <p
        ref={tagRef}
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--t3)',
          marginBottom: '3rem',
        }}
      >
        01 &nbsp;—&nbsp; Introduction
      </p>

      {/* Name line 1 */}
      <div className="line-mask" ref={line1Ref} style={{ marginBottom: '0.08em' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(4.5rem, 14vw, 13rem)',
          fontWeight: 700,
          lineHeight: 0.92,
          color: 'var(--t1)',
          letterSpacing: '-0.02em',
        }}>
          <SplitChars text="Chanul" />
        </h1>
      </div>

      {/* Name line 2 */}
      <div className="line-mask" ref={line2Ref} style={{ marginBottom: '2.8rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(4.5rem, 14vw, 13rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 0.92,
          color: 'var(--t3)',
          letterSpacing: '0.01em',
        }}>
          <SplitChars text="Dandeniya" />
        </h1>
      </div>

      {/* Decorative rule */}
      <div
        ref={ruleRef}
        style={{
          width: '48px',
          height: '1px',
          background: 'var(--t3)',
          marginBottom: '2.2rem',
        }}
      />

      {/* Subtitle */}
      <div ref={subRef} style={{ marginBottom: '5rem' }}>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--t3)',
        }}>
          Software Engineer
          <span style={{ margin: '0 0.9em', color: 'var(--t4)' }}>/</span>
          Infrastructure
          <span style={{ margin: '0 0.9em', color: 'var(--t4)' }}>/</span>
          Product
          <span style={{ margin: '0 0.9em', color: 'var(--t4)' }}>/</span>
          <span style={{ color: 'var(--t4)' }}>CS&nbsp;&apos;27</span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--t4)',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: `linear-gradient(to bottom, var(--t3), transparent)`,
          animation: 'pulse-line 2s ease-in-out infinite',
        }} />
        <style>{`
          @keyframes pulse-line {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50%       { opacity: 0.8; transform: scaleY(1.2); }
          }
        `}</style>
      </div>
    </section>
  )
}
