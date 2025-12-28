# 🔧 PDF Reader Application - Backend Features & Architecture

## 📋 Overview

This document details the backend architecture, features, and implementation for the PDF Reader application. While the application is primarily client-side (running in the browser), it includes sophisticated data processing, storage, and state management systems that function as a "backend" layer.

---

## 🏗️ Backend Architecture

### Architecture Pattern: Client-Side Backend

The application uses a **client-side backend architecture** where all data processing, storage, and business logic run in the user's browser. This provides:

- **Privacy**: All data stays on user's device
- **Offline-first**: No internet required after initial load
- **Performance**: Direct file access without server round-trips
- **Simplicity**: No server infrastructure needed

### Key Backend Components

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│         (React Components, UI, User Interactions)        │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  API Layer / Hooks                       │
│    (usePDFExtraction, useStorage, useReadingProgress)   │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 Business Logic Layer                     │
│   (PDF Processing, Text Extraction, Image Processing)   │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  Data Access Layer                       │
│        (IndexedDB, localStorage, Cache Manager)         │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  Storage Layer                           │
│          (Browser IndexedDB, localStorage API)          │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Data Storage System

### 1. IndexedDB (Primary Storage)

**Purpose**: Store large binary files (PDFs) and extracted content

#### Database Schema

```typescript
interface PDFReaderDB {
  // Version: 1

  // Store 1: PDF Documents
  pdfs: {
    key: string;                    // UUID (primary key)
    value: {
      // Basic Metadata
      id: string;                   // UUID
      fileName: string;             // Original file name
      fileSize: number;             // Size in bytes
      mimeType: string;             // 'application/pdf'

      // Timestamps
      uploadDate: Date;             // When uploaded
      lastRead: Date;               // Last opened
      lastModified: Date;           // Last modification

      // PDF Binary Data
      pdfBlob: Blob;                // Original PDF file

      // Extracted Content
      extractedText: ExtractedPage[]; // Text per page
      extractedImages: ExtractedImage[]; // All images
      outline: PDFOutline[];        // Table of contents

      // Preview
      thumbnail: string;            // Base64 cover image

      // Metadata
      metadata: {
        title?: string;             // PDF title metadata
        author?: string;            // PDF author
        subject?: string;           // Subject
        keywords?: string[];        // Keywords
        creator?: string;           // Creator application
        producer?: string;          // PDF producer
        creationDate?: Date;        // PDF creation date
        modificationDate?: Date;    // PDF modification date
        pageCount: number;          // Total pages
        fileVersion: string;        // PDF version
      };

      // User Data
      currentPage: number;          // Current reading position
      readingProgress: number;      // Percentage (0-100)
      totalReadingTime: number;     // Seconds
      collections: string[];        // Collection IDs
      tags: string[];               // User tags
      isFavorite: boolean;          // Starred
      isArchived: boolean;          // Archived
      customTitle?: string;         // User-defined title
      customCover?: string;         // Custom cover image
    };
    indexes: {
      'uploadDate': Date;
      'lastRead': Date;
      'fileName': string;
      'isFavorite': boolean;
      'tags': string;
    };
  };

  // Store 2: Bookmarks
  bookmarks: {
    key: string;                    // UUID
    value: {
      id: string;
      pdfId: string;                // Foreign key to pdfs
      pageNumber: number;           // Page bookmarked
      position?: {                  // Specific position on page
        x: number;
        y: number;
      };
      label?: string;               // Bookmark name
      note?: string;                // Bookmark note
      createdAt: Date;
      updatedAt: Date;
      color?: string;               // Bookmark color
    };
    indexes: {
      'pdfId': string;
      'pageNumber': number;
      'createdAt': Date;
    };
  };

  // Store 3: Highlights
  highlights: {
    key: string;                    // UUID
    value: {
      id: string;
      pdfId: string;                // Foreign key to pdfs
      pageNumber: number;           // Page number
      text: string;                 // Highlighted text
      selectedText: string;         // Original selected text
      position: {                   // Position data
        x1: number;
        y1: number;
        x2: number;
        y2: number;
      };
      color: string;                // Highlight color
      category?: 'important' | 'question' | 'note' | 'reference';
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: {
      'pdfId': string;
      'pageNumber': number;
      'category': string;
      'createdAt': Date;
    };
  };

  // Store 4: Annotations (Notes)
  annotations: {
    key: string;                    // UUID
    value: {
      id: string;
      pdfId: string;                // Foreign key to pdfs
      pageNumber: number;           // Page number
      content: string;              // Note content (markdown)
      position?: {                  // Position on page
        x: number;
        y: number;
      };
      highlightId?: string;         // Associated highlight
      attachments?: string[];       // File attachments (base64)
      tags: string[];               // Note tags
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: {
      'pdfId': string;
      'pageNumber': number;
      'createdAt': Date;
    };
  };

  // Store 5: Collections
  collections: {
    key: string;                    // UUID
    value: {
      id: string;
      name: string;                 // Collection name
      description?: string;         // Description
      color?: string;               // Color code
      icon?: string;                // Icon name
      parentId?: string;            // For nested collections
      pdfIds: string[];             // PDFs in collection
      sortOrder: number;            // Display order
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: {
      'name': string;
      'parentId': string;
    };
  };

  // Store 6: Reading Sessions
  readingSessions: {
    key: string;                    // UUID
    value: {
      id: string;
      pdfId: string;                // Foreign key to pdfs
      startTime: Date;              // Session start
      endTime?: Date;               // Session end
      duration: number;             // Seconds
      pagesRead: number;            // Pages read in session
      startPage: number;            // Starting page
      endPage: number;              // Ending page
      deviceInfo?: {                // Device metadata
        platform: string;
        browser: string;
        screenSize: string;
      };
    };
    indexes: {
      'pdfId': string;
      'startTime': Date;
    };
  };

  // Store 7: Search History
  searchHistory: {
    key: string;                    // UUID
    value: {
      id: string;
      query: string;                // Search query
      pdfId?: string;               // If document-specific
      resultsCount: number;         // Number of results
      timestamp: Date;
      filters?: {                   // Search filters used
        caseSensitive?: boolean;
        wholeWord?: boolean;
        regex?: boolean;
      };
    };
    indexes: {
      'timestamp': Date;
      'pdfId': string;
    };
  };
}
```

