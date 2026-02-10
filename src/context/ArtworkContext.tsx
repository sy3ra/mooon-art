"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

// Define types
export type Category = string;

export interface Artwork {
    id: number;
    title: string;
    category: string;
    image: StaticImageData | string;
    year: string;
    material: string;
    size: string;
    price: string;
    description: string;
    purchaseUrl?: string;
    isSoldOut?: boolean;
}

export interface Exhibition {
    id: number;
    title: string;
    period: string;
    location: string;
    description: string;
    image: string | null;
}

interface ArtworkContextType {
    artworks: Artwork[];
    categories: Category[];
    exhibitions: Exhibition[];
    addCategory: (name: string) => Promise<void>;
    updateCategory: (oldName: string, newName: string) => Promise<void>;
    deleteCategory: (name: string) => Promise<void>;
    addArtwork: (artwork: Omit<Artwork, 'id'>) => Promise<void>;
    updateArtwork: (id: number, updatedData: Partial<Artwork>) => Promise<void>;
    deleteArtwork: (id: number) => Promise<void>;
    addExhibition: (exhibition: Omit<Exhibition, 'id'>) => Promise<void>;
    updateExhibition: (id: number, updatedData: Partial<Exhibition>) => Promise<void>;
    deleteExhibition: (id: number) => Promise<void>;
}

const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined);

export const ArtworkProvider = ({ children }: { children: ReactNode }) => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artRes, catRes, exhRes] = await Promise.all([
                    fetch('/api/artworks'),
                    fetch('/api/categories'),
                    fetch('/api/exhibitions')
                ]);

                if (artRes.ok) setArtworks(await artRes.json());
                if (catRes.ok) setCategories(await catRes.json());
                if (exhRes.ok) setExhibitions(await exhRes.json());
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    // Categories Management
    const addCategory = async (name: string) => {
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (res.ok) {
                const newCategory = await res.json();
                setCategories([...categories, newCategory]);
            }
        } catch (error) {
            console.error("Failed to add category:", error);
        }
    };

    const updateCategory = async (oldName: string, newName: string) => {
        try {
            const res = await fetch(`/api/categories/${encodeURIComponent(oldName)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName })
            });

            if (res.ok) {
                setCategories(categories.map(cat => cat === oldName ? newName : cat));
                // Refetch artworks to get updated categories
                const artRes = await fetch('/api/artworks');
                if (artRes.ok) setArtworks(await artRes.json());
            }
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    };

    const deleteCategory = async (name: string) => {
        if (name === "ALL") return;
        try {
            const res = await fetch(`/api/categories/${encodeURIComponent(name)}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setCategories(categories.filter(cat => cat !== name));
                // Refetch artworks to get updated categories (cleared)
                const artRes = await fetch('/api/artworks');
                if (artRes.ok) setArtworks(await artRes.json());
            }
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    // Product Management
    const addArtwork = async (artwork: Omit<Artwork, 'id'>) => {
        try {
            const res = await fetch('/api/artworks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(artwork)
            });
            if (res.ok) {
                const newArtwork = await res.json();
                setArtworks([...artworks, newArtwork]);
            }
        } catch (error) {
            console.error("Failed to add artwork:", error);
        }
    };

    const updateArtwork = async (id: number, updatedData: Partial<Artwork>) => {
        try {
            const res = await fetch(`/api/artworks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (res.ok) {
                const updatedArtwork = await res.json();
                setArtworks(artworks.map(art => art.id === id ? updatedArtwork : art));
            }
        } catch (error) {
            console.error("Failed to update artwork:", error);
        }
    };

    const deleteArtwork = async (id: number) => {
        try {
            const res = await fetch(`/api/artworks/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setArtworks(artworks.filter(art => art.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete artwork:", error);
        }
    };

    // Exhibition Management
    const addExhibition = async (exhibition: Omit<Exhibition, 'id'>) => {
        try {
            const res = await fetch('/api/exhibitions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exhibition)
            });
            if (res.ok) {
                const newExhibition = await res.json();
                setExhibitions([...exhibitions, newExhibition]);
            }
        } catch (error) {
            console.error("Failed to add exhibition:", error);
        }
    };

    const updateExhibition = async (id: number, updatedData: Partial<Exhibition>) => {
        try {
            const res = await fetch(`/api/exhibitions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (res.ok) {
                const updatedExhibition = await res.json();
                setExhibitions(exhibitions.map(ex => ex.id === id ? updatedExhibition : ex));
            }
        } catch (error) {
            console.error("Failed to update exhibition:", error);
        }
    };

    const deleteExhibition = async (id: number) => {
        try {
            const res = await fetch(`/api/exhibitions/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setExhibitions(exhibitions.filter(ex => ex.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete exhibition:", error);
        }
    };

    return (
        <ArtworkContext.Provider value={{
            artworks,
            categories,
            exhibitions,
            addCategory,
            updateCategory,
            deleteCategory,
            addArtwork,
            updateArtwork,
            deleteArtwork,
            addExhibition,
            updateExhibition,
            deleteExhibition
        }}>
            {children}
        </ArtworkContext.Provider>
    );
};

export const useArtwork = () => {
    const context = useContext(ArtworkContext);
    if (!context) {
        throw new Error('useArtwork must be used within an ArtworkProvider');
    }
    return context;
};
