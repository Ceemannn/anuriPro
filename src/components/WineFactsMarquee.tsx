'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'

interface WineFact {
  front: string
  back: string
  icon: ReactNode
}

interface WineFactsMarqueeProps {
  facts: WineFact[]
}

export default function WineFactsMarquee({ facts }: WineFactsMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  // Duplicate facts for seamless loop
  const duplicatedFacts = [...facts, ...facts, ...facts]

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    // Calculate the width of one set of cards
    const singleSetWidth = marquee.scrollWidth / 3

    // Create infinite scrolling animation
    animationRef.current = gsap.to(marquee, {
      x: -singleSetWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % singleSetWidth)
      }
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [])

  // Pause/Resume animation on hover state change
  useEffect(() => {
    if (!animationRef.current) return
    
    if (isPaused) {
      animationRef.current.pause()
    } else {
      animationRef.current.resume()
    }
  }, [isPaused])

  const handlePauseToggle = () => {
    setIsPaused(prev => !prev)
  }

  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-wine-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-wine-dark to-transparent z-10 pointer-events-none" />
      
      {/* Marquee track */}
      <div 
        ref={marqueeRef}
        className="flex gap-6"
        style={{ width: 'fit-content' }}
      >
        {duplicatedFacts.map((fact, index) => {
          return (
            <div
              key={index}
              onPointerDown={(e) => {
                e.preventDefault()
                handlePauseToggle()
              }}
              className={`
                relative flex-shrink-0 w-64 h-52 sm:w-72 sm:h-56 rounded-2xl overflow-hidden cursor-pointer
                select-none touch-manipulation
                transition-all duration-300 ease-out
                ${isPaused ? 'scale-105 shadow-wine z-20' : 'scale-100'}
              `}
            >
              {/* Card background */}
              <div className={`
                absolute inset-0 glass
                transition-all duration-300
                ${isPaused ? 'bg-wine-primary/20' : ''}
              `} />
              
              {/* Always-visible content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-5 text-center">
                <span className="mb-2 flex items-center justify-center [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-10 sm:[&_svg]:h-10">
                  {fact.icon}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-wine-cream">{fact.front}</h3>
                <div className="mt-2 mb-2 w-12 h-0.5 bg-wine-primary/50 rounded-full" />
                <p className="text-wine-cream/90 leading-snug text-xs sm:text-sm overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] sm:[-webkit-line-clamp:6] [-webkit-box-orient:vertical]">
                  {fact.back}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className={`
                absolute inset-0 rounded-2xl pointer-events-none
                transition-opacity duration-300
                ${isPaused ? 'opacity-100' : 'opacity-0'}
              `} style={{
                boxShadow: 'inset 0 0 30px rgba(201, 99, 43, 0.3)'
              }} />

              {/* Corner accent */}
              <div className={`
                absolute top-3 right-3 w-2 h-2 rounded-full bg-wine-primary
                transition-all duration-300
                ${isPaused ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}
              `} />
            </div>
          )
        })}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-wine-cream/40 text-xs flex items-center gap-2">
          <span className="w-2 h-2 bg-wine-primary rounded-full animate-pulse" />
          Paused — tap/click a card to resume
        </div>
      )}
    </div>
  )
}
