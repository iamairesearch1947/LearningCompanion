'use client';

import { Book } from '@/types/book';
import { BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';

interface LibraryProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

export default function Library({ books, onSelectBook }: LibraryProps) {
  const getReadingProgress = (bookId: string) => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return 0;

    const saved = localStorage.getItem(`progress-${bookId}`);
    if (!saved) return 0;

    const book = books.find(b => b.id === bookId);
    if (!book) return 0;

    const currentPage = parseInt(saved);
    return Math.round(((currentPage + 1) / book.totalPages) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <BookOpen size={32} className="text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
              <p className="text-sm text-gray-600">Your personal reading collection</p>
            </div>
          </div>
        </div>
      </header>

      {/* Library Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => {
            const progress = getReadingProgress(book.id);

            return (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Book Cover */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {progress > 0 && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {progress}%
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>

                  {book.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {book.description}
                    </p>
                  )}

                  {/* Progress Bar */}
                  {progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                        <Clock size={12} />
                        <span>Continue Reading</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                    {book.genre && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {book.genre}
                      </span>
                    )}
                    <span>{book.totalPages} pages</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {books.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No books in your library
            </h3>
            <p className="text-gray-500">
              Add some books to get started with your reading journey
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
}
