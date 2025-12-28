import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export async function loadPDF(file: File): Promise<PDFDocumentProxy> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    return pdf;
  } catch (error) {
    console.error('Error loading PDF:', error);
    throw new Error('Failed to load PDF file');
  }
}

export async function loadPDFFromBlob(blob: Blob): Promise<PDFDocumentProxy> {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    return pdf;
  } catch (error) {
    console.error('Error loading PDF from blob:', error);
    throw new Error('Failed to load PDF from blob');
  }
}

export { pdfjsLib };
export type { PDFDocumentProxy };
