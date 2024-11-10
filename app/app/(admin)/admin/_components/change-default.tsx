"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { X, Upload, Image as ImageIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import uploadImage from "../_actions/upload-image"
import { ClearCacheProvider, useClearCacheCtx } from 'react-clear-cache';


export const ChangeDefaultImageButton = () => {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select an image file")
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      setError("")
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first")
      return
    }
    const { emptyCacheStorage } = useClearCacheCtx()

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const result = await uploadImage(formData)

      if (!result.data) {
        throw new Error(result.error || 'Upload failed')
      }

      emptyCacheStorage();
      // Close dialog on success
      setOpen(false)
      setSelectedFile(null)
      setPreview(null)
    } catch (err) {
      setError("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreview(null)
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>เปลี่ยนรูปภาพเริ่มต้น</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!preview ? (
            <div className="flex flex-col items-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleFileSelect}
                />
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to select image
                  </span>
                </Label>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={typeof preview === 'string' ? preview : undefined}
                alt="Preview"
                className="w-full rounded-lg object-cover max-h-64"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                onClick={clearSelection}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}