import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) => {
  try {
    const { playerId } = await params;
    const sessions = await prisma.session.findMany({
      where: { playerId },
      orderBy: { date: 'desc' },
      include: {
        player: true,
      },
    });

    const formattedSessions = sessions.map((session) => ({
      ...session,
      date: session.date.toISOString(),
      createdAt: session.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedSessions);
  } catch (error) {
    console.error('Error fetching player sessions:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sessões do jogador' },
      { status: 500 }
    );
  }
};
