
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
  scrollProgress: number
  isFormed: boolean
}

function FloatingGeometry({ scrollProgress, isFormed }: FloatingGeometryProps) {
  const geometryRefs = useRef<(THREE.Mesh | null)[]>([])
  
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

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    geometryRefs.current.forEach((ref, index) => {
      if (!ref) return

      // Continuous rotation for all elements
      ref.rotation.x += 0.01 * (1 + index * 0.1)
      ref.rotation.y += 0.005 * (1 + index * 0.05)
      ref.rotation.z += 0.008 * (1 + index * 0.08)

      if (isFormed && index < allFormationPositions.length) {
        // Form G4U - move to formation positions
        const targetPos = allFormationPositions[index]
        const currentPos = ref.position
        
        currentPos.lerp(new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]), 0.02)
        
        // Add subtle floating movement while in formation
        ref.position.y += Math.sin(time * 0.5 + index) * 0.01
        ref.position.x += Math.cos(time * 0.3 + index) * 0.005
      } else {
        // Disperse - move to floating positions
        const targetPos = DISPERSED_POSITIONS[index % DISPERSED_POSITIONS.length]
        const currentPos = ref.position
        
        currentPos.lerp(new THREE.Vector3(
          targetPos[0] + Math.sin(time * 0.2 + index) * 2,
          targetPos[1] + Math.cos(time * 0.3 + index) * 1.5,
          targetPos[2] + Math.sin(time * 0.15 + index) * 1
        ), 0.01)
      }

      // Scale animation based on scroll
      const scaleTarget = isFormed ? 0.8 + Math.sin(time + index) * 0.1 : 1 + Math.sin(time + index) * 0.2
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

// Enhanced particle system with G4U formation capability
function ParticleField({ scrollProgress, isFormed }: { scrollProgress: number; isFormed: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array>()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
      
      if (positionsRef.current) {
        const positions = positionsRef.current
        const time = state.clock.getElapsedTime()
        
        for (let i = 0; i < positions.length; i += 3) {
          // Add wave motion to particles
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

// Background planes with enhanced animation
function BackgroundPlanes({ scrollProgress }: { scrollProgress: number }) {
  const planeRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    planeRefs.current.forEach((planeRef, index) => {
      if (planeRef) {
        planeRef.rotation.z = Math.sin(time * 0.1 + index) * 0.05
        planeRef.rotation.x = Math.cos(time * 0.08 + index) * 0.03
        planeRef.rotation.y = Math.sin(time * 0.12 + index) * 0.02
        
        // Move planes based on scroll
        planeRef.position.z = -15 + scrollProgress * 5
        planeRef.material.opacity = 0.05 + scrollProgress * 0.03
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

// Main Enhanced 3D Background Component
interface Enhanced3DBackgroundProps {
  variant?: 'default' | 'minimal' | 'complex'
  showText?: boolean
  text?: string
  scrollProgress?: number
}

export function Enhanced3DBackground({ 
  variant = 'complex', 
  showText = false, 
  text = "G4U",
  scrollProgress = 0
}: Enhanced3DBackgroundProps) {
  const [isFormed, setIsFormed] = useState(false)

  useEffect(() => {
    // Form G4U when scroll is between 0.1 and 0.4, disperse otherwise
    setIsFormed(scrollProgress > 0.1 && scrollProgress < 0.4)
  }, [scrollProgress])

  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #000000 0%, #111111 30%, #000000 60%, #111111 100%)' }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Environment and Lighting */}
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

          {/* Enhanced Stars Background */}
          <Stars 
            radius={200} 
            depth={100} 
            count={12000} 
            factor={10} 
            saturation={0} 
            fade 
            speed={0.5} 
          />

          {/* Animated Background Planes */}
          <BackgroundPlanes scrollProgress={scrollProgress} />

          {/* Enhanced Particle Field */}
          <ParticleField scrollProgress={scrollProgress} isFormed={isFormed} />

          {/* Main G4U Formation Geometry */}
          <FloatingGeometry scrollProgress={scrollProgress} isFormed={isFormed} />

          {/* Optional 3D Text */}
          {showText && (
            <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
              <Text3D 
                font="/fonts/Geist_Bold.json" 
                size={isFormed ? 1.5 : 0.8} 
                height={0.2} 
                position={isFormed ? [0, 3, 2] : [-2, 0, 2]}
              >
                {text}
                <meshStandardMaterial 
                  color="#ffffff" 
                  roughness={0.1} 
                  metalness={0.9}
                  emissive="#ffffff"
                  emissiveIntensity={isFormed ? 0.15 : 0.05}
                />
              </Text3D>
            </Float>
          )}

          {/* Enhanced Camera Controls */}
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
    </div>
  )
}
