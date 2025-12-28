'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { uploadHandler } from '@/lib/pdf/uploadHandler';
import { db } from '@/lib/storage/indexedDB';
import type { PDFDocument } from '@/types/pdf';

interface UploadZoneProps {
  onUploadComplete: (pdf: PDFDocument) => void;
}

export default function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setIsUploading(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadHandler.handleUpload(file);

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success) {
        const pdf = await db.getPDF(result.documentId);
        if (pdf) {
          setTimeout(() => {
            onUploadComplete(pdf);
          }, 500);
        }
      } else {
        setError(result.error || 'Upload failed');
        setIsUploading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleFile(file);
    } else {
      setError('Please upload a PDF file');
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText size={48} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">PDF Reader</h1>
          </div>
          <p className="text-lg text-gray-600">
            Upload your PDF files and enjoy a Kindle-like reading experience
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-4 border-dashed rounded-2xl p-12 transition-all duration-300
            ${isDragging
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 bg-white hover:border-blue-400'
            }
            ${isUploading ? 'pointer-events-none opacity-75' : ''}
          `}
        >
          {isUploading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Processing PDF...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{progress}% complete</p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <Upload size={64} className="mx-auto mb-4 text-blue-500" />
                <p className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your PDF file here
                </p>
                <p className="text-gray-600 mb-6">or</p>

                <label className="inline-block">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <span className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors inline-block">
                    Browse Files
                  </span>
                </label>

                <p className="text-sm text-gray-500 mt-6">
                  Maximum file size: 50MB
                </p>
              </div>
            </>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Upload Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            PDFs are processed locally in your browser. Your files never leave your device.
          </p>
        </div>
      </div>
    </div>
  );
}
