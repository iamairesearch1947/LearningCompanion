# 📄 PDF Reader - Kindle-like eReader for PDFs

A modern, feature-rich PDF reader application with Kindle-like reading experience, built with Next.js, TypeScript, PDF.js, and React Markdown. Upload PDFs from your desktop, extract text and images in elegant format, and enjoy a premium reading experience with all the features of a professional eReader.

![PDF Reader](https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=400&fit=crop)

---

## ✨ Key Features

### 📤 PDF Upload & Management

#### Upload
- **Drag & Drop Upload** - Simply drag PDFs into the browser
- **Browse Upload** - Traditional file picker for selecting PDFs
- **Multi-file Support** - Upload multiple PDFs at once
- **Progress Tracking** - Real-time upload progress indicators
- **File Validation** - Automatic validation of file type and size (max 50MB)

#### Library Management
- **Beautiful Grid View** - Visual library with PDF thumbnails
- **List View** - Detailed list with metadata
- **Smart Search** - Search by title, author, or content
- **Sort & Filter** - Sort by date, name, reading progress
- **Collections** - Organize PDFs into collections/folders
- **Tags** - Label and categorize your documents
- **Favorites** - Star important documents
- **Recent** - Quick access to recently read PDFs

### 📖 Advanced Text & Image Extraction

#### Intelligent Text Processing
- **Smart Text Extraction** - Extract all text from PDFs
- **Structure Preservation** - Maintain headings, paragraphs, lists
- **Formatting Detection** - Detect bold, italic, code blocks
- **Clean Output** - Remove PDF artifacts and fix spacing
- **Markdown Conversion** - Convert to beautiful, readable markdown
- **Multi-column Support** - Handle complex layouts

#### Image Handling
- **Image Extraction** - Extract all embedded images
- **High Quality** - Preserve original image quality
- **Inline Images** - Images positioned correctly in text
- **Image Gallery** - Browse all extracted images
- **Caption Detection** - Associate captions with images

### 🎨 Premium Reading Experience

#### Kindle-like Interface
- **Clean, Distraction-free** - Focus on your reading
- **Smooth Page Turns** - Beautiful page transition animations
- **Multiple Reading Modes**:
  - Single page mode
  - Continuous scroll mode
  - Two-page spread (desktop)
- **Auto-fit Pages** - Automatically fit content to screen
- **Collapsible UI** - Hide controls for immersive reading

#### Navigation
- **Page Navigation** - Click arrows or use keyboard
- **Keyboard Shortcuts**:
  - `→` / `Space` - Next page
  - `←` - Previous page
  - `Home` - First page
  - `End` - Last page
  - `Esc` - Close reader
- **Swipe Gestures** - Touch-friendly navigation
- **Jump to Page** - Enter page number directly
- **Table of Contents** - Navigate by chapters/sections
- **Progress Slider** - Scrub through document

### 🎛️ Extensive Customization

#### Font Settings
- **Font Size** - 12px to 32px (adjustable)
- **Font Family** - Serif, Sans-serif, Monospace, Custom fonts
- **Font Weight** - Light, Regular, Bold
- **Letter Spacing** - Adjust character spacing
- **Word Spacing** - Adjust word spacing
- **Line Height** - 1.0 to 3.0 (adjustable)
- **Text Alignment** - Left, Center, Justify

#### Visual Themes
- **Light Theme** - Classic white background, black text
- **Sepia Theme** - Warm, paper-like experience (default)
- **Dark Theme** - Easy on eyes for night reading
- **High Contrast** - Enhanced readability
- **Custom Themes** - Create your own color schemes

#### Display Settings
- **Brightness Control** - Adjust screen brightness
- **Blue Light Filter** - Reduce eye strain
- **Night Mode** - Automatic dark mode scheduling
- **Margin Width** - Adjust reading area margins
- **Page Width** - Control content width

### 📍 Bookmarks & Annotations

#### Bookmarks
- **Quick Bookmark** - One-click to bookmark current page
- **Multiple Bookmarks** - Unlimited bookmarks per PDF
- **Bookmark Labels** - Name your bookmarks
- **Bookmark Notes** - Add notes to bookmarks
- **Color-coded** - Organize with colors
- **Bookmark List** - View all bookmarks
- **Jump to Bookmark** - Quick navigation

#### Highlights
- **Text Highlighting** - Select and highlight text
- **Multiple Colors** - Yellow, green, blue, pink, orange
- **Highlight Categories**:
  - Important (red)
  - Question (purple)
  - Note (yellow)
  - Reference (green)
- **View All Highlights** - Browse all highlights
- **Export Highlights** - Save to file

