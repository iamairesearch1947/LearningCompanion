# 📚 Kindle Reader - Digital eReader

A beautiful, feature-rich eReader application inspired by Amazon Kindle, built with Next.js, TypeScript, and Tailwind CSS.

![Kindle Reader](https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 Reading Experience
- **Clean, distraction-free reading interface** - Just you and your book
- **Page turning with smooth transitions** - Click arrows or use keyboard navigation
- **Progress tracking** - Automatically saves your reading position
- **Responsive design** - Reads beautifully on desktop, tablet, and mobile

### 🎛️ Customization Options
- **Font size adjustment** (14px - 28px) - Find your perfect reading size
- **Multiple font families** - Serif, Sans-serif, and Monospace options
- **Three reading themes**:
  - 💡 Light theme - Classic white background
  - 📜 Sepia theme - Warm, paper-like experience (default)
  - 🌙 Dark theme - Easy on the eyes for night reading
- **Line height control** - Adjust spacing for comfortable reading

### 📖 Book Management
- **Beautiful library view** - Grid display of your book collection
- **Book covers with metadata** - See title, author, genre, and page count
- **Reading progress indicators** - Visual progress bars and percentages
- **Bookmark system** - Save and return to important pages
- **Persistent storage** - All progress saved to browser localStorage

### ⌨️ Keyboard Navigation
- `→` Arrow Right - Next page
- `←` Arrow Left - Previous page
- `Space` - Next page
- `Esc` - Return to library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd kindle-reader
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

## 📂 Project Structure

```
kindle-reader/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main app entry point
│   └── globals.css         # Global styles
├── components/
│   ├── Library.tsx         # Book library grid view
│   └── Reader.tsx          # Main reading interface
├── data/
│   └── sampleBooks.ts      # Sample book content
├── types/
│   └── book.ts             # TypeScript interfaces
└── README.md               # This file
```

## 🎯 Key Components

### Library Component
Displays all available books in an elegant grid layout with:
- Book covers with hover effects
- Reading progress indicators
- Book metadata (author, genre, page count)
- Click to open any book

### Reader Component
The main reading interface featuring:
- Full-screen immersive reading experience
- Top navigation bar (collapsible)
- Reading controls and settings panel
- Bottom progress bar
- Bookmark functionality
- Page navigation controls

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **localStorage** - Client-side persistence

## 📱 Features in Detail

### Reading Progress
- Automatically saves current page on every navigation
- Shows percentage complete in library view
- Visual progress bar in reader interface
- Resume reading from where you left off

### Bookmarks
- Click bookmark icon to save current page
- Bookmarks persist across sessions
- Visual indicator for bookmarked pages
- Easy access to saved pages

### Theme System
Three carefully designed themes:
1. **Light** - White background, black text
2. **Sepia** - Warm beige (#f4ecd8), brown text
3. **Dark** - Dark gray background, light text

### Responsive Design
- Desktop: Full-width reading experience
- Tablet: Optimized for touch navigation
- Mobile: Stack layout with easy controls

## 🎨 Customization

### Adding Your Own Books

Edit `/data/sampleBooks.ts` and add new book objects:

```typescript
{
  id: '4',
  title: 'Your Book Title',
  author: 'Author Name',
  cover: 'https://your-cover-image-url.jpg',
  description: 'Book description',
  publishedDate: '2024-01-01',
  genre: 'Genre',
  totalPages: 10,
  content: [
    'Chapter 1 content...',
    'Chapter 2 content...',
    // Add more pages
  ],
}
```

### Modifying Themes

Edit `/components/Reader.tsx` and update the `getThemeStyles` function:

```typescript
const getThemeStyles = () => {
  switch (settings.theme) {
    case 'your-theme':
      return { bg: 'bg-your-color', text: 'text-your-color' };
    // ...
  }
};
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting platform

## 🔮 Future Enhancements

Potential features to add:
- [ ] Search functionality across books
- [ ] Highlights and annotations
- [ ] Export reading statistics
- [ ] Cloud sync for progress/bookmarks
- [ ] EPUB/PDF file upload support
- [ ] Text-to-speech integration
- [ ] Dictionary lookup
- [ ] Reading goals and streaks
- [ ] Social sharing of quotes
- [ ] Night mode scheduling

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Amazon Kindle
- Sample book content created for demonstration
- Icons by [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Reading!** 📖✨

Built with ❤️ using Next.js and TypeScript
