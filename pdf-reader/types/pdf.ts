export interface PDFDocument {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  lastRead: Date;
  lastModified: Date;
  pdfBlob: Blob;
  extractedText: ExtractedPage[];
  extractedImages: ExtractedImage[];
  thumbnail: string;
  metadata: PDFMetadata;
  currentPage: number;
  readingProgress: number;
  totalReadingTime: number;
  collections: string[];
  tags: string[];
  isFavorite: boolean;
  isArchived: boolean;
}

export interface ExtractedPage {
  pageNumber: number;
  rawText: string;
  markdown: string;
  wordCount: number;
  characterCount: number;
}

export interface ExtractedImage {
  id: string;
  pdfId: string;
  pageNumber: number;
  imageName: string;
  dataUrl: string;
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
  pageCount: number;
  fileVersion: string;
}

export interface UploadResult {
  success: boolean;
  documentId: string;
  pageCount: number;
  error?: string;
}
