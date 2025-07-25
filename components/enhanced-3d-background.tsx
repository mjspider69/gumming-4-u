"use client"

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Text3D, Float, OrbitControls, Environment, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleSystemProps {
  count: number
  formText: boolean
}

interface ContentEditorProps {
  allowTextEdit?: boolean
}

// G4U Text Formation Component
function G4UFormation({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const [currentLetter, setCurrentLetter] = useState(0)
  const letters = ['G', '4', 'U']

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setCurrentLetter((prev) => (prev + 1) % letters.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [active, letters.length])

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Text3D
          font="/fonts/Geist_Bold.json"
          size={3}
          height={0.5}
          curveSegments={12}
          position={[-4, 0, 0]}
        >
          G
          <meshStandardMaterial
            color={currentLetter === 0 ? "#00ff88" : "#ffffff"}
            emissive={currentLetter === 0 ? "#00ff44" : "#000000"}
            emissiveIntensity={currentLetter === 0 ? 0.3 : 0}
          />
        </Text3D>

        <Text3D
          font="/fonts/Geist_Bold.json"
          size={3}
          height={0.5}
          curveSegments={12}
          position={[0, 0, 0]}
        >
          4
          <meshStandardMaterial
            color={currentLetter === 1 ? "#00ff88" : "#ffffff"}
            emissive={currentLetter === 1 ? "#00ff44" : "#000000"}
            emissiveIntensity={currentLetter === 1 ? 0.3 : 0}
          />
        </Text3D>

        <Text3D
          font="/fonts/Geist_Bold.json"
          size={3}
          height={0.5}
          curveSegments={12}
          position={[4, 0, 0]}
        >
          U
          <meshStandardMaterial
            color={currentLetter === 2 ? "#00ff88" : "#ffffff"}
            emissive={currentLetter === 2 ? "#00ff44" : "#000000"}
            emissiveIntensity={currentLetter === 2 ? 0.3 : 0}
          />
        </Text3D>
      </Float>
    </group>
  )
}

// Advanced Particle System
function ParticleSystem({ count, formText }: ParticleSystemProps) {
  const mesh = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array>()
  const [colors, setColors] = useState<Float32Array>()

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    if (formText) {
      // Create G4U formation pattern
      const letterPositions = [
        { x: -8, y: 0, z: 0 }, // G
        { x: 0, y: 0, z: 0 },  // 4
        { x: 8, y: 0, z: 0 }   // U
      ]

      for (let i = 0; i < count; i++) {
        const letterIndex = Math.floor(i / (count / 3))
        const letter = letterPositions[letterIndex] || letterPositions[0]

        // Create letter-shaped particle distribution
        const angle = (i / count) * Math.PI * 8
        const radius = Math.random() * 3 + 1

        positions[i * 3] = letter.x + Math.cos(angle) * radius + (Math.random() - 0.5) * 2
        positions[i * 3 + 1] = letter.y + Math.sin(angle) * radius + (Math.random() - 0.5) * 2
        positions[i * 3 + 2] = letter.z + (Math.random() - 0.5) * 4

        // Color gradient for each letter
        colors[i * 3] = letterIndex === 0 ? 0.2 : letterIndex === 1 ? 0.8 : 0.4 // R
        colors[i * 3 + 1] = 1.0 // G
        colors[i * 3 + 2] = letterIndex === 2 ? 1.0 : 0.6 // B
      }
    } else {
      // Random distribution
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40

        colors[i * 3] = Math.random()
        colors[i * 3 + 1] = Math.random() * 0.8 + 0.2
        colors[i * 3 + 2] = Math.random()
      }
    }

    return { positions, colors }
  }, [count, formText])

  useEffect(() => {
    setPositions(particlePositions.positions)
    setColors(particlePositions.colors)
  }, [particlePositions])

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x -= delta / 20
      mesh.current.rotation.y -= delta / 15

      if (mesh.current.geometry.attributes.position) {
        const positions = mesh.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
          if (!formText) {
            positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
          }
        }

        mesh.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        transparent
        alphaTest={0.001}
        opacity={0.8}
      />
    </points>
  )
}

// Floating 3D Objects
function FloatingObjects() {
  const objects = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    ] as [number, number, number],
    type: Math.floor(Math.random() * 3)
  }))

  return (
    <>
      {objects.map((obj) => (
        <Float
          key={obj.id}
          speed={1 + Math.random()}
          rotationIntensity={0.5 + Math.random() * 0.5}
          floatIntensity={0.5 + Math.random() * 0.5}
        >
          <group position={obj.position}>
            {obj.type === 0 && (
              <Box args={[0.5, 0.5, 0.5]}>
                <meshStandardMaterial color="#00ff88" transparent opacity={0.3} />
              </Box>
            )}
            {obj.type === 1 && (
              <Sphere args={[0.3]}>
                <meshStandardMaterial color="#ff6b6b" transparent opacity={0.3} />
              </Sphere>
            )}
            {obj.type === 2 && (
              <Torus args={[0.3, 0.1]}>
                <meshStandardMaterial color="#4ecdc4" transparent opacity={0.3} />
              </Torus>
            )}
          </group>
        </Float>
      ))}
    </>
  )
}

// Camera Controller
function CameraController() {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.x = Math.sin(Date.now() * 0.0005) * 5
    camera.position.z = Math.cos(Date.now() * 0.0005) * 5
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Hidden Image Reveal Component
function HiddenImageReveal() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Check if mouse is in the center area
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      setIsVisible(distance < 150)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute w-80 h-80 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-xl"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
          transform: `scale(${isVisible ? 1 : 0.5})`,
          transition: 'transform 0.3s ease'
        }}
      />
      <div
        className="absolute w-60 h-60 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center"
        style={{
          left: mousePosition.x - 120,
          top: mousePosition.y - 120,
          transform: `scale(${isVisible ? 1 : 0})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <img
          src="/images/hidden-reveal.png"
          alt="G4U Secret"
          className="w-40 h-40 object-cover rounded-xl"
        />
      </div>
    </div>
  )
}

// Main Enhanced 3D Background Component
export function Enhanced3DBackground({ allowTextEdit = false }: ContentEditorProps) {
  const [formG4U, setFormG4U] = useState(false)
  const [showObjects, setShowObjects] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFormG4U(prev => !prev)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Environment preset="night" />

          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#4ecdc4"
          />

          <ParticleSystem count={2000} formText={formG4U} />

          <G4UFormation active={formG4U} />

          {showObjects && <FloatingObjects />}

          <CameraController />

          <fog attach="fog" args={['#000000', 10, 50]} />
        </Canvas>
      </div>

      <HiddenImageReveal />

      {/* Overlay effects */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/20" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </>
  )
}