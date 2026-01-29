import { create } from 'zustand';
import { Session, CreateSession, UpdateSession } from '@/schemas/session.schema';

export interface PlayerRanking {
    playerId: string;
    totalChips: number;
    sessionCount: number;
}

interface SessionStore {
    sessions: Session[];
    rankings: PlayerRanking[];
    loading: boolean;
    error: string | null;
    fetchSessions: () => Promise<void>;
    addSession: (session: CreateSession) => Promise<void>;
    updateSession: (id: string, session: UpdateSession) => Promise<void>;
    deleteSession: (id: string) => Promise<void>;
    getSessionsByPlayerId: (playerId: string) => Session[];
    fetchRankings: () => Promise<void>;
    getRankings: () => PlayerRanking[];
}

export const useSessionStore = create<SessionStore>((set, get) => ({
    sessions: [],
    rankings: [],
    loading: false,
    error: null,

    fetchSessions: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/sessions');
            if (!response.ok) {
                throw new Error('Erro ao buscar sessões');
            }
            const data = await response.json();
            
            // Converter strings de data para Date objects e mapear campos do Supabase
            const sessions = data.map((session: any) => ({
                id: session.id,
                playerId: session.player_id,
                chipCount: session.chip_count,
                date: new Date(session.date),
                notes: session.notes,
                createdAt: new Date(session.created_at),
            }));
            
            set({ sessions, loading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error fetching sessions:', error);
        }
    },

    addSession: async (session) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...session,
                    date: session.date.toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar sessão');
            }

            const newSession = await response.json();
            set((state) => ({ 
                sessions: [
                    {
                        id: newSession.id,
                        playerId: newSession.player_id,
                        chipCount: newSession.chip_count,
                        date: new Date(newSession.date),
                        notes: newSession.notes,
                        createdAt: new Date(newSession.created_at),
                    },
                    ...state.sessions
                ],
                loading: false 
            }));
            
            // Atualizar rankings após adicionar sessão
            await get().fetchRankings();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error adding session:', error);
            throw error;
        }
    },

    updateSession: async (id, session) => {
        set({ loading: true, error: null });
        try {
            const updateData: any = { ...session };
            if (session.date) {
                updateData.date = session.date.toISOString();
            }

            const response = await fetch(`/api/sessions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar sessão');
            }

            const updatedSession = await response.json();
            set((state) => ({
                sessions: state.sessions.map((s) =>
                    s.id === id ? {
                        id: updatedSession.id,
                        playerId: updatedSession.player_id,
                        chipCount: updatedSession.chip_count,
                        date: new Date(updatedSession.date),
                        notes: updatedSession.notes,
                        createdAt: new Date(updatedSession.created_at),
                    } : s
                ),
                loading: false,
            }));
            
            // Atualizar rankings após atualizar sessão
            await get().fetchRankings();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error updating session:', error);
            throw error;
        }
    },

    deleteSession: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/sessions/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar sessão');
            }

            set((state) => ({
                sessions: state.sessions.filter((s) => s.id !== id),
                loading: false,
            }));
            
            // Atualizar rankings após deletar sessão
            await get().fetchRankings();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            set({ error: errorMessage, loading: false });
            console.error('Error deleting session:', error);
            throw error;
        }
    },

    getSessionsByPlayerId: (playerId) => {
        return get().sessions.filter((s) => s.playerId === playerId);
    },

    fetchRankings: async () => {
        try {
            const response = await fetch('/api/rankings');
            if (!response.ok) {
                throw new Error('Erro ao buscar rankings');
            }
            const rankings = await response.json();
            set({ rankings });
        } catch (error) {
            console.error('Error fetching rankings:', error);
        }
    },

    getRankings: () => {
        return get().rankings;
    },
}));
