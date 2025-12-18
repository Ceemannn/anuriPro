'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Bubble {
  id: number
  x: number
  size: number
  delay: number
  duration: number
}

export default function WineBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const bubbleEls: HTMLDivElement[] = []

    const bubbles: Bubble[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 15 + 5,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6,
    }))

    bubbles.forEach(bubble => {
      const el = document.createElement('div')
      el.className = 'wine-bubble'
      el.style.cssText = `
        left: ${bubble.x}%;
        width: ${bubble.size}px;
        height: ${bubble.size}px;
        bottom: -${bubble.size}px;
      `
      container.appendChild(el)
      bubbleEls.push(el)

      gsap.to(el, {
        y: -window.innerHeight - bubble.size * 2,
        xPercent: Math.sin(bubble.id) * 50,
        opacity: 0,
        duration: bubble.duration,
        delay: bubble.delay,
        repeat: -1,
        ease: 'none',
        onRepeat: () => {
          gsap.set(el, {
            xPercent: 0,
            y: 0,
            opacity: 0.5,
            left: `${Math.random() * 100}%`,
          })
        },
      })
    })

    // Parallax effect on mouse move
    const parallaxSetters = bubbleEls.map((bubble, i) => {
      const speed = (i % 3 + 1) * 0.02
      return {
        speed,
        setX: gsap.quickTo(bubble, 'x', {
          duration: 0.5,
          ease: 'power2.out',
        }),
      }
    })

    let rafId = 0
    let latestDeltaX = 0

    const applyParallax = () => {
      rafId = 0
      for (const { speed, setX } of parallaxSetters) {
        setX(latestDeltaX * speed)
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      latestDeltaX = e.clientX - window.innerWidth / 2
      if (!rafId) rafId = window.requestAnimationFrame(applyParallax)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (rafId) window.cancelAnimationFrame(rafId)
      gsap.killTweensOf(bubbleEls)
      container.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  )
}
