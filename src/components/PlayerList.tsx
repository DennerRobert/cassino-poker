'use client';

import React, { useState } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { PlayerForm } from './PlayerForm';
import { User, Mail, Phone, Pencil, Trash2 } from 'lucide-react';
import { CreatePlayer } from '@/schemas/player.schema';

export function PlayerList() {
    const { players, updatePlayer, deletePlayer } = usePlayerStore();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleEdit = (id: string, data: CreatePlayer) => {
        updatePlayer(id, data);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        deletePlayer(id);
        setDeletingId(null);
    };

    const editingPlayer = players.find((p) => p.id === editingId);

    if (players.length === 0) {
        return (
            <div className="text-center py-12">
                <User className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Nenhum jogador cadastrado</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                    <Card key={player.id} hover className="relative">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-poker-green-500 to-poker-green-700 flex items-center justify-center shadow-glow">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">{player.name}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            {player.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Mail className="w-4 h-4" />
                                    <span>{player.email}</span>
                                </div>
                            )}
                            {player.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Phone className="w-4 h-4" />
                                    <span>{player.phone}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingId(player.id)}
                                className="flex-1"
                            >
                                <Pencil className="w-4 h-4 mr-1" />
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => setDeletingId(player.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={editingId !== null}
                onClose={() => setEditingId(null)}
                title="Editar Jogador"
            >
                {editingPlayer && (
                    <PlayerForm
                        defaultValues={{
                            name: editingPlayer.name,
                            email: editingPlayer.email,
                            phone: editingPlayer.phone,
                        }}
                        onSubmit={(data) => handleEdit(editingId!, data)}
                        onCancel={() => setEditingId(null)}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deletingId !== null}
                onClose={() => setDeletingId(null)}
                title="Confirmar Exclusão"
                size="sm"
            >
                <p className="text-gray-300 mb-6">
                    Tem certeza que deseja excluir este jogador? Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(deletingId!)}
                        className="flex-1"
                    >
                        Excluir
                    </Button>
                    <Button variant="ghost" onClick={() => setDeletingId(null)}>
                        Cancelar
                    </Button>
                </div>
            </Modal>
        </>
    );
}
