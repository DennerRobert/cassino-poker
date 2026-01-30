import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

// Validar apenas em runtime, não em build time
if (typeof window !== 'undefined' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('Supabase environment variables not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Player {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  player_id: string;
  chip_count: number;
  date: string;
  notes: string | null;
  created_at: string;
  player?: Player;
}

export interface PlayerRanking {
  player_id: string;
  total_chips: number;
  session_count: number;
}
