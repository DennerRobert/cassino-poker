import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { updatePlayerSchema } from '@/schemas/player.schema';
import { z } from 'zod';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    
    // Buscar jogador
    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();

    if (playerError || !player) {
      return NextResponse.json(
        { error: 'Jogador não encontrado' },
        { status: 404 }
      );
    }

    // Buscar sessões do jogador
    const { data: sessions, error: sessionsError } = await supabase
      .from('sessions')
      .select('*')
      .eq('player_id', id)
      .order('date', { ascending: false });

    if (sessionsError) throw sessionsError;

    return NextResponse.json({ ...player, sessions: sessions || [] });
  } catch (error) {
    console.error('Error fetching player:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar jogador' },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updatePlayerSchema.parse(body);

    const updateData: any = {};
    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.email !== undefined) updateData.email = validatedData.email || null;
    if (validatedData.phone !== undefined) updateData.phone = validatedData.phone || null;

    const { data: player, error } = await supabase
      .from('players')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(player);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating player:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar jogador' },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar jogador' },
      { status: 500 }
    );
  }
};
