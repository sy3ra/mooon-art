import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('id', { ascending: false }); // Newest first

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const mappedData = data.map((item: any) => ({
        ...item,
        isSoldOut: item.is_sold_out,
        purchaseUrl: item.purchase_url
    }));

    return NextResponse.json(mappedData);
}

export async function POST(request: Request) {
    const body = await request.json();

    // Remove id if present to let DB auto-increment (optional, Supabase handles it if omitted)
    const { id, ...artworkData } = body;

    // Map camelCase to snake_case if DB column names differ? 
    // Plan said DB cols are: title, category, image, year, material, size, price, description, is_sold_out
    // Frontend sends: title, category, image, year, material, size, price, description, isSoldOut

    const dbPayload = {
        ...artworkData,
        purchase_url: artworkData.purchaseUrl,
        is_sold_out: artworkData.isSoldOut // Map property
    };
    delete dbPayload.isSoldOut;
    delete dbPayload.purchaseUrl;

    const { data, error } = await supabase
        .from('artworks')
        .insert([dbPayload])
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Map back to camelCase for frontend
    const responseData = {
        ...data,
        purchaseUrl: data.purchase_url,
        isSoldOut: data.is_sold_out
    };

    return NextResponse.json(responseData, { status: 201 });
}
