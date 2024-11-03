"use client";
import React, { useState } from "react";
import { Upload, Image as ImageIcon, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadedFile {
  originalName: string;
  url: string;
}

export const UploadScreen = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<UploadedFile[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];

    const imageFiles = newFiles.filter(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );

    const newPreviewUrls = imageFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...imageFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("ผิดพลาดในการอัปโหลดรูปภาพ");
      }

      const data = await response.json();
      console.log("Uploaded files:", data.files);

      const urls = data.files.map((file: any) => ({
        originalName: file.originalName,
        url: `${process.env.IMG_URL}/img/${file.savedName}`,
      }));

      setUploadedUrls(urls);
      toast.success("Images uploaded successfully");

      clearAll();
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setFiles([]);
  };

  const copyAllUrls = () => {
    const urlText = uploadedUrls.map((file) => file.url).join("\n");
    navigator.clipboard.writeText(urlText);
    toast.success("All URLs copied to clipboard");
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
                        {files[index]?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Status and Actions */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{files.length} files selected</span>
                {files.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Submit Button */}
              {files.length > 0 && (
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload Images"}
                </Button>
              )}
            </div>

            {/* Uploaded URLs Display */}
            {uploadedUrls.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    Uploaded Images URLs:
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAllUrls}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy All URLs
                  </Button>
                </div>
                <ScrollArea className="h-40 w-full rounded-md border bg-gray-50">
                  <div className="p-4 font-mono text-sm">
                    {uploadedUrls.map((file, index) => (
                      <div key={index} className="break-all">
                        {file.url}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
