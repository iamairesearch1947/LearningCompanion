import { openDB, type IDBPDatabase } from 'idb';
import type { PDFDocument } from '@/types/pdf';
import type { Bookmark, Highlight, Annotation } from '@/types/bookmark';

const DB_NAME = 'PDFReaderDB';
const DB_VERSION = 1;

class PDFReaderDatabase {
  private db: IDBPDatabase | null = null;

  async init(): Promise<void> {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // PDFs store
        if (!db.objectStoreNames.contains('pdfs')) {
          const pdfStore = db.createObjectStore('pdfs', { keyPath: 'id' });
          pdfStore.createIndex('uploadDate', 'uploadDate');
          pdfStore.createIndex('lastRead', 'lastRead');
          pdfStore.createIndex('fileName', 'fileName');
        }

        // Bookmarks store
        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarkStore.createIndex('pdfId', 'pdfId');
        }

        // Highlights store
        if (!db.objectStoreNames.contains('highlights')) {
          const highlightStore = db.createObjectStore('highlights', { keyPath: 'id' });
          highlightStore.createIndex('pdfId', 'pdfId');
        }

        // Annotations store
        if (!db.objectStoreNames.contains('annotations')) {
          const annotationStore = db.createObjectStore('annotations', { keyPath: 'id' });
          annotationStore.createIndex('pdfId', 'pdfId');
        }
      },
    });
  }

  // PDF Operations
  async savePDF(pdf: PDFDocument): Promise<string> {
    if (!this.db) await this.init();
    await this.db!.put('pdfs', pdf);
    return pdf.id;
  }

  async getPDF(id: string): Promise<PDFDocument | null> {
    if (!this.db) await this.init();
    return (await this.db!.get('pdfs', id)) || null;
  }

  async getAllPDFs(): Promise<PDFDocument[]> {
    if (!this.db) await this.init();
    return await this.db!.getAll('pdfs');
  }

  async updatePDF(id: string, updates: Partial<PDFDocument>): Promise<void> {
    if (!this.db) await this.init();
    const pdf = await this.getPDF(id);
    if (pdf) {
      await this.db!.put('pdfs', { ...pdf, ...updates });
    }
  }

  async deletePDF(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('pdfs', id);
  }

  // Bookmark Operations
  async addBookmark(bookmark: Bookmark): Promise<string> {
    if (!this.db) await this.init();
    await this.db!.put('bookmarks', bookmark);
    return bookmark.id;
  }

  async getBookmarks(pdfId: string): Promise<Bookmark[]> {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('bookmarks', 'pdfId', pdfId);
  }

  async deleteBookmark(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('bookmarks', id);
  }

  // Highlight Operations
  async addHighlight(highlight: Highlight): Promise<string> {
    if (!this.db) await this.init();
    await this.db!.put('highlights', highlight);
    return highlight.id;
  }

  async getHighlights(pdfId: string): Promise<Highlight[]> {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('highlights', 'pdfId', pdfId);
  }

  async deleteHighlight(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('highlights', id);
  }

  // Annotation Operations
  async addAnnotation(annotation: Annotation): Promise<string> {
    if (!this.db) await this.init();
    await this.db!.put('annotations', annotation);
    return annotation.id;
  }

  async getAnnotations(pdfId: string): Promise<Annotation[]> {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('annotations', 'pdfId', pdfId);
  }

  async deleteAnnotation(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('annotations', id);
  }
}

// Singleton instance
export const db = new PDFReaderDatabase();
