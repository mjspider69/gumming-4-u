
"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let animationFrame: number

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Update trail
      setTrailPositions(prev => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, 10)
        ]
        return newTrail
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('cursor-pointer')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-300 ${
          isHovering ? 'scale-150' : isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: '20px',
          height: '20px',
        }}
      >
        <div className="w-full h-full bg-white rounded-full shadow-lg border-2 border-emerald-400" />
      </div>

      {/* Cursor trail */}
      {trailPositions.map((pos, index) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-40 bg-emerald-400 rounded-full"
          style={{
            left: pos.x - (2 + index),
            top: pos.y - (2 + index),
            width: `${4 + index * 2}px`,
            height: `${4 + index * 2}px`,
            opacity: (10 - index) / 10,
            transform: `scale(${(10 - index) / 10})`,
          }}
        />
      ))}

      {/* Cursor glow effect */}
      <div
        className="fixed pointer-events-none z-30 bg-emerald-400/20 rounded-full blur-xl transition-all duration-500"
        style={{
          left: mousePosition.x - 50,
          top: mousePosition.y - 50,
          width: '100px',
          height: '100px',
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </>
  )
}
