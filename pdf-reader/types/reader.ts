export interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  theme: 'light' | 'sepia' | 'dark';
  lineHeight: number;
  marginWidth: number;
  brightness: number;
  pageMode: 'single' | 'scroll' | 'spread';
  autoSave: boolean;
  animations: boolean;
}

export interface ReadingProgress {
  pdfId: string;
  currentPage: number;
  totalPages: number;
  percentage: number;
  lastRead: Date;
}

export interface ReadingSession {
  id: string;
  pdfId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  pagesRead: number;
  startPage: number;
  endPage: number;
}
