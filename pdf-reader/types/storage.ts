export interface Collection {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  pdfIds: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CacheEntry {
  key: string;
  value: any;
  timestamp: number;
  ttl?: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CacheStats {
  size: number;
  maxSize: number;
  hits: number;
  misses: number;
  hitRate: number;
}