#### IndexedDB Operations

```typescript
// lib/storage/indexedDB.ts

class PDFReaderDatabase {
  private db: IDBDatabase;
  private readonly DB_NAME = 'PDFReaderDB';
  private readonly DB_VERSION = 1;

  // Initialize database
  async init(): Promise<void>;

  // PDF Operations
  async savePDF(pdf: PDFDocument): Promise<string>;
  async getPDF(id: string): Promise<PDFDocument | null>;
  async getAllPDFs(): Promise<PDFDocument[]>;
  async updatePDF(id: string, updates: Partial<PDFDocument>): Promise<void>;
  async deletePDF(id: string): Promise<void>;
  async searchPDFs(query: string): Promise<PDFDocument[]>;

  // Bookmark Operations
  async addBookmark(bookmark: Bookmark): Promise<string>;
  async getBookmarks(pdfId: string): Promise<Bookmark[]>;
  async deleteBookmark(id: string): Promise<void>;
  async updateBookmark(id: string, updates: Partial<Bookmark>): Promise<void>;

  // Highlight Operations
  async addHighlight(highlight: Highlight): Promise<string>;
  async getHighlights(pdfId: string): Promise<Highlight[]>;
  async deleteHighlight(id: string): Promise<void>;
  async updateHighlight(id: string, updates: Partial<Highlight>): Promise<void>;

  // Annotation Operations
  async addAnnotation(annotation: Annotation): Promise<string>;
  async getAnnotations(pdfId: string): Promise<Annotation[]>;
  async deleteAnnotation(id: string): Promise<void>;
  async updateAnnotation(id: string, updates: Partial<Annotation>): Promise<void>;

  // Collection Operations
  async createCollection(collection: Collection): Promise<string>;
  async getCollections(): Promise<Collection[]>;
  async addPDFToCollection(pdfId: string, collectionId: string): Promise<void>;
  async removePDFFromCollection(pdfId: string, collectionId: string): Promise<void>;

  // Bulk Operations
  async bulkDelete(ids: string[]): Promise<void>;
  async exportData(): Promise<ExportData>;
  async importData(data: ExportData): Promise<void>;

  // Cleanup
  async clearCache(): Promise<void>;
  async vacuum(): Promise<void>;
}
```

