"use client";
import React, { useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const UploadScreen = () => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/jpeg') || 
      file.type.startsWith('image/png')
    );

    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));
    const newFileNames = imageFiles.map(file => file.name);

    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    setFileNames(prev => [...prev, ...newFileNames]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFileNames(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setFileNames([]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Upload logic will go here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="border-2 border-dashed">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Upload Area */}
            <label className="block cursor-pointer">
              <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={handleFileSelect}
                />
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-700">
                    Click to upload
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG or PNG files only
                  </p>
                </div>
              </div>
            </label>

            {/* Preview Area */}
            {previewUrls.length > 0 && (
              <ScrollArea className="h-64 w-full rounded-md border">
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={url} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border bg-gray-100">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 hidden group-hover:flex h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {fileNames[index]}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Status and Actions */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{previewUrls.length} files selected</span>
                {previewUrls.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    Clear All
                  </Button>
                )}
              </div>
              
              {/* Submit Button */}
              {previewUrls.length > 0 && (
                <Button 
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload Images"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
