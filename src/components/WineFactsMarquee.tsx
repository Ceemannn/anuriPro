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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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

  const handleMouseEnter = (index: number) => {
    setIsPaused(true)
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setHoveredIndex(null)
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
          const isHovered = hoveredIndex === index
          
          return (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`
                relative flex-shrink-0 w-72 h-56 rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 ease-out
                ${isHovered ? 'scale-105 shadow-wine z-20' : 'scale-100'}
              `}
            >
              {/* Card background */}
              <div className={`
                absolute inset-0 glass
                transition-all duration-300
                ${isHovered ? 'bg-wine-primary/20' : ''}
              `} />
              
              {/* Front content (visible when not hovered) */}
              <div className={`
                absolute inset-0 flex flex-col items-center justify-center p-6 text-center
                transition-all duration-300
                ${isHovered ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}
              `}>
                <span className="text-5xl mb-4 transition-transform duration-300" style={{
                  transform: isHovered ? 'scale(1.2) rotate(12deg)' : 'scale(1) rotate(0deg)'
                }}>
                  {fact.icon}
                </span>
                <h3 className="font-serif text-xl text-wine-cream">{fact.front}</h3>
                <div className="mt-3 w-12 h-0.5 bg-wine-primary/50 rounded-full" />
              </div>
              
              {/* Back content (visible when hovered) */}
              <div className={`
                absolute inset-0 flex flex-col items-center justify-center p-6 text-center
                transition-all duration-300
                ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
              `}>
                <span className="text-3xl mb-3">{fact.icon}</span>
                <p className="text-wine-cream/90 leading-relaxed text-sm">{fact.back}</p>
              </div>

              {/* Hover glow effect */}
              <div className={`
                absolute inset-0 rounded-2xl pointer-events-none
                transition-opacity duration-300
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `} style={{
                boxShadow: 'inset 0 0 30px rgba(201, 99, 43, 0.3)'
              }} />

              {/* Corner accent */}
              <div className={`
                absolute top-3 right-3 w-2 h-2 rounded-full bg-wine-primary
                transition-all duration-300
                ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}
              `} />
            </div>
          )
        })}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-wine-cream/40 text-xs flex items-center gap-2">
          <span className="w-2 h-2 bg-wine-primary rounded-full animate-pulse" />
          Paused — hover to read
        </div>
      )}
    </div>
  )
}
