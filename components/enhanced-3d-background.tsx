"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useEffect, useState } from "react"
import { 
  Environment, 
  Float, 
  Text3D, 
  OrbitControls, 
  Sphere, 
  Box, 
  Torus, 
  Stars,
  MeshDistortMaterial,
  Icosahedron,
  Octahedron,
  Cone,
  Cylinder,
  Ring,
  Plane
} from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// G4U Formation positions for elements
const G4U_POSITIONS = {
  // Letter G formation
  G: [
    [-4, 1, 0], [-3.5, 1.5, 0], [-3, 2, 0], [-2.5, 1.5, 0], [-2, 1, 0],
    [-4, 0.5, 0], [-4, 0, 0], [-4, -0.5, 0], [-4, -1, 0],
    [-3.5, -1.5, 0], [-3, -2, 0], [-2.5, -1.5, 0], [-2, -1, 0],
    [-2.5, -0.5, 0], [-2.5, 0, 0]
  ],
  // Number 4 formation
  Four: [
    [-0.5, 2, 0], [-0.5, 1.5, 0], [-0.5, 1, 0], [-0.5, 0.5, 0], [-0.5, 0, 0],
    [-1, 1, 0], [-1.5, 1, 0], [0, 1, 0], [0.5, 1, 0],
    [0.5, 2, 0], [0.5, 1.5, 0], [0.5, 0.5, 0], [0.5, 0, 0], [0.5, -0.5, 0], [0.5, -1, 0]
  ],
  // Letter U formation
  U: [
    [2, 2, 0], [2, 1.5, 0], [2, 1, 0], [2, 0.5, 0], [2, 0, 0],
    [2.5, -0.5, 0], [3, -1, 0], [3.5, -0.5, 0],
    [4, 0, 0], [4, 0.5, 0], [4, 1, 0], [4, 1.5, 0], [4, 2, 0]
  ]
}

const ALL_G4U_POSITIONS = [
  ...G4U_POSITIONS.G,
  ...G4U_POSITIONS.Four,
  ...G4U_POSITIONS.U
]

// Dispersed positions for floating animation
const DISPERSED_POSITIONS = [
  [-8, 4, -3], [6, -2, -4], [-3, -3, -2], [7, 3, -5], [-6, -1, -3],
  [4, 5, -2], [-5, 2, -4], [8, -3, -1], [-2, 4, -5], [5, -4, -3],
  [-7, 1, -2], [3, -5, -4], [-4, 5, -1], [6, 2, -3], [-1, -2, -5],
  [9, 4, -2], [-8, -4, -3], [2, 6, -4], [-6, 3, -1], [7, -1, -5],
  [-3, -5, -2], [5, 1, -3], [-9, 2, -4], [4, -3, -1], [-2, 5, -5],
  [8, 0, -2], [-7, -2, -3], [3, 4, -4], [-5, -1, -1], [6, 3, -5],
  [-4, -4, -2], [7, 5, -3], [-1, 1, -4], [5, -2, -1], [-8, 3, -5],
  [2, -4, -2], [-6, 4, -3], [4, 0, -4], [-3, 2, -1], [8, -5, -5]
]

interface FloatingGeometryProps {
  customText?: string
}

