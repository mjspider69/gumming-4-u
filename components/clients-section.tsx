
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

const CLIENTS_DATA = [
  {
    name: "TechCorp Industries",
    logo: "/placeholder.svg?height=80&width=200&text=TechCorp",
    description: "Global technology solutions provider",
    sector: "Technology",
    results: "+250% ROI"
  },
  {
    name: "EcoGreen Solutions",
    logo: "/placeholder.svg?height=80&width=200&text=EcoGreen",
    description: "Sustainable energy company",
    sector: "Energy",
    results: "+180% Growth"
  },
  {
    name: "MedLife Healthcare",
    logo: "/placeholder.svg?height=80&width=200&text=MedLife",
    description: "Healthcare innovation leaders",
    sector: "Healthcare",
    results: "+300% Leads"
  },
  {
    name: "FinanceFlow Pro",
    logo: "/placeholder.svg?height=80&width=200&text=FinanceFlow",
    description: "Financial services platform",
    sector: "Finance",
    results: "+220% Conversion"
  },
  {
    name: "RetailMax Chain",
    logo: "/placeholder.svg?height=80&width=200&text=RetailMax",
    description: "Multi-brand retail network",
    sector: "Retail",
    results: "+160% Sales"
  },
  {
    name: "EduTech Learning",
    logo: "/placeholder.svg?height=80&width=200&text=EduTech",
    description: "Online education platform",
    sector: "Education",
    results: "+400% Users"
  },
  {
    name: "AutoDrive Motors",
    logo: "/placeholder.svg?height=80&width=200&text=AutoDrive",
    description: "Automotive manufacturing",
    sector: "Automotive",
    results: "+190% Revenue"
  },
  {
    name: "CloudSync Services",
    logo: "/placeholder.svg?height=80&width=200&text=CloudSync",
    description: "Cloud infrastructure provider",
    sector: "Cloud",
    results: "+280% Efficiency"
  }
]

interface ClientCardProps {
  client: typeof CLIENTS_DATA[0]
  index: number
  isActive: boolean
}

function ClientCard({ client, index, isActive }: ClientCardProps) {
  return (
    <motion.div
      className={`relative min-w-[350px] h-[200px] mx-4 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ${
        isActive 
          ? 'bg-gradient-to-br from-white via-gray-100 to-white shadow-2xl scale-105 z-10' 
          : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg hover:shadow-xl'
      }`}
      whileHover={{ 
        scale: isActive ? 1.08 : 1.03,
        rotateY: 5,
        z: 20
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            isActive ? 'bg-black' : 'bg-white'
          }`}>
            <Image
              src={client.logo}
              alt={client.name}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className={`font-bold text-lg transition-colors duration-300 ${
              isActive ? 'text-black' : 'text-white'
            }`}>
              {client.name}
            </h3>
            <p className={`text-sm transition-colors duration-300 ${
              isActive ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {client.sector}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
          isActive ? 'text-gray-700' : 'text-gray-300'
        }`}>
          {client.description}
        </p>

        {/* Results */}
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium transition-colors duration-300 ${
            isActive ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Results
          </span>
          <span className={`text-xl font-black transition-colors duration-300 ${
            isActive 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400'
          }`}>
            {client.results}
          </span>
        </div>
      </div>

      {/* Hover Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"
        animate={{
          backgroundPosition: isActive ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
        }}
        transition={{
          duration: 3,
          repeat: isActive ? Infinity : 0,
          ease: "linear"
        }}
      />
    </motion.div>
  )
}

export function ClientsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const controls = useAnimation()

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CLIENTS_DATA.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Animation controls
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent" />
      
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 px-6">
          <motion.h2 
            className="text-6xl font-black mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(90deg, #ffffff, #666666, #ffffff, #666666, #ffffff)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            EXTRAORDINARY CLIENTS
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Partnering with industry leaders to deliver transformative results across diverse sectors
          </motion.p>
        </motion.div>

        {/* Clients Slider */}
        <motion.div
          variants={itemVariants}
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex items-center justify-center overflow-hidden">
            <motion.div 
              className="flex gap-0"
              animate={{
                x: `calc(-${currentSlide * 380}px + 50vw - 190px)`
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              {CLIENTS_DATA.map((client, index) => (
                <ClientCard
                  key={`${client.name}-${index}`}
                  client={client}
                  index={index}
                  isActive={index === currentSlide}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {CLIENTS_DATA.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentSlide ? 1.2 : 1
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mt-8">
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-white via-gray-300 to-white"
                animate={{
                  x: `${(currentSlide / (CLIENTS_DATA.length - 1)) * 100}%`
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  width: `${100 / CLIENTS_DATA.length}%`
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
