import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const GET = async () => {
  try {
    // Buscar todas as sessões
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select('player_id, chip_count');

    if (error) throw error;

    // Calcular rankings
    const rankingsMap = new Map<string, {
      playerId: string;
      totalChips: number;
      sessionCount: number;
    }>();

    sessions?.forEach((session) => {
      const existing = rankingsMap.get(session.player_id);
      if (existing) {
        existing.totalChips += session.chip_count;
        existing.sessionCount += 1;
      } else {
        rankingsMap.set(session.player_id, {
          playerId: session.player_id,
          totalChips: session.chip_count,
          sessionCount: 1,
        });
      }
    });

    // Converter para array e ordenar
    const rankings = Array.from(rankingsMap.values()).sort(
      (a, b) => b.totalChips - a.totalChips
    );

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar rankings' },
      { status: 500 }
    );
  }
};
