import { create } from 'zustand';
import { Player, CreatePlayer, UpdatePlayer } from '@/schemas/player.schema';

interface PlayerStore {
    players: Player[];
    loading: boolean;
    error: string | null;
    fetchPlayers: () => Promise<void>;
    addPlayer: (player: CreatePlayer) => Promise<void>;
    updatePlayer: (id: string, player: UpdatePlayer) => Promise<void>;
    deletePlayer: (id: string) => Promise<void>;
    getPlayerById: (id: string) => Player | undefined;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    players: [],
    loading: false,
    error: null,

    fetchPlayers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/players');
            if (!response.ok) {
                throw new Error('Erro ao buscar jogadores');
            }
            const data = await response.json();
            
            // Converter strings de data para Date objects e mapear campos do Supabase
            const players = data.map((player: any) => ({
                id: player.id,
                name: player.name,
                email: player.email,
                phone: player.phone,
                createdAt: new Date(player.created_at),
            }));
            
            set({ players, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error fetching players:', error);
        }
    },

    addPlayer: async (player) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(player),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar jogador');
            }

            const newPlayer = await response.json();
            set((state) => ({ 
                players: [
                    {
                        id: newPlayer.id,
                        name: newPlayer.name,
                        email: newPlayer.email,
                        phone: newPlayer.phone,
                        createdAt: new Date(newPlayer.created_at),
                    },
                    ...state.players
                ],
                loading: false 
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error adding player:', error);
            throw error;
        }
    },

    updatePlayer: async (id, player) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/players/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(player),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar jogador');
            }

            const updatedPlayer = await response.json();
            set((state) => ({
                players: state.players.map((p) =>
                    p.id === id ? {
                        id: updatedPlayer.id,
                        name: updatedPlayer.name,
                        email: updatedPlayer.email,
                        phone: updatedPlayer.phone,
                        createdAt: new Date(updatedPlayer.created_at),
                    } : p
                ),
                loading: false,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error updating player:', error);
            throw error;
        }
    },

    deletePlayer: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/players/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar jogador');
            }

            set((state) => ({
                players: state.players.filter((p) => p.id !== id),
                loading: false,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error deleting player:', error);
            throw error;
        }
    },

    getPlayerById: (id) => {
        return get().players.find((p) => p.id === id);
    },
}));