#### Notes & Annotations
- **Page Notes** - Add notes to any page
- **Highlight Notes** - Attach notes to highlights
- **Rich Text** - Markdown support in notes
- **Timestamp** - Automatic date/time stamps
- **Edit/Delete** - Full note management
- **Search Notes** - Find notes quickly
- **Export Notes** - Export all annotations

### 🔍 Powerful Search

#### In-Document Search
- **Full-Text Search** - Search entire document
- **Highlight Results** - Visual result highlighting
- **Navigate Matches** - Jump between results
- **Match Count** - See total matches
- **Case Sensitive** - Optional case-sensitive search
- **Whole Word** - Match whole words only
- **Regex Support** - Advanced search patterns

#### Library Search
- **Global Search** - Search across all PDFs
- **Search in Notes** - Find text in annotations
- **Search History** - Recent searches saved
- **Search Filters** - Filter by date, collection, tags

### 📊 Reading Analytics

#### Progress Tracking
- **Current Page / Total Pages** - Always visible
- **Percentage Complete** - Visual progress indicator
- **Reading Time** - Track time spent reading
- **Pages per Session** - Session statistics
- **Reading Speed** - Pages per minute calculation
- **Time Remaining** - Estimated time to finish

#### Statistics Dashboard
- **Daily Reading** - Pages read today
- **Weekly Report** - 7-day reading summary
- **Monthly Stats** - Long-term tracking
- **Reading Streaks** - Consecutive days reading
- **Reading Goals** - Set and track goals
- **Charts & Graphs** - Visual analytics

### 🌟 Additional Features

#### Dictionary & Lookup
- **Word Definition** - Long-press for definition
- **Translation** - Translate words/phrases
- **Wikipedia** - Quick Wikipedia lookup
- **Vocabulary List** - Save words for learning

#### Sharing & Export
- **Quote Sharing** - Share selected text
- **Social Media** - Direct social sharing
- **Copy Text** - Copy to clipboard
- **Export Highlights** - Save highlights to file
- **Export Notes** - Export all annotations
- **Export as Markdown** - Export extracted text
- **Print** - Print pages or selections

#### Smart Features
- **Auto-Scroll** - Automatic scrolling
- **Read Aloud** (Future) - Text-to-speech
- **Night Scheduler** - Auto dark mode
- **Resume Reading** - Continue where you left off
- **Cloud Sync** (Future) - Sync across devices

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd pdf-reader
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Docker Support (Optional)

```bash
# Build Docker image
docker build -t pdf-reader .

# Run container
docker run -p 3000:3000 pdf-reader
```

---

## 📂 Project Structure

