"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useEffect, useState, createRef } from "react"
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
  // Letter G formation (more detailed)
  G: [
    [-6, 2, 0], [-5.5, 2.5, 0], [-5, 3, 0], [-4.5, 2.5, 0], [-4, 2, 0],
    [-6, 1.5, 0], [-6, 1, 0], [-6, 0.5, 0], [-6, 0, 0], [-6, -0.5, 0], [-6, -1, 0], [-6, -1.5, 0],
    [-5.5, -2, 0], [-5, -2.5, 0], [-4.5, -2, 0], [-4, -1.5, 0],
    [-4.5, -1, 0], [-4.5, -0.5, 0], [-4.5, 0, 0]
  ],
  // Number 4 formation (more detailed)
  Four: [
    [-1.5, 3, 0], [-1.5, 2.5, 0], [-1.5, 2, 0], [-1.5, 1.5, 0], [-1.5, 1, 0], [-1.5, 0.5, 0], [-1.5, 0, 0],
    [-2, 1.5, 0], [-2.5, 1.5, 0], [-1, 1.5, 0], [-0.5, 1.5, 0], [0, 1.5, 0],
    [0, 3, 0], [0, 2.5, 0], [0, 2, 0], [0, 1, 0], [0, 0.5, 0], [0, 0, 0], [0, -0.5, 0], [0, -1, 0], [0, -1.5, 0]
  ],
  // Letter U formation (more detailed)
  U: [
    [2, 3, 0], [2, 2.5, 0], [2, 2, 0], [2, 1.5, 0], [2, 1, 0], [2, 0.5, 0], [2, 0, 0],
    [2.5, -0.5, 0], [3, -1, 0], [3.5, -1, 0], [4, -0.5, 0],
    [4.5, 0, 0], [4.5, 0.5, 0], [4.5, 1, 0], [4.5, 1.5, 0], [4.5, 2, 0], [4.5, 2.5, 0], [4.5, 3, 0]
  ]
}

const ALL_G4U_POSITIONS = [
  ...G4U_POSITIONS.G,
  ...G4U_POSITIONS.Four,
  ...G4U_POSITIONS.U
]

// Enhanced dispersed positions for floating animation
const DISPERSED_POSITIONS = [
  [-12, 6, -4], [8, -3, -5], [-4, -4, -3], [9, 4, -6], [-8, -2, -4],
  [6, 7, -3], [-7, 3, -5], [10, -4, -2], [-3, 5, -6], [7, -5, -4],
  [-9, 2, -3], [4, -6, -5], [-5, 6, -2], [8, 3, -4], [-2, -3, -6],
  [11, 5, -3], [-10, -5, -4], [3, 7, -5], [-8, 4, -2], [9, -2, -6],
  [-4, -6, -3], [6, 2, -4], [-11, 3, -5], [5, -4, -2], [-3, 6, -6],
  [10, 0, -3], [-9, -3, -4], [4, 5, -5], [-6, -2, -2], [8, 4, -6],
  [-5, -5, -3], [9, 6, -4], [-2, 2, -5], [6, -3, -2], [-10, 4, -6],
  [3, -5, -3], [-8, 5, -4], [5, 0, -5], [-4, 3, -2], [10, -6, -6],
  [7, 1, -3], [-6, -4, -4], [4, 6, -5], [-9, 1, -2], [8, -1, -6],
  [-3, -7, -3], [11, 2, -4], [-7, 7, -5], [2, -2, -2], [9, 3, -6]
]

interface FloatingGeometryProps {
  customText?: string
}

