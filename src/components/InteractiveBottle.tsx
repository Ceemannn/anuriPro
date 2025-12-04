'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function InteractiveBottle() {
  const [isPouring, setIsPouring] = useState(false)
  const [pourLevel, setPourLevel] = useState(0)
  const bottleRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPouring && streamRef.current) {
      // Animate pour stream
      gsap.fromTo(streamRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      
      // Increase pour level
      const interval = setInterval(() => {
        setPourLevel(prev => Math.min(prev + 5, 100))
      }, 100)

      return () => clearInterval(interval)
    } else if (streamRef.current) {
      gsap.to(streamRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [isPouring])

  const handleMouseEnter = () => {
    setIsPouring(true)
    if (bottleRef.current) {
      gsap.to(bottleRef.current, {
        rotation: -25,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseLeave = () => {
    setIsPouring(false)
    if (bottleRef.current) {
      gsap.to(bottleRef.current, {
        rotation: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }

  return (
    <div 
      className="relative w-32 h-80 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Wine Bottle */}
      <div ref={bottleRef} className="relative transform-gpu origin-bottom">
        <svg width="80" height="250" viewBox="0 0 80 250" fill="none" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="bottleBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a0a0d" />
              <stop offset="30%" stopColor="#2f2220" />
              <stop offset="70%" stopColor="#2f2220" />
              <stop offset="100%" stopColor="#1a0a0d" />
            </linearGradient>
            <linearGradient id="wineGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#631b23" />
              <stop offset="100%" stopColor="#c9632b" />
            </linearGradient>
            <linearGradient id="labelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c5b599" />
              <stop offset="100%" stopColor="#a89a7d" />
            </linearGradient>
          </defs>
          
          {/* Bottle body */}
          <path
            d="M25 50 L25 80 L15 100 L15 220 C15 235 30 245 40 245 C50 245 65 235 65 220 L65 100 L55 80 L55 50 Z"
            fill="url(#bottleBodyGradient)"
            stroke="#c9632b"
            strokeWidth="1"
          />
          
          {/* Wine inside - shows remaining wine */}
          <clipPath id="bottleClip">
            <path d="M17 102 L17 218 C17 232 31 243 40 243 C49 243 63 232 63 218 L63 102 Z" />
          </clipPath>
          <g clipPath="url(#bottleClip)">
            <rect
              x="17"
              y={243 - (141 * (100 - pourLevel) / 100)}
              width="46"
              height={141 * (100 - pourLevel) / 100}
              fill="url(#wineGradient)"
              className="transition-all duration-300"
            />
          </g>
          
          {/* Bottle neck */}
          <rect x="30" y="20" width="20" height="30" rx="2" fill="url(#bottleBodyGradient)" stroke="#c9632b" strokeWidth="1" />
          
          {/* Cork */}
          <rect x="32" y="5" width="16" height="18" rx="3" fill="#c5b599" />
          <rect x="32" y="5" width="16" height="5" rx="2" fill="#a89a7d" />
          
          {/* Label */}
          <rect x="20" y="120" width="40" height="60" rx="4" fill="url(#labelGradient)" opacity="0.9" />
          <text x="40" y="145" textAnchor="middle" fill="#2f2220" fontSize="8" fontFamily="serif" fontWeight="bold">
            Añuri
          </text>
          <text x="40" y="158" textAnchor="middle" fill="#2f2220" fontSize="5" fontFamily="serif">
            Premium Wine
          </text>
          <text x="40" y="168" textAnchor="middle" fill="#2f2220" fontSize="5" fontFamily="serif">
            Est. 2024
          </text>
          
          {/* Highlights */}
          <path
            d="M22 105 L22 200"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Foil cap */}
          <rect x="28" y="45" width="24" height="8" fill="#c9632b" />
        </svg>
      </div>

      {/* Pour stream */}
      <div
        ref={streamRef}
        className="absolute -left-6 top-12 w-2 h-40 origin-top"
        style={{
          background: 'linear-gradient(to bottom, #c9632b 0%, #631b23 100%)',
          borderRadius: '0 0 4px 4px',
          opacity: 0,
          transform: 'scaleY(0)',
        }}
      />

      {/* Splashing drops */}
      {isPouring && (
        <div className="absolute -left-10 bottom-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-wine-primary animate-bounce"
              style={{
                left: `${Math.random() * 20}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.5s'
              }}
            />
          ))}
        </div>
      )}

      {/* Hover hint */}
      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-wine-cream/50 text-xs whitespace-nowrap transition-opacity ${isPouring ? 'opacity-0' : 'opacity-100'}`}>
        Hover to pour
      </div>
    </div>
  )
}
