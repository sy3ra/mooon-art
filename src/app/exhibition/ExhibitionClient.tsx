"use client";

import { useArtwork } from '../../context/ArtworkContext';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

const ExhibitionClient = () => {
    const { exhibitions } = useArtwork();
    const sortedExhibitions = [...exhibitions].sort((a, b) => b.id - a.id);

    return (
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24">
            <h1 className="text-3xl font-bold uppercase tracking-widest text-center mb-24">Exhibition</h1>

            {sortedExhibitions.length > 0 ? (
                <div className="space-y-24">
                    {sortedExhibitions.map((ex, index) => (
                        <div key={ex.id} className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2">
                                {ex.image ? (
                                    <div className="aspect-4/3 overflow-hidden bg-gray-50 relative">
                                        {/* Ensure ex.image is treated correctly (string or StaticImport) */}
                                        <Image
                                            src={ex.image}
                                            alt={ex.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-4/3 bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400 text-xs tracking-widest uppercase">No Image Available</span>
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
                                <h2 className="text-2xl font-bold uppercase tracking-wide mb-6">{ex.title}</h2>

                                <div className="flex flex-col gap-3 text-sm text-gray-500 mb-8 items-center md:items-start font-medium tracking-wide">
                                    <div className="flex items-center gap-3">
                                        <Calendar size={16} strokeWidth={1.5} />
                                        <span>{ex.period}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin size={16} strokeWidth={1.5} />
                                        <span>{ex.location}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base max-w-md mx-auto md:mx-0">
                                    {ex.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 text-sm tracking-wide py-12">
                    Upcoming exhibitions will be announced soon.
                </div>
            )}
        </div>
    );
};

export default ExhibitionClient;