### 2. localStorage (Settings & Preferences)

**Purpose**: Store lightweight settings and preferences

#### Storage Keys

```typescript
// User Settings
localStorage.setItem('reader-settings', JSON.stringify({
  fontSize: 18,
  fontFamily: 'serif',
  theme: 'sepia',
  lineHeight: 1.6,
  marginWidth: 100,
  brightness: 100,
  pageMode: 'single',
  autoSave: true,
  animations: true,
  keyboardShortcuts: true,
}));

// Library Settings
localStorage.setItem('library-settings', JSON.stringify({
  viewMode: 'grid',
  sortBy: 'lastRead',
  sortOrder: 'desc',
  filterBy: 'all',
  showThumbnails: true,
  gridColumns: 4,
}));

// Application State
localStorage.setItem('app-state', JSON.stringify({
  lastOpenPDF: 'uuid-123',
  lastViewedPage: 42,
  sidebarOpen: true,
  tutorialCompleted: true,
}));

// User Preferences
localStorage.setItem('user-preferences', JSON.stringify({
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  startPage: 'library',
  confirmDelete: true,
}));
```

### 3. Cache Layer

**Purpose**: In-memory caching for fast access

```typescript
// lib/storage/cache.ts

class CacheManager {
  private cache: Map<string, CacheEntry>;
  private maxSize: number = 100 * 1024 * 1024; // 100MB
  private currentSize: number = 0;

  // Cache operations
  set(key: string, value: any, ttl?: number): void;
  get(key: string): any | null;
  has(key: string): boolean;
  delete(key: string): void;
  clear(): void;

  // Cache strategies
  private evictLRU(): void;        // Least Recently Used
  private evictLFU(): void;        // Least Frequently Used
  private evictFIFO(): void;       // First In First Out

  // Cache stats
  getStats(): CacheStats;
  getHitRate(): number;
}
```

---

## ⚙️ Core Backend Features

### 1. PDF Upload & Processing

#### File Upload Handler

```typescript
// lib/pdf/uploadHandler.ts

export class PDFUploadHandler {
  private maxFileSize = 50 * 1024 * 1024; // 50MB
  private allowedTypes = ['application/pdf'];

  async handleUpload(file: File): Promise<UploadResult> {
    // Validate file
    this.validateFile(file);

    // Generate unique ID
    const id = generateUUID();

    // Read file
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

    // Load PDF with PDF.js
    const pdf = await this.loadPDF(arrayBuffer);

    // Extract data
    const extractedText = await this.extractText(pdf);
    const extractedImages = await this.extractImages(pdf);
    const outline = await this.extractOutline(pdf);
    const metadata = await this.extractMetadata(pdf);
    const thumbnail = await this.generateThumbnail(pdf);

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
      extractedImages,
      outline,
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
  }

  private validateFile(file: File): void {
    if (file.size > this.maxFileSize) {
      throw new Error(`File too large. Max size: ${this.maxFileSize / 1024 / 1024}MB`);
    }
    if (!this.allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF files allowed.');
    }
  }
}
```

### 2. PDF Text Extraction