function FloatingGeometry({ customText = "G4U" }: FloatingGeometryProps) {
  const geometryRefs = useRef<(THREE.Mesh | null)[]>([])
  const [animationPhase, setAnimationPhase] = useState(0) // 0: dispersed, 1: forming, 2: formed, 3: dispersing

  // All geometry types for variety
  const geometryTypes = [
    'sphere', 'box', 'torus', 'icosahedron', 'octahedron', 
    'cone', 'cylinder', 'ring', 'sphere', 'box', 'torus', 'icosahedron',
    'octahedron', 'cone', 'cylinder', 'ring', 'sphere', 'box', 'torus', 'icosahedron',
    'octahedron', 'cone', 'cylinder', 'ring', 'sphere', 'box', 'torus', 'icosahedron',
    'octahedron', 'cone', 'cylinder', 'ring', 'sphere', 'box', 'torus', 'icosahedron',
    'octahedron', 'cone', 'cylinder', 'ring'
  ]

  const allFormationPositions = [
    ...G4U_POSITIONS.G,
    ...G4U_POSITIONS.Four,
    ...G4U_POSITIONS.U
  ]

  // Animation loop timer
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationPhase((prev) => {
        const nextPhase = (prev + 1) % 4
        return nextPhase
      })
    }, 4000) // Change phase every 4 seconds

    return () => clearInterval(animationInterval)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    geometryRefs.current.forEach((ref, index) => {
      if (!ref) return

      // Continuous rotation for all elements
      ref.rotation.x += 0.01 * (1 + index * 0.1)
      ref.rotation.y += 0.005 * (1 + index * 0.05)
      ref.rotation.z += 0.008 * (1 + index * 0.08)

      if ((animationPhase === 1 || animationPhase === 2) && index < allFormationPositions.length) {
        // Form G4U - move to formation positions
        const targetPos = allFormationPositions[index]
        const currentPos = ref.position

        const lerpSpeed = animationPhase === 1 ? 0.03 : 0.01 // Faster when forming, slower when formed
        currentPos.lerp(new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]), lerpSpeed)

        // Add subtle floating movement while in formation
        if (animationPhase === 2) {
          ref.position.y += Math.sin(time * 0.5 + index) * 0.01
          ref.position.x += Math.cos(time * 0.3 + index) * 0.005
        }
      } else {
        // Disperse - move to floating positions
        const targetPos = DISPERSED_POSITIONS[index % DISPERSED_POSITIONS.length]
        const currentPos = ref.position

        const lerpSpeed = animationPhase === 3 ? 0.03 : 0.01 // Faster when dispersing
        currentPos.lerp(new THREE.Vector3(
          targetPos[0] + Math.sin(time * 0.2 + index) * 2,
          targetPos[1] + Math.cos(time * 0.3 + index) * 1.5,
          targetPos[2] + Math.sin(time * 0.15 + index) * 1
        ), lerpSpeed)
      }

      // Scale animation based on phase
      const scaleTarget = (animationPhase === 1 || animationPhase === 2) ? 
        0.8 + Math.sin(time + index) * 0.1 : 
        1 + Math.sin(time + index) * 0.2
      ref.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.05)
    })
  })

  const renderGeometry = (type: string, index: number) => {
    const commonProps = {
      ref: (el: THREE.Mesh) => { geometryRefs.current[index] = el },
      position: DISPERSED_POSITIONS[index % DISPERSED_POSITIONS.length] as [number, number, number]
    }

    const materials = [
      <meshStandardMaterial key="white" color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.8} />,
      <meshStandardMaterial key="black" color="#000000" roughness={0.2} metalness={0.9} />,
      <meshStandardMaterial key="gray" color="#666666" roughness={0.3} metalness={0.7} />,
      <MeshDistortMaterial key="distort" color="#ffffff" emissive="#ffffff" emissiveIntensity={0.05} roughness={0.1} metalness={0.9} distort={0.2} speed={1} />
    ]

    const material = materials[index % materials.length]

    switch (type) {
      case 'sphere':
        return (
          <Float key={index} speed={1.5 + index * 0.1} rotationIntensity={1 + index * 0.1} floatIntensity={2}>
            <Sphere {...commonProps} args={[0.3 + (index % 3) * 0.1, 16, 16]}>
              {material}
            </Sphere>
          </Float>
        )
      case 'box':
        return (
          <Float key={index} speed={1.8 + index * 0.1} rotationIntensity={1.2 + index * 0.1} floatIntensity={1.8}>
            <Box {...commonProps} args={[0.5 + (index % 3) * 0.1, 0.5 + (index % 3) * 0.1, 0.5 + (index % 3) * 0.1]}>
              {material}
            </Box>
          </Float>
        )
      case 'torus':
        return (
          <Float key={index} speed={2 + index * 0.1} rotationIntensity={1.5 + index * 0.1} floatIntensity={2.2}>
            <Torus {...commonProps} args={[0.4 + (index % 3) * 0.1, 0.15 + (index % 2) * 0.05, 8, 16]}>
              {material}
            </Torus>
          </Float>
        )
      case 'icosahedron':
        return (
          <Float key={index} speed={1.7 + index * 0.1} rotationIntensity={1.3 + index * 0.1} floatIntensity={2}>
            <Icosahedron {...commonProps} args={[0.4 + (index % 3) * 0.1]}>
              {material}
            </Icosahedron>
          </Float>
        )
      case 'octahedron':
        return (
          <Float key={index} speed={2.1 + index * 0.1} rotationIntensity={1.4 + index * 0.1} floatIntensity={1.9}>
            <Octahedron {...commonProps} args={[0.35 + (index % 3) * 0.1]}>
              {material}
            </Octahedron>
          </Float>
        )
      case 'cone':
        return (
          <Float key={index} speed={1.6 + index * 0.1} rotationIntensity={1.1 + index * 0.1} floatIntensity={2.1}>
            <Cone {...commonProps} args={[0.3 + (index % 3) * 0.1, 0.8 + (index % 2) * 0.2, 6]}>
              {material}
            </Cone>
          </Float>
        )
      case 'cylinder':
        return (
          <Float key={index} speed={1.9 + index * 0.1} rotationIntensity={1.6 + index * 0.1} floatIntensity={1.7}>
            <Cylinder {...commonProps} args={[0.25 + (index % 3) * 0.1, 0.25 + (index % 3) * 0.1, 0.9 + (index % 2) * 0.2, 8]}>
              {material}
            </Cylinder>
          </Float>
        )
      case 'ring':
        return (
          <Float key={index} speed={1.4 + index * 0.1} rotationIntensity={1.7 + index * 0.1} floatIntensity={2.3}>
            <Ring {...commonProps} args={[0.4 + (index % 3) * 0.1, 0.6 + (index % 2) * 0.1, 8]}>
              <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.8} side={THREE.DoubleSide} />
            </Ring>
          </Float>
        )
      default:
        return null
    }
  }

  return (
    <>
      {geometryTypes.map((type, index) => renderGeometry(type, index))}
    </>
  )
}

