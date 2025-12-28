'use client';

import { BookOpen, Upload, Clock, FileText } from 'lucide-react';
import type { PDFDocument } from '@/types/pdf';

interface LibraryProps {
  pdfs: PDFDocument[];
  onSelectPDF: (pdf: PDFDocument) => void;
  onUploadNew: () => void;
}

export default function Library({ pdfs, onSelectPDF, onUploadNew }: LibraryProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen size={32} className="text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PDF Library</h1>
                <p className="text-sm text-gray-600">
                  {pdfs.length} {pdfs.length === 1 ? 'document' : 'documents'}
                </p>
              </div>
            </div>

            <button
              onClick={onUploadNew}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} />
              Upload PDF
            </button>
          </div>
        </div>
      </header>

      {/* Library Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pdfs.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No PDFs in your library
            </h3>
            <p className="text-gray-500 mb-6">
              Upload your first PDF to get started
            </p>
            <button
              onClick={onUploadNew}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Upload PDF
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                onClick={() => onSelectPDF(pdf)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* PDF Thumbnail */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={pdf.thumbnail}
                    alt={pdf.fileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {pdf.readingProgress > 0 && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {Math.round(pdf.readingProgress)}%
                    </div>
                  )}
                </div>

                {/* PDF Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                    {pdf.metadata.title || pdf.fileName}
                  </h3>

                  {pdf.metadata.author && (
                    <p className="text-sm text-gray-600 mb-2">
                      {pdf.metadata.author}
                    </p>
                  )}

                  {/* Progress Bar */}
                  {pdf.readingProgress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                        <Clock size={12} />
                        <span>Continue Reading</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${pdf.readingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                    <span>{pdf.metadata.pageCount} pages</span>
                    <span>•</span>
                    <span>{formatFileSize(pdf.fileSize)}</span>
                  </div>

                  <div className="mt-2 text-xs text-gray-400">
                    Added {formatDate(pdf.uploadDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>Built with Next.js, TypeScript, and PDF.js</p>
      </footer>
    </div>
  );
}
