import { z } from 'zod';

export const playerSchema = z.object({
    id: z.string(),
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    phone: z.string().optional(),
    createdAt: z.date(),
});

export const createPlayerSchema = playerSchema.omit({ id: true, createdAt: true });
export const updatePlayerSchema = createPlayerSchema.partial();

export type Player = z.infer<typeof playerSchema>;
export type CreatePlayer = z.infer<typeof createPlayerSchema>;
export type UpdatePlayer = z.infer<typeof updatePlayerSchema>;
