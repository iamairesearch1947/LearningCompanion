export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  content: string[];
  totalPages: number;
  description?: string;
  publishedDate?: string;
  genre?: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  percentage: number;
  lastRead: Date;
}

export interface Bookmark {
  bookId: string;
  page: number;
  note?: string;
  createdAt: Date;
}

export interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  theme: 'light' | 'sepia' | 'dark';
  lineHeight: number;
  brightness: number;
}