```
pdf-reader/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main app entry point
│   ├── globals.css             # Global styles
│   └── api/
│       └── pdf/
│           └── extract/
│               └── route.ts    # PDF extraction API endpoint
│
├── components/
│   ├── upload/
│   │   ├── UploadZone.tsx     # Drag & drop upload component
│   │   ├── FileList.tsx       # Uploaded files list
│   │   └── UploadProgress.tsx # Upload progress indicator
│   │
│   ├── library/
│   │   ├── Library.tsx        # Main library view
│   │   ├── PDFCard.tsx        # PDF item card component
│   │   ├── GridView.tsx       # Grid layout
│   │   ├── ListView.tsx       # List layout
│   │   └── LibraryHeader.tsx  # Library header with search
│   │
│   ├── reader/
│   │   ├── PDFReader.tsx      # Main reader component
│   │   ├── ReaderControls.tsx # Reading controls
│   │   ├── PageNavigation.tsx # Page navigation arrows
│   │   ├── ProgressBar.tsx    # Reading progress bar
│   │   └── ReaderSettings.tsx # Settings panel
│   │
│   ├── content/
│   │   ├── ContentRenderer.tsx # Render extracted content
│   │   ├── MarkdownView.tsx   # Markdown rendering
│   │   ├── PDFView.tsx        # Raw PDF rendering
│   │   └── ImageGallery.tsx   # Extracted images gallery
│   │
│   ├── features/
│   │   ├── Bookmarks.tsx      # Bookmark management
│   │   ├── Highlights.tsx     # Highlighting system
│   │   ├── Notes.tsx          # Notes panel
│   │   ├── Search.tsx         # Search interface
│   │   ├── TableOfContents.tsx # TOC navigation
│   │   └── Dictionary.tsx     # Dictionary lookup
│   │
│   └── ui/
│       ├── Button.tsx         # Reusable button component
│       ├── Modal.tsx          # Modal dialog
│       ├── Dropdown.tsx       # Dropdown menu
│       ├── Slider.tsx         # Range slider
│       └── Tooltip.tsx        # Tooltip component
│
├── lib/
│   ├── pdf/
│   │   ├── loader.ts          # PDF.js loader configuration
│   │   ├── extractor.ts       # Text & image extraction
│   │   ├── parser.ts          # PDF parsing utilities
│   │   └── renderer.ts        # PDF rendering utilities
│   │
│   ├── storage/
│   │   ├── indexedDB.ts       # IndexedDB operations
│   │   ├── localStorage.ts    # localStorage utilities
│   │   └── cache.ts           # Caching layer
│   │
│   ├── markdown/
│   │   ├── converter.ts       # PDF to Markdown converter
│   │   └── renderer.ts        # Markdown rendering config
│   │
│   └── utils/
│       ├── fileUtils.ts       # File handling utilities
│       ├── textUtils.ts       # Text processing utilities
│       ├── formatUtils.ts     # Formatting helpers
│       └── dateUtils.ts       # Date utilities
│
├── contexts/
│   ├── PDFContext.tsx         # PDF state management
│   ├── ReaderContext.tsx      # Reader settings context
│   └── LibraryContext.tsx     # Library state context
│
├── types/
│   ├── pdf.ts                 # PDF-related TypeScript types
│   ├── reader.ts              # Reader types
│   ├── bookmark.ts            # Bookmark types
│   ├── highlight.ts           # Highlight types
│   └── storage.ts             # Storage types
│
├── hooks/
│   ├── usePDFExtraction.ts    # PDF extraction hook
│   ├── useLocalStorage.ts     # localStorage hook
│   ├── useIndexedDB.ts        # IndexedDB hook
│   ├── useKeyboard.ts         # Keyboard navigation hook
│   └── useReadingProgress.ts # Progress tracking hook
│
├── styles/
│   ├── themes/
│   │   ├── light.css          # Light theme styles
│   │   ├── sepia.css          # Sepia theme styles
│   │   └── dark.css           # Dark theme styles
│   └── reader.css             # Reader-specific styles
│
├── public/
│   ├── fonts/                 # Custom fonts
│   ├── icons/                 # App icons
│   └── pdf.worker.js          # PDF.js worker file
│
├── tests/
│   ├── components/            # Component tests
│   ├── lib/                   # Library tests
│   └── integration/           # Integration tests
│
├── data/
│   └── sample.pdf             # Sample PDF for testing
│
├── .env.example               # Environment variables template
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── .gitignore                 # Git ignore file
└── README.md                  # This file
```

---

## 🛠️ Technology Stack

### Core Technologies
- **Next.js 15+** - React framework with App Router
- **React 19+** - UI component library
- **TypeScript 5+** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### PDF Processing
- **PDF.js** - Mozilla's PDF rendering engine
- **pdfjs-dist** - PDF.js distribution package
- **react-pdf** - React wrapper for PDF.js

### Text Processing
- **React Markdown** - Markdown rendering component
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-raw** - HTML in markdown support

### Storage & State
- **IndexedDB** - Browser-based database
- **idb** - Promise-based IndexedDB wrapper
- **React Context API** - Global state management

### UI Components
- **Lucide React** - Beautiful icon library
- **Radix UI** - Headless UI components
- **Framer Motion** - Animation library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Playwright** - E2E testing

---

## 🎯 Usage Guide

### Uploading PDFs

1. **Drag & Drop**:
   - Open the application
   - Drag PDF files from your desktop
   - Drop them into the upload zone
   - Wait for processing to complete

2. **Browse Upload**:
   - Click "Upload PDF" button
   - Select one or more PDF files
   - Click "Open"
   - Files will be processed automatically

### Reading PDFs

1. **Open a PDF**:
   - Click on any PDF card in the library
   - PDF will open in full-screen reader

2. **Navigate Pages**:
   - Click left/right arrows
   - Use keyboard shortcuts (← →)
   - Swipe on touch devices
   - Use page slider at bottom

3. **Customize Reading**:
   - Click settings icon (gear)
   - Adjust font size, family, theme
   - Save settings automatically

### Adding Bookmarks

1. Click bookmark icon in top bar
2. Bookmark is saved automatically
3. View all bookmarks in sidebar
4. Click bookmark to jump to page

### Highlighting Text

1. Select text with mouse/touch
2. Choose highlight color from popup
3. Highlight is saved automatically
4. View all highlights in sidebar

### Adding Notes

1. Click note icon in top bar
2. Enter note content (markdown supported)
3. Save note
4. View all notes in sidebar

### Searching

