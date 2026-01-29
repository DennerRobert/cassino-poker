'use client';

import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { useSessionStore } from '@/stores/sessionStore';
import { StatsCard } from '@/components/StatsCard';
import { RankingTable } from '@/components/RankingTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PlayerForm } from '@/components/PlayerForm';
import { SessionForm } from '@/components/SessionForm';
import { Users, Calendar, Coins, Plus } from 'lucide-react';
import { formatNumber, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  const { players, addPlayer, fetchPlayers } = usePlayerStore();
  const { sessions, addSession, fetchSessions, fetchRankings } = useSessionStore();
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    fetchPlayers();
    fetchSessions();
    fetchRankings();
  }, [fetchPlayers, fetchSessions, fetchRankings]);

  const totalChips = sessions.reduce((sum, s) => sum + s.chipCount, 0);
  const recentSessions = sessions
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Visão geral do sistema de ranking</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowPlayerModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Jogador
          </Button>
          <Button onClick={() => setShowSessionModal(true)} variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            Nova Sessão
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total de Jogadores"
          value={players.length}
          icon={Users}
        />
        <StatsCard
          title="Total de Sessões"
          value={sessions.length}
          icon={Calendar}
        />
        <StatsCard
          title="Total em Dinheiro"
          value={formatNumber(totalChips)}
          icon={Coins}
        />
      </div>

      {/* Top 3 Players */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Top 3 Jogadores</h2>
        <RankingTable />
      </div>

      {/* Recent Sessions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Sessões Recentes</h2>
        {recentSessions.length === 0 ? (
          <Card>
            <p className="text-gray-400 text-center py-8">Nenhuma sessão registrada</p>
          </Card>
        ) : (
          <Card>
            <div className="space-y-4">
              {recentSessions.map((session) => {
                const player = players.find((p) => p.id === session.playerId);
                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-poker-green-500 to-poker-green-700 flex items-center justify-center text-white font-bold">
                        {player?.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{player?.name}</p>
                        <p className="text-sm text-gray-500">{formatDate(session.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-poker-green-400">
                        {formatNumber(session.chipCount)}
                      </p>
                      <p className="text-xs text-gray-500">dinheiro</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
        title="Novo Jogador"
      >
        <PlayerForm
          onSubmit={(data) => {
            addPlayer(data);
            setShowPlayerModal(false);
          }}
          onCancel={() => setShowPlayerModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        title="Nova Sessão"
      >
        <SessionForm
          onSubmit={(data) => {
            addSession(data);
            setShowSessionModal(false);
          }}
          onCancel={() => setShowSessionModal(false)}
        />
      </Modal>
    </div>
  );
}
