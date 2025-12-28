import { v4 as uuidv4 } from 'uuid';
import { loadPDF } from './loader';
import { extractText, extractMetadata, generateThumbnail } from './extractor';
import { db } from '@/lib/storage/indexedDB';
import type { PDFDocument, UploadResult } from '@/types/pdf';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = ['application/pdf'];

export class PDFUploadHandler {
  async handleUpload(file: File): Promise<UploadResult> {
    try {
      // Validate file
      this.validateFile(file);

      // Generate unique ID
      const id = uuidv4();

      // Load PDF with PDF.js
      const pdf = await loadPDF(file);

      // Extract data
      const extractedText = await extractText(pdf);
      const metadata = await extractMetadata(pdf);
      const thumbnail = await generateThumbnail(pdf);

      // Create blob
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

      // Create document object
      const document: PDFDocument = {
        id,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploadDate: new Date(),
        lastRead: new Date(),
        lastModified: new Date(file.lastModified),
        pdfBlob: blob,
        extractedText,
        extractedImages: [], // Images extraction is complex, placeholder for now
        thumbnail,
        metadata: {
          ...metadata,
          pageCount: pdf.numPages,
        },
        currentPage: 0,
        readingProgress: 0,
        totalReadingTime: 0,
        collections: [],
        tags: [],
        isFavorite: false,
        isArchived: false,
      };

      // Save to IndexedDB
      await db.savePDF(document);

      return {
        success: true,
        documentId: id,
        pageCount: pdf.numPages,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        documentId: '',
        pageCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private validateFile(file: File): void {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF files allowed.');
    }
  }
}

export const uploadHandler = new PDFUploadHandler();
