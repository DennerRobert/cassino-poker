import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createPlayerSchema } from '@/schemas/player.schema';
import { z } from 'zod';

export const GET = async () => {
  try {
    const { data: players, error } = await supabase
      .from('players')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(players || []);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar jogadores' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedData = createPlayerSchema.parse(body);

    const { data: player, error } = await supabase
      .from('players')
      .insert({
        name: validatedData.name,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Erro ao criar jogador' },
      { status: 500 }
    );
  }
};
