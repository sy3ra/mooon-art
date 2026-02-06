import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '../../../lib/supabase';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id: idStr } = await params;
    const { data: artwork } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', idStr)
        .single();

    if (!artwork) {
        return {
            title: 'Artwork Not Found',
        };
    }

    return {
        title: `${artwork.title} | Mooon Art`,
        description: artwork.description,
    };
}

export async function generateStaticParams() {
    const { data: artworks } = await supabase.from('artworks').select('id');
    if (!artworks) return [];

    return artworks.map((artwork: any) => ({
        id: artwork.id.toString(),
    }));
}

export default async function ProductDetailPage({ params }: Props) {
    const { id: idStr } = await params;
    const { data: artwork } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', idStr)
        .single();

    if (!artwork) {
        notFound();
    }

    return <ProductDetailClient id={parseInt(idStr)} initialData={artwork} />;
}
