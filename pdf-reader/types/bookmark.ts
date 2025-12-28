export interface Bookmark {
  id: string;
  pdfId: string;
  pageNumber: number;
  position?: {
    x: number;
    y: number;
  };
  label?: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

export interface Highlight {
  id: string;
  pdfId: string;
  pageNumber: number;
  text: string;
  selectedText: string;
  position: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  color: string;
  category?: 'important' | 'question' | 'note' | 'reference';
  createdAt: Date;
  updatedAt: Date;
}

export interface Annotation {
  id: string;
  pdfId: string;
  pageNumber: number;
  content: string;
  position?: {
    x: number;
    y: number;
  };
  highlightId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
