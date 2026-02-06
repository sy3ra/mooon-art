import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params;
    const oldName = decodeURIComponent(name);
    const { newName } = await request.json();

    // 1. Update Category
    const { error: catError } = await supabase
        .from('categories')
        .update({ name: newName })
        .eq('name', oldName);

    if (catError) return NextResponse.json({ error: catError.message }, { status: 500 });

    // 2. Update Artworks (Manual cascade since we store text)
    const { error: artError } = await supabase
        .from('artworks')
        .update({ category: newName })
        .eq('category', oldName);

    if (artError) console.error("Failed to cascade update artworks:", artError);

    return NextResponse.json(newName);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params;
    const categoryName = decodeURIComponent(name);

    if (categoryName === "ALL") {
        return NextResponse.json({ error: 'Cannot delete default category' }, { status: 400 });
    }

    // 1. Delete Category
    const { error: catError } = await supabase
        .from('categories')
        .delete()
        .eq('name', categoryName);

    if (catError) return NextResponse.json({ error: catError.message }, { status: 500 });

    // 2. Reset Artworks category
    const { error: artError } = await supabase
        .from('artworks')
        .update({ category: '' }) // Or set to 'Uncategorized' if preferred, relying on empty string for now
        .eq('category', categoryName);

    if (artError) console.error("Failed to reset artwork categories:", artError);

    return NextResponse.json({ message: 'Deleted successfully' });
}
