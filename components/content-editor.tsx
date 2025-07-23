
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContentEditor() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
    if (!isEditMode) {
      setShowSettings(true)
    }
  }

  return (
    <>
      {/* Floating Edit Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={toggleEditMode}
          className={`rounded-full p-4 shadow-lg transition-colors ${
            isEditMode
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        >
          {isEditMode ? <Eye className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Edit Mode Indicator */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Edit Mode Active</span>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  onClick={() => {
                    // Save changes logic here
                    console.log("Saving changes...")
                  }}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  onClick={() => setIsEditMode(false)}
                >
                  <EyeOff className="w-4 h-4 mr-1" />
                  Exit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Mode Styles */}
      {isEditMode && (
        <style jsx global>{`
          .editable-element {
            outline: 2px dashed rgba(59, 130, 246, 0.5) !important;
            outline-offset: 2px;
          }
          .editable-element:hover {
            outline-color: rgba(59, 130, 246, 0.8) !important;
            background-color: rgba(59, 130, 246, 0.1) !important;
          }
        `}</style>
      )}
    </>
  )
}
