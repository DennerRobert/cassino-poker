import { create } from 'zustand';
import { Player, CreatePlayer, UpdatePlayer } from '@/schemas/player.schema';

// Mocked initial data
const MOCK_PLAYERS: Player[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 98765-4321',
        createdAt: new Date('2026-01-15'),
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@email.com',
        phone: '(11) 91234-5678',
        createdAt: new Date('2026-01-16'),
    },
    {
        id: '3',
        name: 'Pedro Oliveira',
        email: 'pedro@email.com',
        phone: '',
        createdAt: new Date('2026-01-17'),
    },
    {
        id: '4',
        name: 'Ana Costa',
        email: 'ana@email.com',
        phone: '(11) 99876-5432',
        createdAt: new Date('2026-01-18'),
    },
    {
        id: '5',
        name: 'Carlos Ferreira',
        email: '',
        phone: '(11) 97654-3210',
        createdAt: new Date('2026-01-19'),
    },
    {
        id: '6',
        name: 'Juliana Alves',
        email: 'juliana@email.com',
        phone: '(11) 96543-2109',
        createdAt: new Date('2026-01-20'),
    },
    {
        id: '7',
        name: 'Roberto Lima',
        email: 'roberto@email.com',
        phone: '',
        createdAt: new Date('2026-01-21'),
    },
    {
        id: '8',
        name: 'Fernanda Souza',
        email: 'fernanda@email.com',
        phone: '(11) 95432-1098',
        createdAt: new Date('2026-01-22'),
    },
];

interface PlayerStore {
    players: Player[];
    addPlayer: (player: CreatePlayer) => void;
    updatePlayer: (id: string, player: UpdatePlayer) => void;
    deletePlayer: (id: string) => void;
    getPlayerById: (id: string) => Player | undefined;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    players: MOCK_PLAYERS,

    addPlayer: (player) => {
        const newPlayer: Player = {
            ...player,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
        };
        set((state) => ({ players: [...state.players, newPlayer] }));
    },

    updatePlayer: (id, player) => {
        set((state) => ({
            players: state.players.map((p) =>
                p.id === id ? { ...p, ...player } : p
            ),
        }));
    },

    deletePlayer: (id) => {
        set((state) => ({
            players: state.players.filter((p) => p.id !== id),
        }));
    },

    getPlayerById: (id) => {
        return get().players.find((p) => p.id === id);
    },
}));
