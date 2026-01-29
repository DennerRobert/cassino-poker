import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { updateSessionSchema } from '@/schemas/session.schema';
import { z } from 'zod';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    
    const { data: session, error } = await supabase
      .from('sessions')
      .select(`
        *,
        player:players(*)
      `)
      .eq('id', id)
      .single();

    if (error || !session) {
      return NextResponse.json(
        { error: 'Sessão não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sessão' },
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
    
    // Converter string de data para Date se necessário
    if (body.date && typeof body.date === 'string') {
      body.date = new Date(body.date);
    }

    const validatedData = updateSessionSchema.parse(body);

    const updateData: any = {};
    if (validatedData.playerId !== undefined) updateData.player_id = validatedData.playerId;
    if (validatedData.chipCount !== undefined) updateData.chip_count = validatedData.chipCount;
    if (validatedData.date !== undefined) updateData.date = validatedData.date.toISOString();
    if (validatedData.notes !== undefined) updateData.notes = validatedData.notes || null;

    const { data: session, error } = await supabase
      .from('sessions')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        player:players(*)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar sessão' },
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
      .from('sessions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar sessão' },
      { status: 500 }
    );
  }
};
