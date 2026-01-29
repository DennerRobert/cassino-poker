'use client';

import { useEffect } from 'react';
import { RankingTable } from '@/components/RankingTable';
import { Card } from '@/components/ui/Card';
import { usePlayerStore } from '@/stores/playerStore';
import { useSessionStore } from '@/stores/sessionStore';

export default function RankingPage() {
    const { fetchPlayers } = usePlayerStore();
    const { fetchSessions, fetchRankings } = useSessionStore();

    useEffect(() => {
        fetchPlayers();
        fetchSessions();
        fetchRankings();
    }, [fetchPlayers, fetchSessions, fetchRankings]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Ranking</h1>
                <p className="text-gray-400">Classificação dos jogadores por total em dinheiro</p>
            </div>

            <Card>
                <RankingTable />
            </Card>
        </div>
    );
}
