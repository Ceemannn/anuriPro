'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const setX = gsap.quickSetter(cursor, 'x', 'px')
    const setY = gsap.quickSetter(cursor, 'y', 'px')
    let rafId = 0
    let latestX = 0
    let latestY = 0

    const applyPos = () => {
      rafId = 0
      setX(latestX)
      setY(latestY)
    }

    const onPointerMove = (e: PointerEvent) => {
      latestX = e.clientX
      latestY = e.clientY
      if (!rafId) rafId = window.requestAnimationFrame(applyPos)
    }

    const onPointerDown = (e: PointerEvent) => {
      const newSplash = { id: Date.now(), x: e.clientX, y: e.clientY }
      setSplashes(prev => [...prev, newSplash])
      
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
      })

      setTimeout(() => {
        setSplashes(prev => prev.filter(s => s.id !== newSplash.id))
      }, 400)
    }

    const onPointerUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.1,
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed z-[9999] hidden md:block"
        style={{ left: 0, top: 0 }}
      >
        <svg width="10" height="15" viewBox="0 0 20 30" fill="none">
          <defs>
            <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9632b" />
              <stop offset="100%" stopColor="#631b23" />
            </linearGradient>
            <filter id="dropletGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M10 0C10 0 0 12 0 18C0 24.627 4.373 30 10 30C15.627 30 20 24.627 20 18C20 12 10 0 10 0Z"
            fill="url(#dropletGradient)"
            filter="url(#dropletGlow)"
          />
          <ellipse cx="7" cy="12" rx="2" ry="3" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>
      
      {splashes.map(splash => (
        <div
          key={splash.id}
          className="cursor-splash"
          style={{ left: splash.x, top: splash.y }}
        />
      ))}
    </>
  )
}
