'use client';

import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { useSessionStore } from '@/stores/sessionStore';
import { SessionForm } from '@/components/SessionForm';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';

export default function SessionsPage() {
    const { players, fetchPlayers } = usePlayerStore();
    const { sessions, addSession, deleteSession, fetchSessions } = useSessionStore();
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPlayers();
        fetchSessions();
    }, [fetchPlayers, fetchSessions]);

    const sortedSessions = [...sessions].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Sessões</h1>
                    <p className="text-gray-400">Registre e gerencie as sessões de poker</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Sessão
                </Button>
            </div>

            {sortedSessions.length === 0 ? (
                <Card>
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-400 text-lg">Nenhuma sessão registrada</p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {sortedSessions.map((session) => {
                        const player = players.find((p) => p.id === session.playerId);
                        return (
                            <Card key={session.id} hover>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-poker-green-500 to-poker-green-700 flex items-center justify-center text-white font-bold shadow-glow">
                                            {player?.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-white">{player?.name}</h3>
                                            <p className="text-sm text-gray-400">{formatDate(session.date)}</p>
                                            {session.notes && (
                                                <p className="text-sm text-gray-500 mt-1">{session.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-poker-green-400">
                                                {formatNumber(session.chipCount)}
                                            </p>
                                            <p className="text-xs text-gray-500">dinheiro</p>
                                        </div>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => setDeletingId(session.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Add Session Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Nova Sessão"
            >
                <SessionForm
                    onSubmit={(data) => {
                        addSession(data);
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deletingId !== null}
                onClose={() => setDeletingId(null)}
                title="Confirmar Exclusão"
                size="sm"
            >
                <p className="text-gray-300 mb-6">
                    Tem certeza que deseja excluir esta sessão? Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteSession(deletingId!);
                            setDeletingId(null);
                        }}
                        className="flex-1"
                    >
                        Excluir
                    </Button>
                    <Button variant="ghost" onClick={() => setDeletingId(null)}>
                        Cancelar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
