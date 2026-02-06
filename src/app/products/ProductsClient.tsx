"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useArtwork } from '../../context/ArtworkContext';
import Image from 'next/image';

const ProductsClient = () => {
    const { artworks, categories } = useArtwork();
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    const filteredArtworks = selectedCategory === "ALL"
        ? artworks
        : artworks.filter(art => art.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                    {["ALL", ...categories.filter(c => c !== "ALL")].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-sm tracking-widest uppercase transition-colors duration-300 ${selectedCategory === category
                                ? 'text-black font-medium border-b border-black pb-0.5'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 min-h-[50vh] animate-fade-in-up">
                {filteredArtworks.map((art) => (
                    <Link href={`/products/${art.id}`} key={art.id} className="flex flex-col items-center group cursor-pointer">
                        <div className="w-full aspect-square overflow-hidden bg-gray-50 mb-6 relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                            {art.isSoldOut && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
                                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                        Sold Out
                                    </span>
                                </div>
                            )}
                            <Image
                                src={art.image}
                                alt={art.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                            />
                        </div>
                        <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-900 group-hover:text-gray-600 transition-colors">
                            {art.title}
                        </h3>
                    </Link>
                ))}
            </div>

            {filteredArtworks.length === 0 && (
                <div className="text-center py-20 text-gray-400 text-sm tracking-wide">
                    No artworks found in this category.
                </div>
            )}
        </div>
    );
};

export default ProductsClient;
