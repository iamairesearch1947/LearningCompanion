'use client';

import { useState } from 'react';
import Library from '@/components/Library';
import Reader from '@/components/Reader';
import { sampleBooks } from '@/data/sampleBooks';
import { Book } from '@/types/book';

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <>
      {selectedBook ? (
        <Reader book={selectedBook} onClose={() => setSelectedBook(null)} />
      ) : (
        <Library books={sampleBooks} onSelectBook={setSelectedBook} />
      )}
    </>
  );
}
