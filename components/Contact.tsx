'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        x: -20, opacity: 0,
        duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      })

      // Big heading — each line clips up
      const lines = headingRef.current?.querySelectorAll('.line-mask')
      lines?.forEach((line, i) => {
        gsap.from((line as HTMLElement).children, {
          yPercent: 110,
          duration: 1.0,
          delay: i * 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        })
      })

      gsap.from(contentRef.current, {
        opacity: 0, y: 24,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 82%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        <p ref={labelRef} style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--t3)',
          marginBottom: '3rem',
        }}>
          05 &nbsp;—&nbsp; Let&apos;s Connect
        </p>

        {/* Big heading */}
        <div ref={headingRef} style={{ marginBottom: '4rem' }}>
          <div className="line-mask">
            <h2 style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              color: 'var(--t1)',
              letterSpacing: '-0.02em',
            }}>
              Get in
            </h2>
          </div>
          <div className="line-mask">
            <h2 style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              color: 'var(--t3)',
              letterSpacing: '0.01em',
              fontStyle: 'italic',
            }}>
              touch.
            </h2>
          </div>
        </div>

        {/* Links row */}
        <div
          ref={contentRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--divider)',
          }}
        >
          {/* Email */}
          <div>
            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: '10px',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--t4)',
              marginBottom: '0.75rem',
            }}>
              Email
            </p>
            <a
              href="mailto:cdandeniya2@gmail.com"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                color: 'var(--t1)',
                textDecoration: 'none',
                fontStyle: 'italic',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--t2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--t1)')}
            >
              cdandeniya2@gmail.com
            </a>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            <SocialLink href="https://www.linkedin.com/in/cdandeniya/" label="LinkedIn" />
            <SocialLink href="https://github.com/cdandeniya" label="GitHub" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--t3)',
        textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        transition: 'color 0.25s',
        paddingBottom: '0.2rem',
        borderBottom: '1px solid var(--divider)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = 'var(--t1)'
        el.style.borderBottomColor = 'var(--t2)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = 'var(--t3)'
        el.style.borderBottomColor = 'var(--divider)'
      }}
    >
      {label} &nbsp;↗
    </a>
  )
}
