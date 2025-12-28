import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF Reader - Kindle-like eReader",
  description: "A modern PDF reader with Kindle-like features. Upload, read, and annotate PDFs with an elegant interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
