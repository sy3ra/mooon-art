import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();

    // Map payload
    const dbPayload: any = { ...body };
    if (body.isSoldOut !== undefined) {
        dbPayload.is_sold_out = body.isSoldOut;
        delete dbPayload.isSoldOut;
    }
    // Remove ID from payload to avoid updating PK
    delete dbPayload.id;

    const { data, error } = await supabase
        .from('artworks')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Map response
    const responseData = {
        ...data,
        isSoldOut: data.is_sold_out
    };

    return NextResponse.json(responseData);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: 'Deleted successfully' });
}
