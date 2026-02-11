"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Hide Navbar on Home Page
    if (pathname === '/') return null;

    const getLinkClass = (path: string) => {
        const baseClass = "hover:text-gray-500 transition-colors";
        const activeClass = "border-b border-black pb-0.5 text-black";
        return pathname.startsWith(path) ? `${baseClass} ${activeClass}` : baseClass;
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-wide uppercase">
                Mooon Art
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest">
                <Link href="/about" className={getLinkClass('/about')}>ABOUT</Link>
                <Link href="/exhibition" className={getLinkClass('/exhibition')}>EXHIBITION</Link>
                <Link href="/products" className={getLinkClass('/products')}>DRAWINGS</Link>
                <a href="https://www.instagram.com/painting_mooon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">
                    <Instagram size={20} />
                </a>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={toggleMenu} className="md:hidden text-black focus:outline-none">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white flex flex-col items-center py-8 space-y-6 text-sm font-medium tracking-widest shadow-lg md:hidden border-t border-gray-100">
                    <Link href="/about" onClick={toggleMenu} className="block py-2">ABOUT</Link>
                    <Link href="/exhibition" onClick={toggleMenu} className="block py-2">EXHIBITION</Link>
                    <Link href="/products" onClick={toggleMenu} className="block py-2">DRAWINGS</Link>
                    <a href="https://www.instagram.com/painting_mooon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                        <Instagram size={20} />
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
