import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('id');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data.map(d => d.name));
}

export async function POST(request: Request) {
    const { name } = await request.json();

    const { data, error } = await supabase
        .from('categories')
        .insert([{ name }])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data.name, { status: 201 });
}
