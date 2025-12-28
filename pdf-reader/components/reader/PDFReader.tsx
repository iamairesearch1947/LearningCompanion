'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Bookmark as BookmarkIcon,
  BookmarkCheck,
  Sun,
  Moon,
  Type,
} from 'lucide-react';
import { loadPDFFromBlob } from '@/lib/pdf/loader';
import { db } from '@/lib/storage/indexedDB';
import type { PDFDocument } from '@/types/pdf';
import type { ReaderSettings } from '@/types/reader';
import type { PDFDocumentProxy } from 'pdfjs-dist';

interface PDFReaderProps {
  pdf: PDFDocument;
  onClose: () => void;
}

export default function PDFReader({ pdf, onClose }: PDFReaderProps) {
  const [currentPage, setCurrentPage] = useState(pdf.currentPage || 0);
  const [showControls, setShowControls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageContent, setPageContent] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 18,
    fontFamily: 'serif',
    theme: 'sepia',
    lineHeight: 1.6,
    marginWidth: 100,
    brightness: 100,
    pageMode: 'single',
    autoSave: true,
    animations: true,
  });

  // Load PDF document
  useEffect(() => {
    const loadDoc = async () => {
      try {
        const doc = await loadPDFFromBlob(pdf.pdfBlob);
        setPdfDoc(doc);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    loadDoc();
  }, [pdf]);

  // Render current page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage + 1);
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        // Get text content for markdown view
        if (pdf.extractedText && pdf.extractedText[currentPage]) {
          setPageContent(pdf.extractedText[currentPage].markdown);
        }

        // Update progress
        const progress = ((currentPage + 1) / pdf.metadata.pageCount) * 100;
        await db.updatePDF(pdf.id, {
          currentPage,
          readingProgress: progress,
          lastRead: new Date(),
        });
      } catch (error) {
        console.error('Error rendering page:', error);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, pdf]);

  // Load bookmarks
  useEffect(() => {
    const loadBookmarks = async () => {
      const marks = await db.getBookmarks(pdf.id);
      setBookmarks(marks.map(m => m.pageNumber));
    };
    loadBookmarks();
  }, [pdf.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pdf.metadata.pageCount]);

  const nextPage = () => {
    if (currentPage < pdf.metadata.pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleBookmark = async () => {
    if (bookmarks.includes(currentPage)) {
      // Remove bookmark
      const marks = await db.getBookmarks(pdf.id);
      const bookmark = marks.find(m => m.pageNumber === currentPage);
      if (bookmark) {
        await db.deleteBookmark(bookmark.id);
        setBookmarks(bookmarks.filter(p => p !== currentPage));
      }
    } else {
      // Add bookmark
      await db.addBookmark({
        id: crypto.randomUUID(),
        pdfId: pdf.id,
        pageNumber: currentPage,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setBookmarks([...bookmarks, currentPage]);
    }
  };

  const getThemeStyles = () => {
    switch (settings.theme) {
      case 'light':
        return { bg: 'bg-white', text: 'text-gray-900' };
      case 'sepia':
        return { bg: 'bg-[#f4ecd8]', text: 'text-[#5f4b32]' };
      case 'dark':
        return { bg: 'bg-gray-900', text: 'text-gray-100' };
      default:
        return { bg: 'bg-[#f4ecd8]', text: 'text-[#5f4b32]' };
    }
  };

  const themeStyles = getThemeStyles();
  const progress = ((currentPage + 1) / pdf.metadata.pageCount) * 100;

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} ${themeStyles.text} transition-colors duration-300`}>
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 ${themeStyles.bg} border-b border-gray-300 dark:border-gray-700 p-4 transition-all duration-300 ${
          showControls ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-black/5"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Library</span>
          </button>

          <div className="text-center flex-1 px-4">
            <h1 className="text-lg font-semibold truncate">
              {pdf.metadata.title || pdf.fileName}
            </h1>
            {pdf.metadata.author && (
              <p className="text-sm opacity-70">{pdf.metadata.author}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleBookmark}
              className="p-2 rounded hover:bg-black/5"
            >
              {bookmarks.includes(currentPage) ? (
                <BookmarkCheck size={20} className="text-blue-600" />
              ) : (
                <BookmarkIcon size={20} />
              )}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded hover:bg-black/5"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`fixed top-16 right-4 ${themeStyles.bg} border border-gray-300 rounded-lg shadow-xl p-6 w-80 z-50`}>
          <h3 className="font-semibold mb-4">Reader Settings</h3>

          {/* Font Size */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Font Size: {settings.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={settings.fontSize}
              onChange={(e) =>
                setSettings({ ...settings, fontSize: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Theme */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Theme</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`flex-1 p-3 rounded border-2 ${
                  settings.theme === 'light' ? 'border-blue-500' : 'border-gray-300'
                } bg-white`}
              >
                <Sun size={20} className="mx-auto text-gray-900" />
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'sepia' })}
                className={`flex-1 p-3 rounded border-2 ${
                  settings.theme === 'sepia' ? 'border-blue-500' : 'border-gray-300'
                } bg-[#f4ecd8]`}
              >
                <BookmarkIcon size={20} className="mx-auto text-[#5f4b32]" />
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`flex-1 p-3 rounded border-2 ${
                  settings.theme === 'dark' ? 'border-blue-500' : 'border-gray-300'
                } bg-gray-900`}
              >
                <Moon size={20} className="mx-auto text-gray-100" />
              </button>
            </div>
          </div>

          {/* Line Height */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Line Height: {settings.lineHeight}
            </label>
            <input
              type="range"
              min="1.2"
              max="2.4"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) =>
                setSettings({ ...settings, lineHeight: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Main Reading Area */}
      <div
        className="h-full flex items-center justify-center p-4 cursor-pointer"
        onClick={() => setShowControls(!showControls)}
      >
        <div className="max-w-4xl w-full h-full flex items-center" onClick={(e) => e.stopPropagation()}>
          {/* Previous Page Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-4 hover:bg-black/5 rounded-full transition-all ${
              currentPage === 0 ? 'opacity-0 cursor-not-allowed' : 'opacity-0 hover:opacity-100'
            }`}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Content */}
          <div className="flex-1 h-full overflow-y-auto px-8 py-12 flex flex-col items-center">
            <canvas
              ref={canvasRef}
              className="shadow-2xl max-w-full h-auto"
            />
          </div>

          {/* Next Page Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === pdf.metadata.pageCount - 1}
            className={`p-4 hover:bg-black/5 rounded-full transition-all ${
              currentPage === pdf.metadata.pageCount - 1 ? 'opacity-0 cursor-not-allowed' : 'opacity-0 hover:opacity-100'
            }`}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 ${themeStyles.bg} border-t border-gray-300 dark:border-gray-700 transition-all duration-300 ${
          showControls ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-4xl mx-auto p-4">
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Page Info */}
          <div className="flex justify-between text-sm opacity-70">
            <span>
              Page {currentPage + 1} of {pdf.metadata.pageCount}
            </span>
            <span>{progress.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Keyboard Hints */}
      <div className="fixed bottom-4 left-4 text-xs opacity-50">
        <kbd className="px-2 py-1 bg-black/10 rounded">←</kbd> Previous |
        <kbd className="px-2 py-1 bg-black/10 rounded ml-2">→</kbd> Next |
        <kbd className="px-2 py-1 bg-black/10 rounded ml-2">Esc</kbd> Exit
      </div>
    </div>
  );
}
