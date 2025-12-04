'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollWineGlass() {
  const [fillPercentage, setFillPercentage] = useState(0)
  const glassRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateFill = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const percentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0
      setFillPercentage(Math.min(percentage, 100))
    }

    window.addEventListener('scroll', updateFill)
    updateFill()

    return () => window.removeEventListener('scroll', updateFill)
  }, [])

  return (
    <div
      ref={glassRef}
      className="scroll-wine-glass fixed right-6 bottom-6 z-50 hidden md:block"
      title={`${Math.round(fillPercentage)}% scrolled`}
    >
      <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
        {/* Glass outline */}
        <defs>
          <clipPath id="glassClip">
            <path d="M5 5 L35 5 L35 35 C35 45 30 50 20 55 C10 50 5 45 5 35 Z" />
          </clipPath>
          <linearGradient id="wineGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#631b23" />
            <stop offset="50%" stopColor="#722F37" />
            <stop offset="100%" stopColor="#c9632b" />
          </linearGradient>
          <filter id="glassGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Glass body */}
        <path
          d="M5 5 L35 5 L35 35 C35 45 30 50 20 55 C10 50 5 45 5 35 Z"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          filter="url(#glassGlow)"
        />
        
        {/* Wine fill */}
        <g clipPath="url(#glassClip)">
          <rect
            x="5"
            y={55 - (50 * fillPercentage / 100)}
            width="30"
            height={50 * fillPercentage / 100}
            fill="url(#wineGradient)"
            className="transition-all duration-300"
          />
          {/* Wine surface wave */}
          {fillPercentage > 5 && (
            <ellipse
              cx="20"
              cy={55 - (50 * fillPercentage / 100)}
              rx="15"
              ry="3"
              fill="rgba(201, 99, 43, 0.6)"
            />
          )}
        </g>
        
        {/* Stem */}
        <rect x="18" y="55" width="4" height="15" fill="rgba(255,255,255,0.2)" />
        
        {/* Base */}
        <ellipse cx="20" cy="75" rx="12" ry="3" fill="rgba(255,255,255,0.2)" />
        
        {/* Highlights */}
        <path
          d="M8 10 L8 30"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Percentage label */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs text-wine-cream/60 font-medium">
        {Math.round(fillPercentage)}%
      </div>
    </div>
  )
}
