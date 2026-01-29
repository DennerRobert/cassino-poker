'use client';

import React from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { useSessionStore } from '@/stores/sessionStore';
import { Badge } from './ui/Badge';
import { Trophy, TrendingUp } from 'lucide-react';
import { formatNumber, cn } from '@/lib/utils';

export function RankingTable() {
    const { players } = usePlayerStore();
    const { getRankings } = useSessionStore();

    const rankings = getRankings();

    const getRankBadge = (index: number) => {
        if (index === 0) return <Badge variant="gold"><Trophy className="w-3 h-3 mr-1 inline" />1º</Badge>;
        if (index === 1) return <Badge variant="silver"><Trophy className="w-3 h-3 mr-1 inline" />2º</Badge>;
        if (index === 2) return <Badge variant="bronze"><Trophy className="w-3 h-3 mr-1 inline" />3º</Badge>;
        return <Badge>{index + 1}º</Badge>;
    };

    if (rankings.length === 0) {
        return (
            <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Nenhuma sessão registrada ainda</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-4 text-gray-400 font-medium">Posição</th>
                        <th className="text-left py-4 px-4 text-gray-400 font-medium">Jogador</th>
                        <th className="text-right py-4 px-4 text-gray-400 font-medium">Total em Dinheiro</th>
                        <th className="text-right py-4 px-4 text-gray-400 font-medium">Sessões</th>
                        <th className="text-right py-4 px-4 text-gray-400 font-medium">Média</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking, index) => {
                        const player = players.find((p) => p.id === ranking.playerId);
                        if (!player) return null;

                        const average = Math.round(ranking.totalChips / ranking.sessionCount);
                        
                        const rowClasses = cn(
                            "border-b border-gray-800 transition-all duration-300",
                            index === 0 && "bg-gradient-to-r from-yellow-500/10 to-transparent hover:from-yellow-500/20 border-yellow-500/30",
                            index === 1 && "bg-gradient-to-r from-gray-300/10 to-transparent hover:from-gray-300/20 border-gray-300/30",
                            index === 2 && "bg-gradient-to-r from-orange-500/10 to-transparent hover:from-orange-500/20 border-orange-500/30",
                            index > 2 && "hover:bg-white/5"
                        );

                        return (
                            <tr
                                key={ranking.playerId}
                                className={rowClasses}
                            >
                                <td className="py-4 px-4">
                                    {getRankBadge(index)}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-poker-green-500 to-poker-green-700 flex items-center justify-center text-white font-bold shadow-glow">
                                            {player.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{player.name}</p>
                                            {player.email && (
                                                <p className="text-sm text-gray-500">{player.email}</p>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <span className="text-lg font-bold text-poker-green-400">
                                        {formatNumber(ranking.totalChips)}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right text-gray-300">
                                    {ranking.sessionCount}
                                </td>
                                <td className="py-4 px-4 text-right text-gray-300">
                                    {formatNumber(average)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