// Component that must be inside Canvas
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
    'octahedron', 'cone', 'cylinder', 'ring', 'sphere', 'box', 'torus', 'icosahedron',
    'octahedron', 'cone', 'cylinder', 'ring'
  ]

  // Animation loop timer
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationPhase((prev) => {
        const nextPhase = (prev + 1) % 4
        return nextPhase
      })
    }, 5000) // Change phase every 5 seconds

    return () => clearInterval(animationInterval)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    geometryRefs.current.forEach((ref, index) => {
      if (!ref) return

      // Enhanced rotation for all elements
      ref.rotation.x += 0.015 * (1 + index * 0.1)
      ref.rotation.y += 0.008 * (1 + index * 0.05)
      ref.rotation.z += 0.012 * (1 + index * 0.08)

      if ((animationPhase === 1 || animationPhase === 2) && index < ALL_G4U_POSITIONS.length) {
        // Form G4U - move to formation positions
        const targetPos = ALL_G4U_POSITIONS[index]
        const currentPos = ref.position

        const lerpSpeed = animationPhase === 1 ? 0.04 : 0.02 // Faster when forming, slower when formed
        currentPos.lerp(new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]), lerpSpeed)

        // Add enhanced floating movement while in formation
        if (animationPhase === 2) {
          ref.position.y += Math.sin(time * 0.8 + index) * 0.02
          ref.position.x += Math.cos(time * 0.5 + index) * 0.01
          ref.position.z += Math.sin(time * 0.3 + index) * 0.005
        }

        // Change color and intensity when in formation
        if (ref.material) {
          const material = ref.material as THREE.MeshStandardMaterial
          const targetColor = new THREE.Color(
            0.3 + Math.sin(time * 2 + index) * 0.4,
            0.9 + Math.sin(time * 1.5 + index) * 0.1,
            1.0
          )
          material.color.lerp(targetColor, 0.08)
          material.emissiveIntensity = 0.3 + Math.sin(time * 3 + index) * 0.2
        }
      } else {
        // Disperse - move to floating positions
        const targetPos = DISPERSED_POSITIONS[index % DISPERSED_POSITIONS.length]
        const currentPos = ref.position

        const lerpSpeed = animationPhase === 3 ? 0.04 : 0.02 // Faster when dispersing
        currentPos.lerp(new THREE.Vector3(
          targetPos[0] + Math.sin(time * 0.3 + index) * 3,
          targetPos[1] + Math.cos(time * 0.4 + index) * 2,
          targetPos[2] + Math.sin(time * 0.2 + index) * 1.5
        ), lerpSpeed)

        // Reset color when dispersed
        if (ref.material) {
          const material = ref.material as THREE.MeshStandardMaterial
          const targetColor = new THREE.Color(0.9, 0.9, 0.9)
          material.color.lerp(targetColor, 0.03)
          material.emissiveIntensity = 0.05
        }
      }

      // Enhanced scale animation based on phase
      const scaleTarget = (animationPhase === 1 || animationPhase === 2) ? 
        0.9 + Math.sin(time * 2 + index) * 0.3 : 
        1.2 + Math.sin(time + index) * 0.4
      ref.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.08)
    })
  })

  const renderGeometry = (type: string, index: number) => {
    const commonProps = {
      ref: (el: THREE.Mesh) => { geometryRefs.current[index] = el },
      position: DISPERSED_POSITIONS[index % DISPERSED_POSITIONS.length] as [number, number, number]
    }

    const materials = [
      <meshStandardMaterial key={`white-${index}`} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.8} />,
      <meshStandardMaterial key={`black-${index}`} color="#222222" emissive="#444444" emissiveIntensity={0.05} roughness={0.2} metalness={0.9} />,
      <meshStandardMaterial key={`gray-${index}`} color="#888888" emissive="#666666" emissiveIntensity={0.08} roughness={0.3} metalness={0.7} />,
      <MeshDistortMaterial key={`distort-${index}`} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.15} roughness={0.1} metalness={0.9} distort={0.3} speed={2} />
    ]

    const material = materials[index % materials.length]

    switch (type) {
      case 'sphere':
        return (
          <Float key={`sphere-${index}`} speed={2 + index * 0.1} rotationIntensity={1.5 + index * 0.1} floatIntensity={3}>
            <Sphere {...commonProps} args={[0.4 + (index % 3) * 0.15, 20, 20]}>
              {material}
            </Sphere>
          </Float>
        )
      case 'box':
        return (
          <Float key={`box-${index}`} speed={2.3 + index * 0.1} rotationIntensity={1.8 + index * 0.1} floatIntensity={2.5}>
            <Box {...commonProps} args={[0.6 + (index % 3) * 0.15, 0.6 + (index % 3) * 0.15, 0.6 + (index % 3) * 0.15]}>
              {material}
            </Box>
          </Float>
        )
      case 'torus':
        return (
          <Float key={`torus-${index}`} speed={2.5 + index * 0.1} rotationIntensity={2 + index * 0.1} floatIntensity={3.2}>
            <Torus {...commonProps} args={[0.5 + (index % 3) * 0.15, 0.2 + (index % 2) * 0.08, 12, 20]}>
              {material}
            </Torus>
          </Float>
        )
      case 'icosahedron':
        return (
          <Float key={`icosahedron-${index}`} speed={2.2 + index * 0.1} rotationIntensity={1.7 + index * 0.1} floatIntensity={2.8}>
            <Icosahedron {...commonProps} args={[0.5 + (index % 3) * 0.15]}>
              {material}
            </Icosahedron>
          </Float>
        )
      case 'octahedron':
        return (
          <Float key={`octahedron-${index}`} speed={2.6 + index * 0.1} rotationIntensity={1.9 + index * 0.1} floatIntensity={2.7}>
            <Octahedron {...commonProps} args={[0.45 + (index % 3) * 0.15]}>
              {material}
            </Octahedron>
          </Float>
        )
      case 'cone':
        return (
          <Float key={`cone-${index}`} speed={2.1 + index * 0.1} rotationIntensity={1.6 + index * 0.1} floatIntensity={3}>
            <Cone {...commonProps} args={[0.4 + (index % 3) * 0.15, 1 + (index % 2) * 0.3, 8]}>
              {material}
            </Cone>
          </Float>
        )
      case 'cylinder':
        return (
          <Float key={`cylinder-${index}`} speed={2.4 + index * 0.1} rotationIntensity={2.1 + index * 0.1} floatIntensity={2.4}>
            <Cylinder {...commonProps} args={[0.35 + (index % 3) * 0.15, 0.35 + (index % 3) * 0.15, 1.2 + (index % 2) * 0.3, 10]}>
              {material}
            </Cylinder>
          </Float>
        )
      case 'ring':
        return (
          <Float key={`ring-${index}`} speed={1.9 + index * 0.1} rotationIntensity={2.2 + index * 0.1} floatIntensity={3.5}>
            <Ring {...commonProps} args={[0.5 + (index % 3) * 0.15, 0.8 + (index % 2) * 0.15, 10]}>
              <meshStandardMaterial color="#aaaaaa" emissive="#666666" emissiveIntensity={0.1} roughness={0.3} metalness={0.8} side={THREE.DoubleSide} />
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
    if (particlesRef.current && positionsRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03

      const positions = positionsRef.current
      const time = state.clock.getElapsedTime()

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 0.8 + i) * 0.003
        positions[i] += Math.cos(time * 0.5 + i) * 0.002
        positions[i + 2] += Math.sin(time * 0.3 + i) * 0.001
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleCount = 3000
  const positions = new Float32Array(particleCount * 3)
  positionsRef.current = positions

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 150
    positions[i * 3 + 1] = (Math.random() - 0.5) * 150
    positions[i * 3 + 2] = (Math.random() - 0.5) * 150
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
        size={0.03}
        color="#ffffff"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Enhanced background planes with more dynamic movement
function BackgroundPlanes() {
  const planeRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    planeRefs.current.forEach((planeRef, index) => {
      if (planeRef && planeRef.material) {
        planeRef.rotation.z = Math.sin(time * 0.15 + index) * 0.08
        planeRef.rotation.x = Math.cos(time * 0.12 + index) * 0.05
        planeRef.rotation.y = Math.sin(time * 0.18 + index) * 0.03

        planeRef.position.z = -20 + Math.sin(time * 0.08 + index) * 8
        planeRef.position.x = Math.cos(time * 0.06 + index) * 5

        const material = planeRef.material as THREE.MeshStandardMaterial
        material.opacity = 0.04 + Math.sin(time * 0.15 + index) * 0.03
      }
    })
  })

  return (
    <>
      {[...Array(8)].map((_, index) => (
        <Plane 
          key={`bg-plane-${index}`}
          ref={(el) => { planeRefs.current[index] = el }}
          args={[30 + index * 6, 30 + index * 6]} 
          position={[
            (index % 2 === 0 ? -1 : 1) * (12 + index * 3), 
            (index % 3 - 1) * 10, 
            -25 - index * 4
          ]} 
          rotation={[0, (index % 2 === 0 ? 1 : -1) * Math.PI / 5, 0]}
        >
          <meshStandardMaterial
            color={index % 4 === 0 ? "#ffffff" : index % 4 === 1 ? "#222222" : index % 4 === 2 ? "#888888" : "#444444"}
            transparent={true}
            opacity={0.04}
            side={THREE.DoubleSide}
            emissive={index % 4 === 0 ? "#ffffff" : "#444444"}
            emissiveIntensity={0.02}
          />
        </Plane>
      ))}
    </>
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
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #000000 0%, #111111 25%, #000000 50%, #111111 75%, #000000 100%)' }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <pointLight position={[20, 20, 20]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-20, -20, 15]} intensity={0.6} color="#888888" />
          <pointLight position={[0, 25, 8]} intensity={0.8} color="#ffffff" />
          <spotLight
            position={[0, 40, 25]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
            color="#ffffff"
          />

          <Stars 
            radius={250} 
            depth={150} 
            count={15000} 
            factor={12} 
            saturation={0} 
            fade 
            speed={0.8} 
          />

          <BackgroundPlanes />
          <ParticleField />
          <FloatingGeometry customText={customText} />

          {showText && (
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
              <Text3D 
                font="/fonts/Geist_Bold.json" 
                size={1.5} 
                height={0.3} 
                position={[0, 4, 3]}
              >
                {customText}
                <meshStandardMaterial 
                  color="#ffffff" 
                  roughness={0.1} 
                  metalness={0.9}
                  emissive="#ffffff"
                  emissiveIntensity={0.2}
                />
              </Text3D>
            </Float>
          )}

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 2.1}
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