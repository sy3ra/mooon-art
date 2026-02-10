"use client";

import { useArtwork, Artwork } from '../../../context/ArtworkContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDetailClientProps {
    id: number;
    initialData: Artwork;
}

const ProductDetailClient = ({ id, initialData }: ProductDetailClientProps) => {
    const { artworks } = useArtwork();
    // Prefer data from context (allows Admin updates to be seen), fallback to initialData
    const artwork = artworks.find(a => a.id === id) || initialData;

    return (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24">
            <div className="mb-8">
                <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors tracking-widest uppercase">
                    <ArrowLeft size={16} className="mr-2" /> Back to List
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                {/* Image Section - Sticky on Desktop */}
                <div className="w-full md:w-3/5 lg:w-2/3">
                    <div className="sticky top-32">
                        <div className="relative w-full h-auto" style={{ minHeight: '500px' }}>
                            {/* Use logic to handle string vs StaticImageData if needed, but Next/Image handles mostly */}
                            <Image
                                src={artwork.image}
                                alt={artwork.title}
                                fill
                                className="object-contain bg-gray-50"
                                priority
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col pt-4">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
                        {artwork.title}
                    </h1>
                    <p className="text-gray-500 mb-8 font-serif italic">
                        {artwork.year}
                    </p>

                    <div className="space-y-6 text-sm tracking-wide border-t border-gray-100 pt-8 mb-12">
                        <div className="flex justify-between">
                            <span className="text-gray-400 uppercase text-xs">Material</span>
                            <span className="text-right">{artwork.material}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 uppercase text-xs">Size</span>
                            <span className="text-right">{artwork.size}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-gray-400 uppercase text-xs">Price</span>
                            <span className="text-lg font-medium">{artwork.price}</span>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-xs uppercase text-gray-400 mb-4">Description</h3>
                        <p className="text-gray-600 leading-relaxed font-light">
                            {artwork.description}
                        </p>
                    </div>

                    {artwork.isSoldOut ? (
                        <button disabled className="w-full bg-gray-200 text-gray-500 py-4 uppercase tracking-[0.2em] text-xs cursor-not-allowed">
                            Sold Out
                        </button>
                    ) : artwork.purchaseUrl ? (
                        <a
                            href={artwork.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors text-center block"
                        >
                            Purchase
                        </a>
                    ) : (
                        <a href="mailto:info@mooonart.com" className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors text-center block">
                            Inquire
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailClient;
