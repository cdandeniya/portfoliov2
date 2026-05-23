'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    index: '01',
    company: 'Amazon',
    role: 'Software Engineering Apprentice',
    period: '2021 — 2024',
    location: 'New York, NY',
    accent: '#f59e0b',
    bullets: [
      'Built distributed billing APIs on AWS (ECS, DynamoDB, S3), migrating legacy batch workflows to event-driven microservices with async retry logic and dead-letter queues.',
      'Instrumented structured logging, CloudWatch metrics, and distributed tracing — cutting incident investigation time by 25% and failed billing attempts by 4%.',
      'Implemented Blue/Green deployments in Amazon CodePipeline for zero-downtime releases; expanded test coverage 15% via JUnit/Mockito and Pytest suites.',
    ],
  },
  {
    index: '02',
    company: 'OuterLabs Studio',
    role: 'Lead Technical Product Manager',
    period: '2023 — 2025',
    location: 'Brooklyn, NY',
    accent: '#a78bfa',
    bullets: [
      'Drove end-to-end delivery for 5+ client software projects ($5K–$25K scope), owning requirements, roadmaps, and stakeholder communication through launch.',
      'Reduced rework by 20% by introducing user stories, acceptance criteria, and definition-of-done frameworks across engineering and design handoffs.',
    ],
  },
  {
    index: '03',
    company: 'Kroll',
    role: 'Software Engineering Intern · Release Engineering',
    period: '2026',
    location: 'New York, NY',
    accent: '#38bdf8',
    inProgress: true,
    bullets: [],
  },
  {
    index: '04',
    company: 'Saiera',
    role: 'Software Development Intern',
    period: '2025',
    location: 'Remote',
    accent: '#34d399',
    bullets: [
      'Built a GPT-4o-powered study assistant with RAG-based Q&A; engineered the document ingestion pipeline (S3, MongoDB, CloudConvert) processing 100+ files/day.',
    ],
  },
  {
    index: '05',
    company: 'Stony Brook Research Lab',
    role: 'Lead Undergraduate Researcher',
    period: '2025',
    location: 'Stony Brook, NY',
    accent: '#fb7185',
    bullets: [
      'Led research fine-tuning DeepSeek-R1 for blockchain and crypto applications using LoRA and Unsloth, and built the backend inference pipeline to serve the model via REST API.',
    ],
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Label slides from left
      gsap.from(labelRef.current, {
        x: -20, opacity: 0,
        duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      })

      // Heading clip-path reveal
      const lines = headRef.current?.querySelectorAll('.line-mask')
      lines?.forEach((line, i) => {
        gsap.from((line as HTMLElement).children, {
          yPercent: 110,
          duration: 0.85,
          delay: i * 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 82%' },
        })
      })

      // Rows — each clips in from top as it enters view
      const rows = listRef.current?.querySelectorAll('.work-row')
      rows?.forEach((row) => {
        gsap.from(row, {
          clipPath: 'inset(0 0 100% 0)',
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 87%' },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 5rem)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <p ref={labelRef} style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--t3)',
          marginBottom: '1rem',
        }}>
          03 &nbsp;—&nbsp; Experience
        </p>
        <div ref={headRef} style={{ marginBottom: '4rem' }}>
          <div className="line-mask">
            <h2 style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--t1)',
              lineHeight: 1.05,
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '0.005em',
            }}>
              Where I&apos;ve shipped.
            </h2>
          </div>
        </div>

        {/* Work list */}
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
          {experiences.map((exp) => (
            <WorkRow key={exp.index} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkRow({ exp }: { exp: typeof experiences[0] }) {
  const bulletsRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!bulletsRef.current || !open) return
    gsap.fromTo(bulletsRef.current,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.55, ease: 'power3.out' }
    )
  }, [open])

  return (
    <div
      className="work-row"
      style={{
        borderTop: '1px solid var(--divider)',
        cursor: exp.bullets.length > 0 ? 'pointer' : 'default',
        position: 'relative',
      }}
      onClick={() => exp.bullets.length > 0 && setOpen(!open)}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
        background: exp.accent,
        opacity: open ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Main row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr auto',
        gap: '1.5rem',
        alignItems: 'center',
        padding: '1.6rem 0',
        paddingLeft: open ? '1rem' : '0',
        transition: 'padding-left 0.3s',
      }}>

        {/* Index */}
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.2em',
          color: open ? exp.accent : 'var(--t4)',
          transition: 'color 0.3s',
        }}>
          {exp.index}
        </span>

        {/* Company + role */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              color: 'var(--t1)',
              fontWeight: 500,
              fontStyle: open ? 'italic' : 'normal',
              transition: 'font-style 0.2s',
            }}>
              {exp.company}
            </span>
            {exp.inProgress && (
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: '9px',
                padding: '0.2rem 0.6rem',
                border: `1px solid ${exp.accent}44`,
                color: exp.accent,
                borderRadius: '2px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                Now
              </span>
            )}
          </div>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: '0.78rem',
            color: 'var(--t3)',
            marginTop: '0.2rem', letterSpacing: '0.02em',
          }}>
            {exp.role} &nbsp;·&nbsp; {exp.location}
          </p>
        </div>

        {/* Period + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '0.78rem',
            color: 'var(--t4)', letterSpacing: '0.08em',
          }}>
            {exp.period}
          </span>
          {exp.bullets.length > 0 && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{
              stroke: open ? exp.accent : 'var(--t3)',
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), stroke 0.3s',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              flexShrink: 0,
            }}>
              <line x1="7" y1="1" x2="7" y2="13" strokeWidth="1" />
              <line x1="1" y1="7" x2="13" y2="7" strokeWidth="1" />
            </svg>
          )}
        </div>
      </div>

      {/* Expandable bullets */}
      {open && exp.bullets.length > 0 && (
        <div ref={bulletsRef} style={{ paddingLeft: 'calc(2.5rem + 1.5rem + 1rem)', paddingBottom: '2rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {exp.bullets.map((b, i) => (
              <li key={i} style={{
                display: 'flex', gap: '0.75rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.85rem', lineHeight: 1.7,
                color: 'var(--t2)', fontWeight: 300,
              }}>
                <span style={{
                  marginTop: '0.55em', width: '4px', height: '4px',
                  borderRadius: '50%', background: exp.accent, flexShrink: 0,
                }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
