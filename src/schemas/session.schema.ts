import { z } from 'zod';

export const sessionSchema = z.object({
    id: z.string(),
    playerId: z.string().min(1, 'Selecione um jogador'),
    chipCount: z.number().positive('Valor em dinheiro deve ser positivo'),
    date: z.date(),
    notes: z.string().optional(),
    createdAt: z.date(),
});

export const createSessionSchema = sessionSchema.omit({ id: true, createdAt: true });
export const updateSessionSchema = createSessionSchema.partial();

export type Session = z.infer<typeof sessionSchema>;
export type CreateSession = z.infer<typeof createSessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;
