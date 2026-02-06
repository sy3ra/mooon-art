import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mobile Design: Full Screen Image with Overlay */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/assets/heroImg.jpeg"
          alt="Mooon Art Hero"
          fill
          className="object-cover"
          priority

        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1
            className="text-4xl font-bold tracking-widest uppercase mb-12 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Mooon Art
          </h1>

          <div className="flex flex-col items-center space-y-6 text-sm tracking-[0.2em] font-medium">
            <Link href="/about" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>ABOUT</Link>
            <Link href="/exhibition" className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>EXHIBITION</Link>
            <Link href="/products" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>DRAWINGS</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="animate-fade-in-up hover:text-gray-300 transition-colors" style={{ animationDelay: '0.5s' }}>
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Design: Split Screen */}
      <div className="hidden md:flex h-full">
        {/* Left Side: Image */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/assets/heroImg.jpeg"
            alt="Mooon Art Hero"
            fill
            className="object-cover"
            priority

          />
        </div>

        {/* Right Side: Navigation */}
        <div className="w-1/2 h-full bg-white flex flex-col items-center justify-center">
          <h1
            className="text-5xl font-bold tracking-widest uppercase mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Mooon Art
          </h1>

          <div className="flex flex-col items-center space-y-8 text-sm tracking-[0.2em] font-medium">
            <Link href="/about" className="hover:text-gray-500 transition-colors animate-fade-in-up" style={{ animationDelay: '0.2s' }}>ABOUT MOOON</Link>
            <Link href="/exhibition" className="hover:text-gray-500 transition-colors animate-fade-in-up" style={{ animationDelay: '0.3s' }}>EXHIBITION</Link>
            <Link href="/products" className="hover:text-gray-500 transition-colors animate-fade-in-up" style={{ animationDelay: '0.4s' }}>DRAWINGS</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