```typescript
// lib/pdf/textExtractor.ts

export class PDFTextExtractor {
  async extractText(pdf: PDFDocumentProxy): Promise<ExtractedPage[]> {
    const pages: ExtractedPage[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Process text items
      const processedText = this.processTextItems(textContent.items);

      // Detect structure (headings, paragraphs, lists)
      const structure = this.detectStructure(processedText);

      // Convert to markdown
      const markdown = this.convertToMarkdown(structure);

      pages.push({
        pageNumber: pageNum,
        rawText: processedText.join(' '),
        markdown,
        structure,
        wordCount: processedText.length,
        characterCount: processedText.join('').length,
      });
    }

    return pages;
  }

  private processTextItems(items: TextItem[]): string[] {
    return items.map(item => {
      // Clean and normalize text
      let text = item.str.trim();

      // Fix common PDF artifacts
      text = this.fixPDFArtifacts(text);

      // Handle special characters
      text = this.handleSpecialCharacters(text);

      return text;
    }).filter(text => text.length > 0);
  }

  private detectStructure(texts: string[]): TextStructure {
    const structure: TextStructure = {
      headings: [],
      paragraphs: [],
      lists: [],
      codeBlocks: [],
      tables: [],
    };

    // Detect headings (larger font size, bold, etc.)
    // Detect paragraphs (text blocks)
    // Detect lists (bullet points, numbering)
    // Detect code blocks (monospace font)
    // Detect tables (grid structure)

    return structure;
  }

  private convertToMarkdown(structure: TextStructure): string {
    let markdown = '';

    // Convert headings
    structure.headings.forEach(heading => {
      markdown += `${'#'.repeat(heading.level)} ${heading.text}\n\n`;
    });

    // Convert paragraphs
    structure.paragraphs.forEach(para => {
      markdown += `${para.text}\n\n`;
    });

    // Convert lists
    structure.lists.forEach(list => {
      list.items.forEach((item, index) => {
        if (list.ordered) {
          markdown += `${index + 1}. ${item}\n`;
        } else {
          markdown += `- ${item}\n`;
        }
      });
      markdown += '\n';
    });

    return markdown;
  }

  private fixPDFArtifacts(text: string): string {
    // Remove extra spaces
    text = text.replace(/\s+/g, ' ');

    // Fix hyphenation
    text = text.replace(/(\w+)-\s+(\w+)/g, '$1$2');

    // Fix ligatures (fi, fl, etc.)
    text = text.replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl');

    return text;
  }
}
```

### 3. PDF Image Extraction

```typescript
// lib/pdf/imageExtractor.ts

export class PDFImageExtractor {
  async extractImages(pdf: PDFDocumentProxy): Promise<ExtractedImage[]> {
    const images: ExtractedImage[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const operatorList = await page.getOperatorList();

      // Find image operations
      for (let i = 0; i < operatorList.fnArray.length; i++) {
        if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
          const imageName = operatorList.argsArray[i][0];
          const image = await this.extractImage(page, imageName);

          if (image) {
            images.push({
              id: generateUUID(),
              pdfId: '', // Set later
              pageNumber: pageNum,
              imageName,
              dataUrl: image.dataUrl,
              width: image.width,
              height: image.height,
              format: image.format,
              size: image.size,
            });
          }
        }
      }
    }

    return images;
  }

  private async extractImage(
    page: PDFPageProxy,
    imageName: string
  ): Promise<ImageData | null> {
    try {
      const resources = await page.getOperatorList();
      // Get image data from resources
      // Convert to base64 data URL
      // Return image metadata
      return imageData;
    } catch (error) {
      console.error(`Failed to extract image ${imageName}:`, error);
      return null;
    }
  }

  async generateThumbnail(
    pdf: PDFDocumentProxy,
    width: number = 200
  ): Promise<string> {
    const page = await pdf.getPage(1); // First page
    const viewport = page.getViewport({ scale: 1 });
    const scale = width / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    // Render page to canvas
    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
    }).promise;

    // Convert to data URL
    return canvas.toDataURL('image/jpeg', 0.8);
  }
}
```

### 4. Search Engine

