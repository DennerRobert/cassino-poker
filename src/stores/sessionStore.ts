import { create } from 'zustand';
import { Session, CreateSession, UpdateSession } from '@/schemas/session.schema';

// Mocked initial data - sessions for the mock players
const MOCK_SESSIONS: Session[] = [
    // João Silva (id: 1)
    { id: 's1', playerId: '1', chipCount: 15000, date: new Date('2026-01-25'), notes: 'Boa noite', createdAt: new Date('2026-01-25') },
    { id: 's2', playerId: '1', chipCount: 22000, date: new Date('2026-01-26'), notes: '', createdAt: new Date('2026-01-26') },
    { id: 's3', playerId: '1', chipCount: 18500, date: new Date('2026-01-27'), notes: 'Excelente jogo', createdAt: new Date('2026-01-27') },

    // Maria Santos (id: 2)
    { id: 's4', playerId: '2', chipCount: 28000, date: new Date('2026-01-25'), notes: 'Vitória importante', createdAt: new Date('2026-01-25') },
    { id: 's5', playerId: '2', chipCount: 31000, date: new Date('2026-01-26'), notes: '', createdAt: new Date('2026-01-26') },
    { id: 's6', playerId: '2', chipCount: 25500, date: new Date('2026-01-28'), notes: 'Bom resultado', createdAt: new Date('2026-01-28') },

    // Pedro Oliveira (id: 3)
    { id: 's7', playerId: '3', chipCount: 12000, date: new Date('2026-01-25'), notes: '', createdAt: new Date('2026-01-25') },
    { id: 's8', playerId: '3', chipCount: 9500, date: new Date('2026-01-27'), notes: 'Dia difícil', createdAt: new Date('2026-01-27') },

    // Ana Costa (id: 4)
    { id: 's9', playerId: '4', chipCount: 19000, date: new Date('2026-01-26'), notes: '', createdAt: new Date('2026-01-26') },
    { id: 's10', playerId: '4', chipCount: 21500, date: new Date('2026-01-27'), notes: 'Melhorando', createdAt: new Date('2026-01-27') },
    { id: 's11', playerId: '4', chipCount: 23000, date: new Date('2026-01-28'), notes: 'Ótimo desempenho', createdAt: new Date('2026-01-28') },

    // Carlos Ferreira (id: 5)
    { id: 's12', playerId: '5', chipCount: 16500, date: new Date('2026-01-25'), notes: '', createdAt: new Date('2026-01-25') },
    { id: 's13', playerId: '5', chipCount: 14000, date: new Date('2026-01-28'), notes: '', createdAt: new Date('2026-01-28') },

    // Juliana Alves (id: 6)
    { id: 's14', playerId: '6', chipCount: 27000, date: new Date('2026-01-26'), notes: 'Excelente', createdAt: new Date('2026-01-26') },
    { id: 's15', playerId: '6', chipCount: 29500, date: new Date('2026-01-27'), notes: 'Continua forte', createdAt: new Date('2026-01-27') },

    // Roberto Lima (id: 7)
    { id: 's16', playerId: '7', chipCount: 11000, date: new Date('2026-01-27'), notes: '', createdAt: new Date('2026-01-27') },

    // Fernanda Souza (id: 8)
    { id: 's17', playerId: '8', chipCount: 20000, date: new Date('2026-01-25'), notes: 'Primeira vez', createdAt: new Date('2026-01-25') },
    { id: 's18', playerId: '8', chipCount: 24500, date: new Date('2026-01-28'), notes: 'Melhor resultado', createdAt: new Date('2026-01-28') },
];

export interface PlayerRanking {
    playerId: string;
    totalChips: number;
    sessionCount: number;
}

interface SessionStore {
    sessions: Session[];
    addSession: (session: CreateSession) => void;
    updateSession: (id: string, session: UpdateSession) => void;
    deleteSession: (id: string) => void;
    getSessionsByPlayerId: (playerId: string) => Session[];
    getRankings: () => PlayerRanking[];
}

export const useSessionStore = create<SessionStore>((set, get) => ({
    sessions: MOCK_SESSIONS,

    addSession: (session) => {
        const newSession: Session = {
            ...session,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
        };
        set((state) => ({ sessions: [...state.sessions, newSession] }));
    },

    updateSession: (id, session) => {
        set((state) => ({
            sessions: state.sessions.map((s) =>
                s.id === id ? { ...s, ...session } : s
            ),
        }));
    },

    deleteSession: (id) => {
        set((state) => ({
            sessions: state.sessions.filter((s) => s.id !== id),
        }));
    },

    getSessionsByPlayerId: (playerId) => {
        return get().sessions.filter((s) => s.playerId === playerId);
    },

    getRankings: () => {
        const sessions = get().sessions;
        const rankingsMap = new Map<string, PlayerRanking>();

        sessions.forEach((session) => {
            const existing = rankingsMap.get(session.playerId);
            if (existing) {
                existing.totalChips += session.chipCount;
                existing.sessionCount += 1;
            } else {
                rankingsMap.set(session.playerId, {
                    playerId: session.playerId,
                    totalChips: session.chipCount,
                    sessionCount: 1,
                });
            }
        });

        return Array.from(rankingsMap.values()).sort(
            (a, b) => b.totalChips - a.totalChips
        );
    },
}));