// Enhanced particle system
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array>()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02

      if (positionsRef.current) {
        const positions = positionsRef.current
        const time = state.clock.getElapsedTime()

        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time * 0.5 + i) * 0.002
          positions[i] += Math.cos(time * 0.3 + i) * 0.001
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  positionsRef.current = positions

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent={true}
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Background planes
function BackgroundPlanes() {
  const planeRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    planeRefs.current.forEach((planeRef, index) => {
      if (planeRef) {
        planeRef.rotation.z = Math.sin(time * 0.1 + index) * 0.05
        planeRef.rotation.x = Math.cos(time * 0.08 + index) * 0.03
        planeRef.rotation.y = Math.sin(time * 0.12 + index) * 0.02

        planeRef.position.z = -15 + Math.sin(time * 0.05 + index) * 5
        planeRef.material.opacity = 0.03 + Math.sin(time * 0.1 + index) * 0.02
      }
    })
  })

  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Plane 
          key={index}
          ref={(el) => { planeRefs.current[index] = el }}
          args={[25 + index * 5, 25 + index * 5]} 
          position={[
            (index % 2 === 0 ? -1 : 1) * (10 + index * 2), 
            (index % 3 - 1) * 8, 
            -20 - index * 3
          ]} 
          rotation={[0, (index % 2 === 0 ? 1 : -1) * Math.PI / 6, 0]}
        >
          <meshStandardMaterial
            color={index % 3 === 0 ? "#ffffff" : index % 3 === 1 ? "#000000" : "#666666"}
            transparent={true}
            opacity={0.03}
            side={THREE.DoubleSide}
          />
        </Plane>
      ))}
    </>
  )
}