```typescript
// lib/search/searchEngine.ts

export class PDFSearchEngine {
  private index: Map<string, SearchIndex> = new Map();

  // Build search index
  async buildIndex(pdf: PDFDocument): Promise<void> {
    const index: SearchIndex = {
      pdfId: pdf.id,
      pages: [],
      words: new Map(),
    };

    // Index each page
    pdf.extractedText.forEach((page, pageNum) => {
      const words = this.tokenize(page.rawText);

      words.forEach(word => {
        const normalized = word.toLowerCase();

        if (!index.words.has(normalized)) {
          index.words.set(normalized, []);
        }

        index.words.get(normalized)!.push({
          pageNumber: pageNum + 1,
          position: page.rawText.indexOf(word),
        });
      });
    });

    this.index.set(pdf.id, index);
  }

  // Search within document
  async search(
    pdfId: string,
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    const index = this.index.get(pdfId);
    if (!index) return [];

    const results: SearchResult[] = [];
    const searchTerms = this.tokenize(query);

    searchTerms.forEach(term => {
      const normalized = options.caseSensitive ? term : term.toLowerCase();
      const matches = index.words.get(normalized) || [];

      matches.forEach(match => {
        results.push({
          pageNumber: match.pageNumber,
          position: match.position,
          context: this.getContext(pdfId, match),
          highlightText: term,
        });
      });
    });

    return this.rankResults(results);
  }

  // Global search across all PDFs
  async globalSearch(
    query: string,
    options: SearchOptions = {}
  ): Promise<GlobalSearchResult[]> {
    const allResults: GlobalSearchResult[] = [];

    for (const [pdfId, index] of this.index) {
      const results = await this.search(pdfId, query, options);

      if (results.length > 0) {
        allResults.push({
          pdfId,
          results,
          totalMatches: results.length,
        });
      }
    }

    return allResults;
  }

  private tokenize(text: string): string[] {
    return text
      .split(/\s+/)
      .map(word => word.replace(/[^\w]/g, ''))
      .filter(word => word.length > 0);
  }

  private rankResults(results: SearchResult[]): SearchResult[] {
    // Implement ranking algorithm (TF-IDF, BM25, etc.)
    return results.sort((a, b) => b.relevance - a.relevance);
  }
}
```

### 5. Reading Progress Tracker

```typescript
// lib/tracking/progressTracker.ts

export class ReadingProgressTracker {
  private sessions: Map<string, ReadingSession> = new Map();

  // Start reading session
  startSession(pdfId: string, startPage: number): string {
    const sessionId = generateUUID();
    const session: ReadingSession = {
      id: sessionId,
      pdfId,
      startTime: new Date(),
      startPage,
      currentPage: startPage,
      pagesRead: 0,
      duration: 0,
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  // Update session
  updatePage(sessionId: string, pageNumber: number): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const previousPage = session.currentPage;
    session.currentPage = pageNumber;

    if (pageNumber > previousPage) {
      session.pagesRead += (pageNumber - previousPage);
    }

    // Update duration
    session.duration = Date.now() - session.startTime.getTime();
  }

  // End session
  async endSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.endTime = new Date();
    session.endPage = session.currentPage;

    // Save to database
    await db.saveReadingSession(session);

    // Update PDF reading progress
    await this.updatePDFProgress(session.pdfId, session);

    // Remove from active sessions
    this.sessions.delete(sessionId);
  }

  private async updatePDFProgress(
    pdfId: string,
    session: ReadingSession
  ): Promise<void> {
    const pdf = await db.getPDF(pdfId);
    if (!pdf) return;

    // Update total reading time
    pdf.totalReadingTime += session.duration / 1000;

    // Update current page
    pdf.currentPage = session.endPage;

    // Calculate progress percentage
    pdf.readingProgress = (session.endPage / pdf.metadata.pageCount) * 100;

    // Update last read time
    pdf.lastRead = new Date();

    // Save updates
    await db.updatePDF(pdfId, pdf);
  }

  // Get reading statistics
  async getStatistics(pdfId: string): Promise<ReadingStatistics> {
    const sessions = await db.getReadingSessions(pdfId);
    const pdf = await db.getPDF(pdfId);

    if (!pdf) throw new Error('PDF not found');

    return {
      totalReadingTime: pdf.totalReadingTime,
      sessionsCount: sessions.length,
      averageSessionDuration: sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length,
      pagesRead: pdf.currentPage,
      pagesRemaining: pdf.metadata.pageCount - pdf.currentPage,
      progress: pdf.readingProgress,
      estimatedTimeRemaining: this.calculateEstimatedTime(sessions, pdf),
      readingSpeed: this.calculateReadingSpeed(sessions),
    };
  }

  private calculateEstimatedTime(
    sessions: ReadingSession[],
    pdf: PDFDocument
  ): number {
    // Calculate average reading speed (pages per minute)
    const totalPages = sessions.reduce((acc, s) => acc + s.pagesRead, 0);
    const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0);
    const pagesPerMinute = totalPages / (totalTime / 60000);

    // Estimate time for remaining pages
    const remainingPages = pdf.metadata.pageCount - pdf.currentPage;
    return remainingPages / pagesPerMinute;
  }

  private calculateReadingSpeed(sessions: ReadingSession[]): number {
    const totalPages = sessions.reduce((acc, s) => acc + s.pagesRead, 0);
    const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0);
    return totalPages / (totalTime / 60000); // pages per minute
  }
}
```

