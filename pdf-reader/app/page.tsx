'use client';

import { useState } from 'react';
import UploadZone from '@/components/upload/UploadZone';
import Library from '@/components/library/Library';
import PDFReader from '@/components/reader/PDFReader';
import type { PDFDocument } from '@/types/pdf';

export default function Home() {
  const [pdfs, setPdfs] = useState<PDFDocument[]>([]);
  const [currentPDF, setCurrentPDF] = useState<PDFDocument | null>(null);
  const [view, setView] = useState<'upload' | 'library' | 'reader'>('upload');

  const handleUploadComplete = (pdf: PDFDocument) => {
    setPdfs(prev => [...prev, pdf]);
    setView('library');
  };

  const handleOpenPDF = (pdf: PDFDocument) => {
    setCurrentPDF(pdf);
    setView('reader');
  };

  const handleClosePDF = () => {
    setCurrentPDF(null);
    setView('library');
  };

  return (
    <main className="min-h-screen">
      {view === 'upload' && (
        <UploadZone onUploadComplete={handleUploadComplete} />
      )}

      {view === 'library' && (
        <Library
          pdfs={pdfs}
          onSelectPDF={handleOpenPDF}
          onUploadNew={() => setView('upload')}
        />
      )}

      {view === 'reader' && currentPDF && (
        <PDFReader
          pdf={currentPDF}
          onClose={handleClosePDF}
        />
      )}
    </main>
  );
}
