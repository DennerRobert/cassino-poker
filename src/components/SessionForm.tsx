'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePlayerStore } from '@/stores/playerStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

// Input schema for the form (all strings from inputs)
const sessionInputSchema = z.object({
    playerId: z.string().min(1, 'Selecione um jogador'),
    chipCount: z.string().min(1, 'Digite o valor em dinheiro'),
    date: z.string().min(1, 'Selecione uma data'),
    notes: z.string().optional(),
});

type SessionInputData = z.infer<typeof sessionInputSchema>;

interface SessionFormProps {
    onSubmit: (data: { playerId: string; chipCount: number; date: Date; notes?: string }) => void;
    onCancel?: () => void;
}

export function SessionForm({ onSubmit, onCancel }: SessionFormProps) {
    const { players } = usePlayerStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SessionInputData>({
        resolver: zodResolver(sessionInputSchema),
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
        },
    });

    const handleFormSubmit = async (data: SessionInputData) => {
        const chipCount = parseInt(data.chipCount, 10);

        if (isNaN(chipCount) || chipCount <= 0) {
            return;
        }

        await onSubmit({
            playerId: data.playerId,
            chipCount,
            date: new Date(data.date),
            notes: data.notes,
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Jogador *
                </label>
                <select
                    {...register('playerId')}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-poker-green-500 focus:border-transparent transition-all duration-200"
                >
                    <option value="">Selecione um jogador</option>
                    {players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.name}
                        </option>
                    ))}
                </select>
                {errors.playerId && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.playerId.message}</p>
                )}
            </div>

            <Input
                label="Valor em Dinheiro (R$) *"
                type="number"
                placeholder="10000"
                error={errors.chipCount?.message}
                {...register('chipCount')}
            />

            <Input
                label="Data *"
                type="date"
                error={errors.date?.message}
                {...register('date')}
            />

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Observações
                </label>
                <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder="Notas sobre a sessão..."
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-poker-green-500 focus:border-transparent transition-all duration-200 resize-none"
                />
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? 'Salvando...' : 'Registrar Sessão'}
                </Button>
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
}
