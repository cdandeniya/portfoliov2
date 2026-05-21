'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on pointer devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mx = -100, my = -100   // actual mouse
    let rx = -100, ry = -100   // ring (lagging)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    // Hover state: scale the ring when over interactive elements
    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    let animId: number
    const loop = () => {
      animId = requestAnimationFrame(loop)

      // Dot follows immediately
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`

      // Ring lerps behind
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
