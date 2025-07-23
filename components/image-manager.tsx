
"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, Edit, Save, Trash2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface ImageItem {
  id: string
  name: string
  url: string
  alt: string
  category: string
}

interface ImageManagerProps {
  isOpen: boolean
  onClose: () => void
  onImageSelect?: (image: ImageItem) => void
}

export function ImageManager({ isOpen, onClose, onImageSelect }: ImageManagerProps) {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      name: "Gumming4U Logo",
      url: "/images/gumming4u-logo.png",
      alt: "Gumming4U Logo",
      category: "branding"
    },
    {
      id: "2",
      name: "Team Photo",
      url: "/images/team-photo.jpg",
      alt: "G4U Team Photo",
      category: "team"
    },
    {
      id: "3",
      name: "Header Design",
      url: "/images/header-design.png",
      alt: "Header Design",
      category: "design"
    }
  ])
  
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [newImageName, setNewImageName] = useState("")
  const [newImageAlt, setNewImageAlt] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ["all", "branding", "team", "design", "portfolio", "blog"]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: ImageItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name.split('.')[0],
            url: e.target?.result as string,
            alt: file.name.split('.')[0],
            category: "portfolio"
          }
          setImages(prev => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleImageEdit = (imageId: string, newName: string, newAlt: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, name: newName, alt: newAlt }
        : img
    ))
    setEditingImage(null)
  }

  const handleImageDelete = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              Image Manager
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Images
            </Button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-white text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Images Grid */}
          <div className="overflow-y-auto max-h-[500px]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors group"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => onImageSelect?.(image)}
                        className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                        title="Select Image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingImage(image.id)
                          setNewImageName(image.name)
                          setNewImageAlt(image.alt)
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                        title="Edit Image"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleImageDelete(image.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {editingImage === image.id ? (
                    <div className="p-3 space-y-2">
                      <Input
                        value={newImageName}
                        onChange={(e) => setNewImageName(e.target.value)}
                        placeholder="Image name"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        value={newImageAlt}
                        onChange={(e) => setNewImageAlt(e.target.value)}
                        placeholder="Alt text"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleImageEdit(image.id, newImageName, newImageAlt)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Save className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingImage(null)}
                          className="border-gray-600 text-gray-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      <h3 className="font-medium text-white text-sm truncate">{image.name}</h3>
                      <p className="text-xs text-gray-400 truncate">{image.alt}</p>
                      <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded mt-2 text-gray-300">
                        {image.category}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
