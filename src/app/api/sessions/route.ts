import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSessionSchema } from '@/schemas/session.schema';
import { z } from 'zod';

export const GET = async () => {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: { date: 'desc' },
      include: {
        player: true,
      },
    });

    // Converter Date para formato compatível com o frontend
    const formattedSessions = sessions.map((session) => ({
      ...session,
      date: session.date.toISOString(),
      createdAt: session.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedSessions);
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

    const session = await prisma.session.create({
      data: {
        playerId: validatedData.playerId,
        chipCount: validatedData.chipCount,
        date: validatedData.date,
        notes: validatedData.notes || null,
      },
      include: {
        player: true,
      },
    });

    return NextResponse.json(
      {
        ...session,
        date: session.date.toISOString(),
        createdAt: session.createdAt.toISOString(),
      },
      { status: 201 }
    );
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
