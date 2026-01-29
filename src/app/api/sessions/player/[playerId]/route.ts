import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) => {
  try {
    const { playerId } = await params;
    
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select(`
        *,
        player:players(*)
      `)
      .eq('player_id', playerId)
      .order('date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(sessions || []);
  } catch (error) {
    console.error('Error fetching player sessions:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sessões do jogador' },
      { status: 500 }
    );
  }
};