// Text Editor Component
function TextEditor({ onTextChange, currentText }: { onTextChange: (text: string) => void; currentText: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(currentText)

  const handleSave = () => {
    onTextChange(text)
    setIsEditing(false)
  }

  return (
    <div className="absolute top-4 right-4 z-50">
      {isEditing ? (
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-transparent border border-white/30 rounded px-3 py-2 text-white focus:outline-none focus:border-white/60"
            placeholder="Enter custom text"
            maxLength={10}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-white text-black rounded text-sm hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-transparent border border-white/30 text-white rounded text-sm hover:border-white/60 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/20 text-white hover:bg-black/80 transition-colors"
          title="Edit Text"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Main Enhanced 3D Background Component
interface Enhanced3DBackgroundProps {
  variant?: 'default' | 'minimal' | 'complex'
  showText?: boolean
  text?: string
  scrollProgress?: number
  allowTextEdit?: boolean
}

export function Enhanced3DBackground({ 
  variant = 'complex', 
  showText = false, 
  text = "G4U",
  scrollProgress = 0,
  allowTextEdit = false
}: Enhanced3DBackgroundProps) {
  const [customText, setCustomText] = useState(text)

  // Create particle references - ensure we have enough for G4U formation
  const particleCount = Math.max(120, ALL_G4U_POSITIONS.length + 20)
  const particles = useRef(
    Array.from({ length: particleCount }, () => createRef())
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Update animation phases with timing (every 15 seconds cycle)
    const cycleTime = time % 15
    if (cycleTime < 4) {
      setAnimationPhase(1) // Forming G4U (4 seconds)
    } else if (cycleTime < 8) {
      setAnimationPhase(2) // Holding G4U formation (4 seconds)
    } else if (cycleTime < 11) {
      setAnimationPhase(3) // Dispersing (3 seconds)
    } else {
      setAnimationPhase(0) // Floating freely (4 seconds)
    }

    particles.forEach((ref, index) => {
      if (!ref.current) return

      if ((animationPhase === 1 || animationPhase === 2) && index < ALL_G4U_POSITIONS.length) {
        // Form G4U - move to formation positions
        const targetPos = ALL_G4U_POSITIONS[index]
        const currentPos = ref.current.position

        const lerpSpeed = animationPhase === 1 ? 0.04 : 0.008 // Faster when forming, slower when formed
        currentPos.lerp(new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]), lerpSpeed)

        // Add subtle floating movement while in formation
        if (animationPhase === 2) {
          ref.current.position.y += Math.sin(time * 0.5 + index) * 0.008
          ref.current.position.x += Math.cos(time * 0.3 + index) * 0.004
        }

        // Change color when in formation
        if (ref.current.material) {
          const targetColor = new THREE.Color(0.2 + Math.sin(time + index) * 0.3, 0.8, 0.9)
          ref.current.material.color.lerp(targetColor, 0.05)
        }
      } else {
        // Disperse - move to floating positions
        const dispersedIndex = index % DISPERSED_POSITIONS.length
        const targetPos = DISPERSED_POSITIONS[dispersedIndex]
        const currentPos = ref.current.position

        const lerpSpeed = animationPhase === 3 ? 0.04 : 0.015 // Faster when dispersing
        const floatingOffset = new THREE.Vector3(
          targetPos[0] + Math.sin(time * 0.2 + index) * 3,
          targetPos[1] + Math.cos(time * 0.3 + index) * 2,
          targetPos[2] + Math.sin(time * 0.15 + index) * 1.5
        )
        currentPos.lerp(floatingOffset, lerpSpeed)

        // Reset color when dispersed
        if (ref.current.material) {
          const targetColor = new THREE.Color(0.8, 0.8, 0.8)
          ref.current.material.color.lerp(targetColor, 0.02)
        }
      }

      // Scale animation based on phase
      const scaleTarget = (animationPhase === 1 || animationPhase === 2) ? 
        0.6 + Math.sin(time * 2 + index) * 0.2 : 
        0.8 + Math.sin(time + index) * 0.3

      ref.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.08)

      // Rotation animation
      ref.current.rotation.x += 0.01 + Math.sin(time + index) * 0.005
      ref.current.rotation.y += 0.008 + Math.cos(time + index) * 0.003
    })
  })

  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #000000 0%, #111111 30%, #000000 60%, #111111 100%)' }}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.2} />
          <pointLight position={[15, 15, 15]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-15, -15, 10]} intensity={0.4} color="#666666" />
          <pointLight position={[0, 20, 5]} intensity={0.6} color="#ffffff" />
          <spotLight
            position={[0, 30, 20]}
            angle={0.2}
            penumbra={1}
            intensity={0.5}
            castShadow
            color="#ffffff"
          />

          <Stars 
            radius={200} 
            depth={100} 
            count={12000} 
            factor={10} 
            saturation={0} 
            fade 
            speed={0.5} 
          />

          <BackgroundPlanes />
          <ParticleField />
          <FloatingGeometry customText={customText} />

          {showText && (
            <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
              <Text3D 
                font="/fonts/Geist_Bold.json" 
                size={1.2} 
                height={0.2} 
                position={[0, 3.5, 2]}
              >
                {customText}
                <meshStandardMaterial 
                  color="#ffffff" 
                  roughness={0.1} 
                  metalness={0.9}
                  emissive="#ffffff"
                  emissiveIntensity={0.1}
                />
              </Text3D>
            </Float>
          )}

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>

      {allowTextEdit && (
        <TextEditor 
          onTextChange={setCustomText} 
          currentText={customText}
        />
      )}
    </div>
  )
}