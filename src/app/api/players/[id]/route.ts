import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updatePlayerSchema } from '@/schemas/player.schema';
import { z } from 'zod';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        sessions: {
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Jogador não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(player);
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

    const player = await prisma.player.update({
      where: { id },
      data: {
        ...(validatedData.name !== undefined && { name: validatedData.name }),
        ...(validatedData.email !== undefined && { 
          email: validatedData.email || null 
        }),
        ...(validatedData.phone !== undefined && { 
          phone: validatedData.phone || null 
        }),
      },
    });

    return NextResponse.json(player);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
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
    await prisma.player.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar jogador' },
      { status: 500 }
    );
  }
};
