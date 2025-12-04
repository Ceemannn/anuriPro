'use client'

import { useState, useEffect, ReactNode } from 'react'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  autoFlip?: boolean
  autoFlipInterval?: number
}

export default function FlipCard({ 
  front, 
  back, 
  autoFlip = false, 
  autoFlipInterval = 5000 
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (!autoFlip) return

    const interval = setInterval(() => {
      setIsFlipped(prev => !prev)
    }, autoFlipInterval)

    return () => clearInterval(interval)
  }, [autoFlip, autoFlipInterval])

  return (
    <div 
      className="flip-card h-48 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`} style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        {/* Front */}
        <div className="flip-card-front glass flex items-center justify-center">
          {front}
        </div>
        
        {/* Back */}
        <div className="flip-card-back glass-light flex items-center justify-center">
          {back}
        </div>
      </div>
    </div>
  )
}
