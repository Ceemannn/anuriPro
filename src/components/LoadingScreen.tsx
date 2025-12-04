'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Hide loader after animation completes
    const timer = setTimeout(() => {
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => setIsLoading(false),
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-wine-dark">
      {/* Wine bottle pouring animation */}
      <div className="relative mb-8">
        <svg width="120" height="200" viewBox="0 0 120 200" className="animate-pulse">
          <defs>
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2f2220" />
              <stop offset="100%" stopColor="#1a0a0d" />
            </linearGradient>
            <linearGradient id="wineLoadGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#631b23" />
              <stop offset="100%" stopColor="#c9632b" />
            </linearGradient>
          </defs>
          
          {/* Bottle body */}
          <path
            d="M40 30 L40 60 L30 80 L30 170 C30 185 45 195 60 195 C75 195 90 185 90 170 L90 80 L80 60 L80 30 Z"
            fill="url(#bottleGradient)"
            stroke="#c9632b"
            strokeWidth="2"
          />
          
          {/* Wine level in bottle */}
          <clipPath id="bottleClip">
            <path d="M32 82 L32 170 C32 183 47 193 60 193 C73 193 88 183 88 170 L88 82 Z" />
          </clipPath>
          <g clipPath="url(#bottleClip)">
            <rect
              x="32"
              y={193 - (111 * Math.min(progress, 100) / 100)}
              width="56"
              height={111 * Math.min(progress, 100) / 100}
              fill="url(#wineLoadGradient)"
              className="transition-all duration-300"
            />
          </g>
          
          {/* Bottle neck */}
          <rect x="45" y="5" width="30" height="25" fill="url(#bottleGradient)" stroke="#c9632b" strokeWidth="2" />
          
          {/* Cork */}
          <rect x="48" y="0" width="24" height="10" rx="2" fill="#c5b599" />
          
          {/* Label */}
          <rect x="38" y="100" width="44" height="50" rx="4" fill="rgba(197, 181, 153, 0.2)" />
          <text x="60" y="128" textAnchor="middle" fill="#c5b599" fontSize="10" fontFamily="serif">
            Añuri
          </text>
        </svg>
        
        {/* Pouring wine stream */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-wine-primary to-transparent rounded-full"
          style={{
            height: `${Math.min(progress, 100)}px`,
            opacity: progress < 100 ? 1 : 0,
            transition: 'all 0.3s ease',
          }}
        />
      </div>
      
      {/* Brand name */}
      <h1 className="font-serif text-4xl text-wine-cream mb-4 tracking-wider">
        Añuri
      </h1>
      
      {/* Loading bar */}
      <div className="w-48 h-1 bg-wine-accent/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-wine-secondary to-wine-primary rounded-full transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-wine-cream/60 text-sm tracking-widest uppercase">
        Pouring excellence...
      </p>
    </div>
  )
}
