
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Save, X } from "lucide-react"
import Image from "next/image"
import { ImageManager } from "./image-manager"

interface EditableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  onImageChange?: (newSrc: string, newAlt: string) => void
}

export function EditableImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  fill,
  onImageChange
}: EditableImageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [currentAlt, setCurrentAlt] = useState(alt)

  const handleImageSelect = (image: { url: string; alt: string }) => {
    setCurrentSrc(image.url)
    setCurrentAlt(image.alt)
    onImageChange?.(image.url, image.alt)
    setIsImageManagerOpen(false)
    setIsEditing(false)
  }

  return (
    <div className="relative group">
      {fill ? (
        <Image
          src={currentSrc}
          alt={currentAlt}
          fill
          className={className}
          priority={priority}
        />
      ) : (
        <Image
          src={currentSrc}
          alt={currentAlt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
      )}
      
      {/* Edit Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => {
            setIsEditing(true)
            setIsImageManagerOpen(true)
          }}
          className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
          title="Change Image"
        >
          <Edit className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Image Manager Modal */}
      <ImageManager
        isOpen={isImageManagerOpen}
        onClose={() => {
          setIsImageManagerOpen(false)
          setIsEditing(false)
        }}
        onImageSelect={handleImageSelect}
      />
    </div>
  )
}