### 6. Bookmark & Annotation Manager

```typescript
// lib/features/annotationManager.ts

export class AnnotationManager {
  // Bookmark operations
  async addBookmark(
    pdfId: string,
    pageNumber: number,
    options?: BookmarkOptions
  ): Promise<Bookmark> {
    const bookmark: Bookmark = {
      id: generateUUID(),
      pdfId,
      pageNumber,
      label: options?.label,
      note: options?.note,
      color: options?.color || '#3b82f6',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.addBookmark(bookmark);
    return bookmark;
  }

  async getBookmarks(pdfId: string): Promise<Bookmark[]> {
    return await db.getBookmarks(pdfId);
  }

  async deleteBookmark(id: string): Promise<void> {
    await db.deleteBookmark(id);
  }

  // Highlight operations
  async addHighlight(
    pdfId: string,
    pageNumber: number,
    selection: TextSelection,
    color: string = '#ffeb3b'
  ): Promise<Highlight> {
    const highlight: Highlight = {
      id: generateUUID(),
      pdfId,
      pageNumber,
      text: selection.text,
      selectedText: selection.selectedText,
      position: selection.position,
      color,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.addHighlight(highlight);
    return highlight;
  }

  async getHighlights(pdfId: string): Promise<Highlight[]> {
    return await db.getHighlights(pdfId);
  }

  async deleteHighlight(id: string): Promise<void> {
    await db.deleteHighlight(id);
  }

  // Annotation (note) operations
  async addAnnotation(
    pdfId: string,
    pageNumber: number,
    content: string,
    options?: AnnotationOptions
  ): Promise<Annotation> {
    const annotation: Annotation = {
      id: generateUUID(),
      pdfId,
      pageNumber,
      content,
      position: options?.position,
      highlightId: options?.highlightId,
      tags: options?.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.addAnnotation(annotation);
    return annotation;
  }

  async getAnnotations(pdfId: string): Promise<Annotation[]> {
    return await db.getAnnotations(pdfId);
  }

  async updateAnnotation(
    id: string,
    updates: Partial<Annotation>
  ): Promise<void> {
    await db.updateAnnotation(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async deleteAnnotation(id: string): Promise<void> {
    await db.deleteAnnotation(id);
  }

  // Export annotations
  async exportAnnotations(pdfId: string): Promise<ExportData> {
    const bookmarks = await this.getBookmarks(pdfId);
    const highlights = await this.getHighlights(pdfId);
    const annotations = await this.getAnnotations(pdfId);

    return {
      pdfId,
      exportDate: new Date(),
      bookmarks,
      highlights,
      annotations,
    };
  }
}
```

### 7. Collection & Tag Manager

