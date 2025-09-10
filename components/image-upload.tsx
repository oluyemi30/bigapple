"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  onImageRemove: () => void
  currentImage?: string
  className?: string
}

export default function ImageUpload({ onImageUpload, onImageRemove, currentImage, className = "" }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      handleFileUpload(imageFile)
    }
  }, [])

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onImageUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onImageRemove()
  }

  return (
    <div className={`relative ${className}`}>
      {previewUrl ? (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-green-200">
            <Image src={previewUrl || "/placeholder.svg"} alt="Product preview" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full h-48 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
            ${
              isDragOver
                ? "border-green-500 bg-green-50"
                : "border-green-300 hover:border-green-400 hover:bg-green-50/50"
            }
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center h-full text-green-600">
            <div className="p-3 rounded-full bg-green-100 mb-3">
              {isDragOver ? <Upload className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
            </div>
            <p className="text-sm font-medium mb-1">{isDragOver ? "Drop image here" : "Upload product image"}</p>
            <p className="text-xs text-gray-500">Drag & drop or click to browse</p>
          </div>
        </div>
      )}
    </div>
  )
}
