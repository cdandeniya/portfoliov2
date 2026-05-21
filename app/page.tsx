'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Work from '@/components/Work'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

// Three.js canvas must be client-only — no SSR
const WebGLCanvas = dynamic(() => import('@/components/WebGLCanvas'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      const { default: Lenis } = await import('lenis')

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time: number) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)

      // Expose lenis globally so WebGL canvas can read scroll
      ;(window as any).__lenis = lenis

      cleanup = () => {
        lenis.destroy()
        ;(window as any).__lenis = null
      }
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Loading screen */}
      <Preloader />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* 1px accent line that fills as you scroll */}
      <ScrollProgress />

      {/* Three.js painted background — fixed, behind everything */}
      <WebGLCanvas />

      {/* Minimal fixed navigation */}
      <Nav />

      <main>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>

      <footer className="relative z-10 py-10 flex items-center justify-center border-t border-white/5">
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(240,237,232,0.2)' }}
        >
          Chanul Dandeniya &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
