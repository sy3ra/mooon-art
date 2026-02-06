import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mooon Art',
  description: 'Curated drawing exhibitions and sales.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          {/* Footer placeholder */}
          <footer className="bg-white py-12 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-xs tracking-widest uppercase">© 2026 Mooon Art. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
