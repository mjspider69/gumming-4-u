
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface HiddenImageRevealProps {
  children: React.ReactNode
  hiddenImageSrc: string
  hiddenImageAlt: string
  triggerWord?: string
  className?: string
}

export function HiddenImageReveal({ 
  children, 
  hiddenImageSrc, 
  hiddenImageAlt, 
  triggerWord = "digital",
  className = ""
}: HiddenImageRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsRevealed(true)
  }

  const handleMouseLeave = () => {
    setIsRevealed(false)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Hidden Image that follows cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-500 ease-out ${
          isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <Image
            ref={imageRef}
            src={hiddenImageSrc}
            alt={hiddenImageAlt}
            width={300}
            height={300}
            className="rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm"
            style={{
              filter: 'brightness(1.1) contrast(1.2) saturate(1.1)',
              mixBlendMode: 'screen'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          <div className="absolute inset-0 ring-1 ring-white/30 rounded-2xl animate-pulse" />
        </div>
      </div>

      {/* Glow effect around trigger word */}
      <style jsx>{`
        .hover-reveal-trigger {
          position: relative;
          display: inline-block;
        }
        
        .hover-reveal-trigger::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, #ffffff, #888888, #ffffff);
          border-radius: 8px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }
        
        .hover-reveal-trigger:hover::before {
          opacity: 0.2;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

// Enhanced trigger text component
export function TriggerText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`hover-reveal-trigger cursor-none transition-all duration-300 hover:text-white hover:font-bold ${className}`}>
      {children}
    </span>
  )
}
