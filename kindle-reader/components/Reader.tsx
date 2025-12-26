'use client';

import { useState, useEffect } from 'react';
import { Book, ReaderSettings, Bookmark } from '@/types/book';
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Bookmark as BookmarkIcon,
  BookmarkCheck,
  Home,
  Sun,
  Moon
} from 'lucide-react';

interface ReaderProps {
  book: Book;
  onClose: () => void;
}

export default function Reader({ book, onClose }: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 18,
    fontFamily: 'serif',
    theme: 'sepia',
    lineHeight: 1.6,
    brightness: 100,
  });

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${book.id}`);
    if (saved) {
      setCurrentPage(parseInt(saved));
    }

    const savedBookmarks = localStorage.getItem(`bookmarks-${book.id}`);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [book.id]);

  useEffect(() => {
    localStorage.setItem(`progress-${book.id}`, currentPage.toString());
  }, [currentPage, book.id]);

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
  }, [currentPage, book.content.length]);

  const nextPage = () => {
    if (currentPage < book.content.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleBookmark = () => {
    const newBookmarks = bookmarks.includes(currentPage)
      ? bookmarks.filter(p => p !== currentPage)
      : [...bookmarks, currentPage];

    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks-${book.id}`, JSON.stringify(newBookmarks));
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
  const progress = ((currentPage + 1) / book.content.length) * 100;

  return (
    <div className={`fixed inset-0 ${themeStyles.bg} ${themeStyles.text} transition-colors duration-300`}>
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 ${themeStyles.bg} border-b border-gray-300 dark:border-gray-700 p-4 transition-all duration-300 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}
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
            <h1 className="text-lg font-semibold truncate">{book.title}</h1>
            <p className="text-sm opacity-70">{book.author}</p>
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
            <label className="block text-sm mb-2">Font Size: {settings.fontSize}px</label>
            <input
              type="range"
              min="14"
              max="28"
              value={settings.fontSize}
              onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Font Family */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
              className={`w-full p-2 border rounded ${themeStyles.bg}`}
            >
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          {/* Theme */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Theme</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`flex-1 p-3 rounded border-2 ${settings.theme === 'light' ? 'border-blue-500' : 'border-gray-300'} bg-white`}
              >
                <Sun size={20} className="mx-auto text-gray-900" />
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'sepia' })}
                className={`flex-1 p-3 rounded border-2 ${settings.theme === 'sepia' ? 'border-blue-500' : 'border-gray-300'} bg-[#f4ecd8]`}
              >
                <BookmarkIcon size={20} className="mx-auto text-[#5f4b32]" />
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`flex-1 p-3 rounded border-2 ${settings.theme === 'dark' ? 'border-blue-500' : 'border-gray-300'} bg-gray-900`}
              >
                <Moon size={20} className="mx-auto text-gray-100" />
              </button>
            </div>
          </div>

          {/* Line Height */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Line Height: {settings.lineHeight}</label>
            <input
              type="range"
              min="1.2"
              max="2.4"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) => setSettings({ ...settings, lineHeight: parseFloat(e.target.value) })}
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
        <div
          className="max-w-4xl w-full h-full flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Page Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-4 hover:bg-black/5 rounded-full transition-all ${currentPage === 0 ? 'opacity-0 cursor-not-allowed' : 'opacity-0 hover:opacity-100'}`}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Content */}
          <div className="flex-1 h-full overflow-y-auto px-8 py-12">
            <div
              style={{
                fontSize: `${settings.fontSize}px`,
                fontFamily: settings.fontFamily,
                lineHeight: settings.lineHeight,
              }}
              className="whitespace-pre-wrap"
            >
              {book.content[currentPage]}
            </div>
          </div>

          {/* Next Page Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === book.content.length - 1}
            className={`p-4 hover:bg-black/5 rounded-full transition-all ${currentPage === book.content.length - 1 ? 'opacity-0 cursor-not-allowed' : 'opacity-0 hover:opacity-100'}`}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 ${themeStyles.bg} border-t border-gray-300 dark:border-gray-700 transition-all duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}
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
            <span>Page {currentPage + 1} of {book.content.length}</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Keyboard Navigation Hints */}
      <div className="fixed bottom-4 left-4 text-xs opacity-50">
        <kbd className="px-2 py-1 bg-black/10 rounded">←</kbd> Previous |
        <kbd className="px-2 py-1 bg-black/10 rounded ml-2">→</kbd> Next |
        <kbd className="px-2 py-1 bg-black/10 rounded ml-2">Space</kbd> Next |
        <kbd className="px-2 py-1 bg-black/10 rounded ml-2">Esc</kbd> Exit
      </div>
    </div>
  );
}
