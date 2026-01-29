'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPlayerSchema, CreatePlayer } from '@/schemas/player.schema';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface PlayerFormProps {
    onSubmit: (data: CreatePlayer) => void;
    onCancel?: () => void;
    defaultValues?: Partial<CreatePlayer>;
}

export function PlayerForm({ onSubmit, onCancel, defaultValues }: PlayerFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreatePlayer>({
        resolver: zodResolver(createPlayerSchema),
        defaultValues,
    });

    const handleFormSubmit = async (data: CreatePlayer) => {
        await onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
                label="Nome *"
                placeholder="Digite o nome do jogador"
                error={errors.name?.message}
                {...register('name')}
            />

            <Input
                label="Email"
                type="email"
                placeholder="email@exemplo.com"
                error={errors.email?.message}
                {...register('email')}
            />

            <Input
                label="Telefone"
                placeholder="(11) 98765-4321"
                error={errors.phone?.message}
                {...register('phone')}
            />

            <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? 'Salvando...' : 'Salvar Jogador'}
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
