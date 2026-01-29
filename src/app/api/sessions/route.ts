import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createSessionSchema } from '@/schemas/session.schema';
import { z } from 'zod';

export const GET = async () => {
  try {
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select(`
        *,
        player:players(*)
      `)
      .order('date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(sessions || []);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sessões' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    
    // Converter string de data para Date se necessário
    if (typeof body.date === 'string') {
      body.date = new Date(body.date);
    }

    const validatedData = createSessionSchema.parse(body);

    const { data: session, error } = await supabase
      .from('sessions')
      .insert({
        player_id: validatedData.playerId,
        chip_count: validatedData.chipCount,
        date: validatedData.date.toISOString(),
        notes: validatedData.notes || null,
      })
      .select(`
        *,
        player:players(*)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Erro ao criar sessão' },
      { status: 500 }
    );
  }
};
