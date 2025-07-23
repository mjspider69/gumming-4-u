"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousemove", updateMousePosition)

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
          transition: isClicking ? "transform 0.1s ease-out" : "transform 0.15s ease-out",
        }}
      >
        <div
          className={`w-6 h-6 border-2 border-white rounded-full transition-all duration-200 ${
            isHovering ? "scale-150 border-white/80" : "scale-100"
          } ${isClicking ? "scale-75" : ""}`}
        />
      </div>

      {/* Trailing cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          className={`w-2 h-2 bg-white rounded-full transition-all duration-300 ${
            isHovering ? "scale-200 opacity-60" : "scale-100 opacity-80"
          }`}
        />
      </div>
    </>
  )
}

export default CustomCursor