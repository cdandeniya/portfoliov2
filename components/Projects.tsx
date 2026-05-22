'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    index: '01',
    name: 'Fraud Detection Pipeline',
    status: 'building' as const,
    year: '2026',
    description:
      'Real-time transaction fraud detection. Transactions stream through a Kafka ingestion layer into a scoring service that pulls behavioral features from Redis and flags anomalies. Sub-50ms latency, horizontally scalable via consumer group partitioning.',
    tags: ['Java', 'Kafka', 'Redis', 'PostgreSQL', 'Docker'],
    accent: '#4d9fff',
    github: null,
  },
  {
    index: '02',
    name: 'Chiral Network',
    status: 'live' as const,
    year: '2024',
    description:
      'Decentralized BitTorrent-style file-sharing in Rust. DHT-based peer discovery, multi-source parallel chunk downloads, integrity verification. Validated in local swarms of 5–30 peers.',
    tags: ['Rust', 'TypeScript', 'Svelte', 'P2P', 'DHT'],
    accent: '#a78bfa',
    github: 'https://github.com/cdandeniya',
  },
  {
    index: '03',
    name: 'NovaTrade',
    status: 'live' as const,
    year: '2024',
    description:
      'Full-stack stock trading platform with role-based access, SQL injection prevention, and a Spring Boot REST API. 200+ simulated daily trades across 30+ seeded users.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'JSP'],
    accent: '#34d399',
    github: 'https://github.com/cdandeniya',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        x: -20, opacity: 0,
        duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      })

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

      const rows = listRef.current?.querySelectorAll('.proj-row')
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
      id="projects"
      ref={sectionRef}
      style={{ padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 5rem)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <p ref={labelRef} style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--t3)',
          marginBottom: '1rem',
        }}>
          04 &nbsp;—&nbsp; Build
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
              What I&apos;ve built.
            </h2>
          </div>
        </div>

        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p) => (
            <ProjectRow key={p.index} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ p }: { p: typeof projects[0] }) {
  const [open, setOpen] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!detailRef.current || !open) return
    gsap.fromTo(detailRef.current,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.55, ease: 'power3.out' }
    )
  }, [open])

  return (
    <div
      className="proj-row"
      style={{
        borderTop: '1px solid var(--divider)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
        background: p.accent,
        opacity: open ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Main row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr auto',
        gap: '1.5rem',
        alignItems: 'center',
        padding: '1.8rem 0',
        paddingLeft: open ? '1rem' : '0',
        transition: 'padding-left 0.3s',
      }}>

        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.2em',
          color: open ? p.accent : 'var(--t4)',
          transition: 'color 0.3s',
        }}>
          {p.index}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 500,
            fontStyle: open ? 'italic' : 'normal',
            color: 'var(--t1)',
            transition: 'font-style 0.2s',
            lineHeight: 1.1,
          }}>
            {p.name}
          </h3>
          {p.status === 'building' && (
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '8px', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.6rem',
              border: `1px solid ${p.accent}55`,
              color: p.accent,
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}>
              Building
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '0.78rem',
            color: 'var(--t4)', letterSpacing: '0.08em',
          }}>
            {p.year}
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{
            stroke: open ? p.accent : 'var(--t3)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), stroke 0.3s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}>
            <line x1="7" y1="1" x2="7" y2="13" strokeWidth="1" />
            <line x1="1" y1="7" x2="13" y2="7" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Detail */}
      {open && (
        <div ref={detailRef} style={{ paddingLeft: 'calc(2.5rem + 1.5rem + 1rem)', paddingBottom: '2rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.85rem', lineHeight: 1.85,
            color: 'var(--t2)', fontWeight: 300,
            maxWidth: '620px', marginBottom: '1.25rem',
          }}>
            {p.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: p.github ? '1.25rem' : 0 }}>
            {p.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-inter)', fontSize: '9px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.3rem 0.65rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                color: 'var(--t3)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: 'var(--font-inter)', fontSize: '10px',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--t3)',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                transition: 'color 0.2s',
                borderBottom: '1px solid var(--divider)',
                paddingBottom: '0.2rem',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'var(--t1)'
                el.style.borderBottomColor = 'var(--t3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'var(--t3)'
                el.style.borderBottomColor = 'var(--divider)'
              }}
            >
              GitHub &nbsp;↗
            </a>
          )}
          {!p.github && p.status === 'building' && (
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'var(--t4)', fontStyle: 'italic',
            }}>
              In progress — link coming
            </span>
          )}
        </div>
      )}
    </div>
  )
}
