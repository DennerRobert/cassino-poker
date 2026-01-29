'use client';

import { RankingTable } from '@/components/RankingTable';
import { Card } from '@/components/ui/Card';

export default function RankingPage() {
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
