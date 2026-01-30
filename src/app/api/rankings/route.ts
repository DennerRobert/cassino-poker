import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const GET = async () => {
  try {
    // Buscar todas as sessões
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select('player_id, chip_count, date');

    if (error) throw error;

    // Calcular rankings com dias únicos
    const rankingsMap = new Map<string, {
      playerId: string;
      totalChips: number;
      uniqueDates: Set<string>;
    }>();

    sessions?.forEach((session) => {
      // Extrair apenas a data (sem hora) em formato YYYY-MM-DD
      const dateOnly = new Date(session.date).toISOString().split('T')[0];
      
      const existing = rankingsMap.get(session.player_id);
      if (existing) {
        existing.totalChips += session.chip_count;
        existing.uniqueDates.add(dateOnly);
      } else {
        rankingsMap.set(session.player_id, {
          playerId: session.player_id,
          totalChips: session.chip_count,
          uniqueDates: new Set([dateOnly]),
        });
      }
    });

    // Converter para array, calcular sessionCount (dias únicos) e ordenar
    const rankings = Array.from(rankingsMap.values())
      .map(({ playerId, totalChips, uniqueDates }) => ({
        playerId,
        totalChips,
        sessionCount: uniqueDates.size,
      }))
      .sort((a, b) => b.totalChips - a.totalChips);

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar rankings' },
      { status: 500 }
    );
  }
};
