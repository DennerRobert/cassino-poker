import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const GET = async () => {
  try {
    // Buscar todas as sessões
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select('player_id, chip_count');

    if (error) throw error;

    // Calcular rankings com dias únicos
    const rankingsMap = new Map<string, {
      playerId: string;
      totalChips: number;
      sessionCount: number;
      uniqueDates: Set<string>;
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

    sessions.forEach((session) => {
      // Extrair apenas a data (sem hora) em formato YYYY-MM-DD
      const dateOnly = session.date.toISOString().split('T')[0];
      
      const existing = rankingsMap.get(session.playerId);
      if (existing) {
        existing.totalChips += session.chipCount;
        existing.uniqueDates.add(dateOnly);
      } else {
        rankingsMap.set(session.playerId, {
          playerId: session.playerId,
          totalChips: session.chipCount,
          sessionCount: 0,
          uniqueDates: new Set([dateOnly]),

        });
      }
    });

    // Converter para array, calcular sessionCount (dias únicos) e ordenar
    const rankings = Array.from(rankingsMap.values())
      .map(({ playerId, totalChips, uniqueDates }) => ({
        playerId,
        totalChips,
        sessionCount: uniqueDates.size, // Conta apenas dias únicos
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
