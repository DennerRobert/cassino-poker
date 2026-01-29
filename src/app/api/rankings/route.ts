import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async () => {
  try {
    // Buscar todas as sessões agrupadas por player
    const sessions = await prisma.session.findMany({
      include: {
        player: true,
      },
    });

    // Calcular rankings
    const rankingsMap = new Map<string, {
      playerId: string;
      totalChips: number;
      sessionCount: number;
    }>();

    sessions.forEach((session) => {
      const existing = rankingsMap.get(session.playerId);
      if (existing) {
        existing.totalChips += session.chipCount;
        existing.sessionCount += 1;
      } else {
        rankingsMap.set(session.playerId, {
          playerId: session.playerId,
          totalChips: session.chipCount,
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