```typescript
// lib/features/collectionManager.ts

export class CollectionManager {
  async createCollection(name: string, options?: CollectionOptions): Promise<Collection> {
    const collection: Collection = {
      id: generateUUID(),
      name,
      description: options?.description,
      color: options?.color,
      icon: options?.icon,
      parentId: options?.parentId,
      pdfIds: [],
      sortOrder: options?.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.createCollection(collection);
    return collection;
  }

  async getCollections(): Promise<Collection[]> {
    return await db.getCollections();
  }

  async addPDFToCollection(pdfId: string, collectionId: string): Promise<void> {
    await db.addPDFToCollection(pdfId, collectionId);

    // Update PDF collections array
    const pdf = await db.getPDF(pdfId);
    if (pdf && !pdf.collections.includes(collectionId)) {
      pdf.collections.push(collectionId);
      await db.updatePDF(pdfId, pdf);
    }
  }

  async removePDFFromCollection(pdfId: string, collectionId: string): Promise<void> {
    await db.removePDFFromCollection(pdfId, collectionId);

    // Update PDF collections array
    const pdf = await db.getPDF(pdfId);
    if (pdf) {
      pdf.collections = pdf.collections.filter(id => id !== collectionId);
      await db.updatePDF(pdfId, pdf);
    }
  }

  async deleteCollection(id: string): Promise<void> {
    const collection = await db.getCollection(id);
    if (!collection) return;

    // Remove collection from all PDFs
    for (const pdfId of collection.pdfIds) {
      await this.removePDFFromCollection(pdfId, id);
    }

    await db.deleteCollection(id);
  }
}
```

---

## 🔄 Data Flow

### PDF Upload Flow

```
User selects file
       ↓
Validate file (type, size)
       ↓
Read file as ArrayBuffer
       ↓
Load PDF with PDF.js
       ↓
Extract text (all pages)
       ↓
Extract images (all pages)
       ↓
Extract outline/TOC
       ↓
Extract metadata
       ↓
Generate thumbnail
       ↓
Create PDFDocument object
       ↓
Save to IndexedDB
       ↓
Update UI/Library
```

### Reading Session Flow

```
User opens PDF
       ↓
Load PDF from IndexedDB
       ↓
Start reading session
       ↓
Track page changes
       ↓
Update progress
       ↓
Auto-save every 30s
       ↓
User closes PDF
       ↓
End session
       ↓
Save final progress
```

---

## 🚀 Performance Optimizations

### 1. Lazy Loading
- Load PDF pages on-demand
- Render only visible pages
- Unload off-screen pages

### 2. Web Workers
- PDF parsing in background thread
- Text extraction in worker
- Search indexing in worker

### 3. Caching
- Cache rendered pages
- Cache extracted text
- Cache search results

### 4. Compression
- Compress extracted text
- Compress images (thumbnail quality)
- Compress metadata

---

## 🔒 Security Features

### 1. Input Validation
- File type validation
- File size limits
- Malicious PDF detection

### 2. Data Sanitization
- XSS prevention in annotations
- Safe HTML rendering
- Secure file handling

### 3. Privacy
- No external API calls
- No telemetry
- Local-only storage

---

## 📊 Monitoring & Logging

```typescript
// lib/monitoring/logger.ts

export class Logger {
  log(level: 'info' | 'warn' | 'error', message: string, data?: any): void {
    const entry = {
      timestamp: new Date(),
      level,
      message,
      data,
    };

    // Store in IndexedDB
    // Limit to last 1000 entries
  }

  async getLogs(filters?: LogFilters): Promise<LogEntry[]> {
    // Retrieve logs from storage
    return logs;
  }

  async exportLogs(): Promise<string> {
    const logs = await this.getLogs();
    return JSON.stringify(logs, null, 2);
  }
}
```

---

## ✅ Summary

This backend architecture provides:

- **Robust data storage** with IndexedDB and localStorage
- **Efficient PDF processing** with PDF.js
- **Advanced search** with custom indexing
- **Progress tracking** for reading analytics
- **Annotation system** for bookmarks, highlights, notes
- **Collection management** for organization
- **Performance optimization** with caching and lazy loading
- **Security** with validation and sanitization
- **Privacy** with local-only storage

All features run client-side, providing a fast, private, and offline-capable PDF reading experience.
