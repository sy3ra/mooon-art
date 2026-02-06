import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('exhibitions')
        .select('*')
        .order('id', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { id, ...payload } = body;

    const { data, error } = await supabase
        .from('exhibitions')
        .insert([payload])
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 201 });
}
