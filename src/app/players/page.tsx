'use client';

import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { PlayerList } from '@/components/PlayerList';
import { PlayerForm } from '@/components/PlayerForm';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Plus } from 'lucide-react';

export default function PlayersPage() {
    const { addPlayer, fetchPlayers } = usePlayerStore();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Jogadores</h1>
                    <p className="text-gray-400">Gerencie os jogadores cadastrados</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Jogador
                </Button>
            </div>

            <PlayerList />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Novo Jogador"
            >
                <PlayerForm
                    onSubmit={(data) => {
                        addPlayer(data);
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
}
