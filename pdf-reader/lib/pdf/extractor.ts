import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import type { ExtractedPage, ExtractedImage, PDFMetadata } from '@/types/pdf';

export async function extractText(pdf: PDFDocumentProxy): Promise<ExtractedPage[]> {
  const pages: ExtractedPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    const text = textContent.items
      .map((item: any) => item.str)
      .join(' ');

    // Clean up text
    const cleanedText = text
      .replace(/\s+/g, ' ')
      .trim();

    pages.push({
      pageNumber: i,
      rawText: cleanedText,
      markdown: convertToMarkdown(cleanedText),
      wordCount: cleanedText.split(/\s+/).length,
      characterCount: cleanedText.length,
    });
  }

  return pages;
}

function convertToMarkdown(text: string): string {
  // Basic markdown conversion
  // This is a simplified version - can be enhanced
  return text
    .split('\n\n')
    .map(para => para.trim())
    .filter(para => para.length > 0)
    .join('\n\n');
}

export async function extractImages(pdf: PDFDocumentProxy, pdfId: string): Promise<ExtractedImage[]> {
  const images: ExtractedImage[] = [];

  // Note: Image extraction from PDF is complex
  // This is a placeholder for the actual implementation
  // In a real implementation, you would need to:
  // 1. Get operator list from each page
  // 2. Find image operations
  // 3. Extract and convert images to data URLs

  return images;
}

export async function extractMetadata(pdf: PDFDocumentProxy): Promise<PDFMetadata> {
  const metadata = await pdf.getMetadata();
  const info = metadata.info as any;

  return {
    title: info?.Title,
    author: info?.Author,
    subject: info?.Subject,
    keywords: info?.Keywords?.split(',').map((k: string) => k.trim()),
    creator: info?.Creator,
    producer: info?.Producer,
    creationDate: info?.CreationDate ? new Date(info.CreationDate) : undefined,
    modificationDate: info?.ModDate ? new Date(info.ModDate) : undefined,
    pageCount: pdf.numPages,
    fileVersion: `PDF ${info?.PDFFormatVersion || '1.0'}`,
  };
}

export async function generateThumbnail(
  pdf: PDFDocumentProxy,
  width: number = 200
): Promise<string> {
  try {
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const scale = width / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get canvas context');
    }

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
    }).promise;

    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    // Return a placeholder data URL
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRGPC90ZXh0Pjwvc3ZnPg==';
  }
}
