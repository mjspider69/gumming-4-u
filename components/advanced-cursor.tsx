
"use client"

import { useEffect, useState, useRef } from "react"

export function AdvancedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])
  const trailId = useRef(0)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add trail effect
      trailId.current += 1
      setTrails(prev => [
        ...prev.slice(-10), // Keep only last 10 trails
        { x: e.clientX, y: e.clientY, id: trailId.current }
      ])
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Create ripple effect
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = mousePosition.x + 'px'
      ripple.style.top = mousePosition.y + 'px'
      document.body.appendChild(ripple)
      
      setTimeout(() => {
        document.body.removeChild(ripple)
      }, 600)
    }
    
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      setIsHovering(true)

      if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button")
      } else if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link")
      } else if (target.closest('[data-cursor="text"]')) {
        setCursorVariant("text")
      } else if (target.closest('[data-magnetic]')) {
        setCursorVariant("magnetic")
      } else {
        setCursorVariant("hover")
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorVariant("default")
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, [data-cursor], [data-magnetic]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Clean up old trails
    const trailCleanup = setInterval(() => {
      setTrails(prev => prev.slice(-5))
    }, 100)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      clearInterval(trailCleanup)
    }
  }, [mousePosition.x, mousePosition.y])

  const getCursorSize = () => {
    switch (cursorVariant) {
      case "button": return isClicking ? 60 : 55
      case "link": return 45
      case "text": return 35
      case "magnetic": return 65
      case "hover": return 40
      default: return isClicking ? 25 : 20
    }
  }

  const getCursorStyles = () => {
    const baseStyles = {
      transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
      backdropFilter: "blur(3px)",
    }

    switch (cursorVariant) {
      case "button":
        return {
          ...baseStyles,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)",
          border: "3px solid #000000",
          boxShadow: "0 0 40px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.3)",
        }
      case "link":
        return {
          ...baseStyles,
          background: "radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%)",
          border: "3px solid #ffffff",
          boxShadow: "0 0 35px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.2)",
        }
      case "magnetic":
        return {
          ...baseStyles,
          background: "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffff00, #ff00ff)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 0 50px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3)",
        }
      case "text":
        return {
          ...baseStyles,
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #000000",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.6)",
        }
      default:
        return {
          ...baseStyles,
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(0, 0, 0, 0.4)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)",
        }
    }
  }

  const size = getCursorSize()
  const styles = getCursorStyles()

  return (
    <>
      {/* Trail Effect */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed rounded-full pointer-events-none z-[9997]"
          style={{
            width: `${Math.max(5, 15 - index)}px`,
            height: `${Math.max(5, 15 - index)}px`,
            transform: `translate(${trail.x - (15 - index) / 2}px, ${trail.y - (15 - index) / 2}px)`,
            background: `rgba(255, 255, 255, ${0.8 - index * 0.08})`,
            transition: "all 0.3s ease-out",
          }}
        />
      ))}

      {/* Main Cursor */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(${mousePosition.x - size / 2}px, ${mousePosition.y - size / 2}px) scale(${isClicking ? 0.8 : 1})`,
          ...styles,
        }}
      />

      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          width: `${size + 20}px`,
          height: `${size + 20}px`,
          transform: `translate(${mousePosition.x - (size + 20) / 2}px, ${mousePosition.y - (size + 20) / 2}px)`,
          border: "1px solid rgba(255, 255, 255, 0.3)",
          opacity: isHovering ? 0.8 : 0,
          transition: "all 0.3s ease-out",
        }}
      />

      {/* Ripple Effects */}
      <style jsx global>{`
        .cursor-ripple {
          position: fixed;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: rippleEffect 0.6s ease-out forwards;
          pointer-events: none;
          z-index: 9996;
        }

        @keyframes rippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
