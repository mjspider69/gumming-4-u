
"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit, Save, X } from "lucide-react"

interface EditableTextProps {
  children: React.ReactNode
  className?: string
  onSave?: (newText: string) => void
  multiline?: boolean
  placeholder?: string
}

export function EditableText({
  children,
  className = "",
  onSave,
  multiline = false,
  placeholder = "Enter text..."
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(typeof children === 'string' ? children : '')
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select()
      }
    }
  }, [isEditing])

  const handleSave = () => {
    onSave?.(text)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setText(typeof children === 'string' ? children : '')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white resize-none`}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white`}
            placeholder={placeholder}
          />
        )}
        
        <div className="absolute -right-16 top-0 flex gap-1">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
            title="Save (Enter)"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
            title="Cancel (Esc)"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${className} relative group cursor-pointer hover:bg-gray-800/30 rounded px-1 transition-colors`}
      onClick={() => setIsEditing(true)}
    >
      {children}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white text-black p-1 rounded shadow-lg"
          title="Click to edit"
        >
          <Edit className="w-3 h-3" />
        </motion.div>
      </div>
    </div>
  )
}
