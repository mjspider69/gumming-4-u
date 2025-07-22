"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
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
import { useRef } from "react"
import * as THREE from "three"

// Dynamic floating geometric shapes
function FloatingGeometry() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const icosahedronRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)
  const coneRef = useRef<THREE.Mesh>(null)
  const cylinderRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.3
      sphereRef.current.rotation.y = time * 0.2
      sphereRef.current.position.y = Math.sin(time * 0.5) * 2
    }

    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.4
      boxRef.current.rotation.z = time * 0.3
      boxRef.current.position.x = Math.cos(time * 0.3) * 3
    }

    if (torusRef.current) {
      torusRef.current.rotation.y = time * 0.5
      torusRef.current.position.z = Math.sin(time * 0.4) * 2
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = time * 0.2
      icosahedronRef.current.rotation.y = time * 0.4
      icosahedronRef.current.position.y = Math.cos(time * 0.6) * 1.5
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.z = time * 0.3
      octahedronRef.current.position.x = Math.sin(time * 0.5) * 2.5
    }

    if (coneRef.current) {
      coneRef.current.rotation.y = time * 0.6
      coneRef.current.position.z = Math.cos(time * 0.4) * 3
    }

    if (cylinderRef.current) {
      cylinderRef.current.rotation.x = time * 0.4
      cylinderRef.current.position.y = Math.sin(time * 0.7) * 1.8
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5
      ringRef.current.rotation.x = time * 0.3
      ringRef.current.position.x = Math.cos(time * 0.6) * 2.2
    }
  })

  return (
    <>
      {/* Floating Sphere with distortion */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
        <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[-5, 2, -4]}>
          <MeshDistortMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Rotating Box */}
      <Float speed={2.5} rotationIntensity={2.5} floatIntensity={2}>
        <Box ref={boxRef} args={[1.2, 1.2, 1.2]} position={[5, -1, -3]}>
          <meshStandardMaterial
            color="#000000"
            roughness={0.2}
            metalness={1}
            envMapIntensity={1.5}
          />
        </Box>
      </Float>

      {/* Torus with glow */}
      <Float speed={2.2} rotationIntensity={2} floatIntensity={2.5}>
        <Torus ref={torusRef} args={[0.8, 0.3, 16, 32]} position={[2, 3, -5]}>
          <meshStandardMaterial
            color="#666666"
            roughness={0.1}
            metalness={0.8}
            emissive="#333333"
            emissiveIntensity={0.1}
          />
        </Torus>
      </Float>

      {/* Icosahedron */}
      <Float speed={1.8} rotationIntensity={1.8} floatIntensity={2.2}>
        <Icosahedron ref={icosahedronRef} args={[0.9]} position={[-3, -2, -2]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.7}
            wireframe={true}
          />
        </Icosahedron>
      </Float>

      {/* Octahedron */}
      <Float speed={2.3} rotationIntensity={2.1} floatIntensity={1.8}>
        <Octahedron ref={octahedronRef} args={[0.7]} position={[4, 2, -6]}>
          <meshStandardMaterial
            color="#cccccc"
            roughness={0.2}
            metalness={0.9}
            transparent={true}
            opacity={0.8}
          />
        </Octahedron>
      </Float>

      {/* Cone */}
      <Float speed={1.9} rotationIntensity={1.6} floatIntensity={2.1}>
        <Cone ref={coneRef} args={[0.6, 1.5, 8]} position={[-2, 4, -3]}>
          <meshStandardMaterial
            color="#444444"
            roughness={0.4}
            metalness={0.6}
          />
        </Cone>
      </Float>

      {/* Cylinder */}
      <Float speed={2.1} rotationIntensity={1.9} floatIntensity={1.7}>
        <Cylinder ref={cylinderRef} args={[0.5, 0.5, 1.8, 12]} position={[3, -3, -4]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={1}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </Cylinder>
      </Float>

      {/* Ring */}
      <Float speed={1.7} rotationIntensity={2.2} floatIntensity={2.3}>
        <Ring ref={ringRef} args={[0.8, 1.2, 16]} position={[-4, -1, -5]}>
          <meshStandardMaterial
            color="#888888"
            roughness={0.3}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </Ring>
      </Float>
    </>
  )
}

// Particle system
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
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
        size={0.05}
        color="#ffffff"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Background planes with subtle animation
function BackgroundPlanes() {
  const planeRef1 = useRef<THREE.Mesh>(null)
  const planeRef2 = useRef<THREE.Mesh>(null)
  const planeRef3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (planeRef1.current) {
      planeRef1.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
    if (planeRef2.current) {
      planeRef2.current.rotation.x = Math.cos(time * 0.15) * 0.1
    }
    if (planeRef3.current) {
      planeRef3.current.rotation.y = Math.sin(time * 0.25) * 0.1
    }
  })

  return (
    <>
      <Plane ref={planeRef1} args={[20, 20]} position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          color="#000000"
          transparent={true}
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </Plane>

      <Plane ref={planeRef2} args={[15, 15]} position={[-8, 0, -8]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </Plane>

      <Plane ref={planeRef3} args={[15, 15]} position={[8, 0, -8]} rotation={[0, -Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#666666"
          transparent={true}
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </Plane>
    </>
  )
}

// Main Enhanced 3D Background Component
interface Enhanced3DBackgroundProps {
  variant?: 'default' | 'minimal' | 'complex'
  showText?: boolean
  text?: string
}

export function Enhanced3DBackground({ 
  variant = 'default', 
  showText = false, 
  text = "G4U" 
}: Enhanced3DBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #000000 0%, #111111 50%, #000000 100%)' }}
      >
        <Suspense fallback={null}>
          {/* Environment and Lighting */}
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, 5]} intensity={0.5} color="#666666" />
          <spotLight
            position={[0, 20, 10]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
            color="#ffffff"
          />

          {/* Stars Background */}
          <Stars 
            radius={150} 
            depth={80} 
            count={8000} 
            factor={8} 
            saturation={0} 
            fade 
            speed={1} 
          />

          {/* Background Planes */}
          <BackgroundPlanes />

          {/* Particle Field */}
          {variant === 'complex' && <ParticleField />}

          {/* Main Floating Geometry */}
          <FloatingGeometry />

          {/* Optional 3D Text */}
          {showText && (
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
              <Text3D 
                font="/fonts/Geist_Bold.json" 
                size={variant === 'minimal' ? 0.6 : 1} 
                height={0.15} 
                position={[-2, 0, 2]}
              >
                {text}
                <meshStandardMaterial 
                  color="#ffffff" 
                  roughness={0.1} 
                  metalness={0.8}
                  emissive="#ffffff"
                  emissiveIntensity={0.1}
                />
              </Text3D>
            </Float>
          )}

          {/* Camera Controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}