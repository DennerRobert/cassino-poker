import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPlayerSchema } from '@/schemas/player.schema';
import { z } from 'zod';

export const GET = async () => {
  try {
    const players = await prisma.player.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(players);
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

    const player = await prisma.player.create({
      data: {
        name: validatedData.name,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
      },
    });

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