1. Click search icon (or press Ctrl+F)
2. Enter search query
3. Navigate through results
4. Use filters for advanced search

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Application
NEXT_PUBLIC_APP_NAME=PDF Reader
NEXT_PUBLIC_MAX_FILE_SIZE=52428800  # 50MB in bytes

# Storage
NEXT_PUBLIC_DB_NAME=PDFReaderDB
NEXT_PUBLIC_CACHE_SIZE=104857600    # 100MB in bytes

# Features
NEXT_PUBLIC_ENABLE_OCR=false
NEXT_PUBLIC_ENABLE_CLOUD_SYNC=false
```

### Customizing Themes

Edit `/styles/themes/custom.css`:

```css
.theme-custom {
  --bg-color: #f0f0f0;
  --text-color: #333333;
  --accent-color: #007bff;
  --border-color: #cccccc;
}
```

### Adding Custom Fonts

1. Place font files in `/public/fonts/`
2. Add font-face in `/app/globals.css`
3. Add font option in reader settings

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click
4. Automatic HTTPS and CDN

### Other Platforms

- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack deployment
- **Cloudflare Pages** - Edge deployment
- **Docker** - Containerized deployment

---

## 📱 Browser Support

- **Chrome** 90+ (recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### Required Features
- IndexedDB support
- Web Workers
- ES2020+ JavaScript
- CSS Grid & Flexbox

---

## 🔒 Privacy & Security

### Data Privacy
- **100% Local** - All data stays on your device
- **No Cloud Storage** - No data sent to servers
- **No Tracking** - Zero analytics or tracking
- **No Cookies** - No tracking cookies
- **Offline-first** - Works without internet

### Security Features
- **Input Validation** - File type and size checks
- **XSS Prevention** - Safe HTML rendering
- **CSP Headers** - Content Security Policy
- **Secure Storage** - Encrypted IndexedDB option

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/pdf-reader.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Make your changes
6. Run tests:
   ```bash
   npm test
   ```
7. Commit and push:
   ```bash
   git commit -m "Add your feature"
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow Airbnb style guide
- Write tests for new features
- Update documentation

---

## 🐛 Troubleshooting

### PDF Won't Upload
- Check file is valid PDF (not corrupted)
- Ensure file size < 50MB
- Try different PDF file
- Clear browser cache

### Slow Performance
- Close unused PDFs
- Clear cache: Settings → Clear Cache
- Reduce cache size in settings
- Use smaller PDF files

### Text Extraction Issues
- Some PDFs use images (need OCR)
- Complex layouts may have issues
- Try different extraction settings
- Report issue with sample PDF

### Storage Full
- Delete unused PDFs
- Clear cached data
- Export important annotations
- Increase storage quota

---

## 📚 Resources

### Documentation
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### Tutorials
- [Getting Started Video](#)
- [Advanced Features Guide](#)
- [Customization Tutorial](#)
- [API Documentation](#)

---

## 🗺️ Roadmap

### Version 2.0
- [ ] OCR for scanned PDFs
- [ ] Cloud sync (optional)
- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered summaries
- [ ] Collaborative annotations
- [ ] Advanced search (semantic)
- [ ] Export to EPUB/MOBI
- [ ] Integration with note apps

### Version 3.0
- [ ] Voice reading (TTS)
- [ ] Voice commands
- [ ] AR reading mode
- [ ] Social features
- [ ] AI study assistant
- [ ] Spaced repetition
- [ ] Citation management
- [ ] Academic paper analysis

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **PDF.js** - Mozilla's excellent PDF rendering library
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Beautiful utility-first CSS
- **Lucide** - Clean and consistent icons
- **Community** - All contributors and users

### Inspiration
- Amazon Kindle
- Apple Books
- Adobe Acrobat Reader
- Google Play Books
- Calibre eReader

---

## 📧 Support

### Get Help
- **Documentation** - Check this README and docs
- **Issues** - [GitHub Issues](https://github.com/yourusername/pdf-reader/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/pdf-reader/discussions)
- **Email** - support@pdfreader.app

### Report Bugs
Please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Sample PDF (if possible)

---

## ⭐ Show Your Support

If you find this project helpful:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔀 Submit pull requests
- 📢 Share with others

---

**Happy Reading!** 📖✨

Built with ❤️ using Next.js, TypeScript, and PDF.js

---

## 🎬 Quick Start Video

[Coming Soon]

## 📸 Screenshots

### Library View
![Library](docs/screenshots/library.png)

### Reader Interface
![Reader](docs/screenshots/reader.png)

### Highlights & Notes
![Annotations](docs/screenshots/annotations.png)

### Settings Panel
![Settings](docs/screenshots/settings.png)

---

**Made for readers, by readers** 📚
