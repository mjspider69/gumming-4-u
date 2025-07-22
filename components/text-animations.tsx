"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

// Typing Animation Component
export function TypingAnimation({ 
  text, 
  className = "", 
  speed = 100, 
  showCursor = true 
}: { 
  text: string
  className?: string
  speed?: number
  showCursor?: boolean
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// Word by Word Reveal Animation
export function WordReveal({ 
  text, 
  className = "", 
  delay = 0.1 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const words = text.split(" ")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}-${word}-${text.slice(0, 10)}`}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: delay * wordIndex }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Character by Character Animation
export function CharacterReveal({ 
  text, 
  className = "", 
  delay = 0.05 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const characters = text.split("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={`char-${index}-${char}-${text.slice(0, 5)}-${index}`}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.4, delay: delay * index }}
          className="inline-block"
          style={{ transformOrigin: "center" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Glitch Text Animation
export function GlitchText({ 
  text, 
  className = "" 
}: { 
  text: string
  className?: string
}) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
    >
      <motion.span
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          textShadow: [
            "0 0 0 transparent",
            "2px 0 0 #ff00ff, -2px 0 0 #00ffff",
            "-2px 0 0 #ff00ff, 2px 0 0 #00ffff",
            "0 0 0 transparent"
          ]
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}

// Morphing Text Animation
export function MorphingText({ 
  texts, 
  className = "", 
  interval = 3000 
}: { 
  texts: string[]
  className?: string
  interval?: number
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <motion.div className={className}>
      <motion.span
        key={currentTextIndex}
        initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
        transition={{ duration: 0.6 }}
      >
        {texts[currentTextIndex]}
      </motion.span>
    </motion.div>
  )
}

// Gradient Text Animation
export function GradientText({ 
  text, 
  className = "" 
}: { 
  text: string
  className?: string
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  )
}

// Bounce Text Animation
export function BounceText({ 
  text, 
  className = "", 
  delay = 0.1 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const letters = text.split("")

  return (
    <motion.div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={`bounce-${index}-${letter}-${text.slice(0, 3)}`}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: delay * index,
            repeatDelay: 2,
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Slide Up Text Animation
export function SlideUpText({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {text}
    </motion.div>
  )
}

// Stagger Text Animation
export function StaggerText({ 
  text, 
  className = "" 
}: { 
  text: string
  className?: string
}) {
  const words = text.split(" ")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`stagger-${index}-${word}-${text.slice(0, 5)}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}