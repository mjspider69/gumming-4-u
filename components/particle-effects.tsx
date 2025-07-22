
"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  opacity: number
}

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 1
      
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 60 + 40,
        size: Math.random() * 3 + 1,
        opacity: 1,
      }
    }

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.05 // gravity
        particle.opacity = 1 - (particle.life / particle.maxLife)
        
        return particle.life < particle.maxLife
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = "white"
        ctx.shadowBlur = 10
        ctx.shadowColor = "white"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationIdRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      // Create particles on mouse move
      if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Create burst of particles on click
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9995]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
