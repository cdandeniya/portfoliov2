'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const bodyRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Chapter label slides in from left
      gsap.from(labelRef.current, {
        x: -20, opacity: 0,
        duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      })

      // Heading — clip-path reveal line by line
      const lines = headRef.current?.querySelectorAll('.line-mask')
      lines?.forEach((line, i) => {
        gsap.from((line as HTMLElement).children, {
          yPercent: 110,
          duration: 0.9,
          delay: i * 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 78%' },
        })
      })

      // Info card
      gsap.from(cardRef.current, {
        opacity: 0, y: 20,
        duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
      })

      // Body paragraphs — staggered clip-path reveal
      gsap.from(bodyRef.current!.querySelectorAll('.about-p'), {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 78%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 5rem)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* Chapter label */}
        <p ref={labelRef} style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--t3)',
          marginBottom: '3.5rem',
        }}>
          02 &nbsp;—&nbsp; About
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 7rem)',
          alignItems: 'start',
        }}>

          {/* Left — heading + card */}
          <div>
            <div ref={headRef} style={{ marginBottom: '2.5rem' }}>
              <div className="line-mask">
                <h2 style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.18,
                  letterSpacing: '0.005em',
                  color: 'var(--t1)',
                }}>
                  Simple on the surface.
                </h2>
              </div>
              <div className="line-mask">
                <h2 style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 1.18,
                  letterSpacing: '-0.02em',
                  color: 'var(--t1)',
                }}>
                  Deep in the build.
                </h2>
              </div>
            </div>

            {/* Info strip */}
            <div ref={cardRef} style={{
              padding: '1.5rem',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              background: 'var(--card-bg)',
            }}>
              {[
                ['University', 'Stony Brook University'],
                ['Major', 'CS & Applied Math / Statistics'],
                ['GPA', '3.7 / 4.0'],
                ['Graduation', 'May 2027'],
              ].map(([k, v], idx, arr) => (
                <div key={k} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '0.55rem 0',
                  borderBottom: idx < arr.length - 1 ? '1px solid var(--divider)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--t4)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--t2)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — body */}
          <div ref={bodyRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', paddingTop: '0.5rem' }}>
            <p className="about-p" style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
              lineHeight: 1.85,
              color: 'var(--t2)',
              fontWeight: 300,
            }}>
              Three years on Amazon&apos;s advertising billing infrastructure — distributed
              microservices, AWS-based deployments, payment systems at scale. I shipped
              real code on a 12-engineer team and learned what production actually means.
            </p>
            <p className="about-p" style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
              lineHeight: 1.85,
              color: 'var(--t2)',
              fontWeight: 300,
            }}>
              I spent two years running product delivery at{' '}
              <span style={{ color: 'var(--t1)', fontWeight: 400 }}>OuterLabs Studio</span>{' '}
              — specs, roadmaps, coordinating engineering end-to-end. That changed how I
              think about engineering: I care about the <em>why</em>, not just the how.
            </p>
            <p className="about-p" style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
              lineHeight: 1.85,
              color: 'var(--t2)',
              fontWeight: 300,
            }}>
              This summer I&apos;m at{' '}
              <span style={{ color: 'var(--t1)', fontWeight: 400 }}>Kroll</span>{' '}
              and building a real-time fraud detection pipeline from scratch — Kafka, Redis,
              PostgreSQL, Docker.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
