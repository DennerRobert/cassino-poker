-- Criar extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de jogadores
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Tabela de sessões
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  chip_count INTEGER NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS sessions_player_id_idx ON sessions(player_id);
CREATE INDEX IF NOT EXISTS sessions_date_idx ON sessions(date);
CREATE INDEX IF NOT EXISTS players_created_at_idx ON players(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (ajuste conforme necessário)
CREATE POLICY "Enable read access for all users" ON players FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON players FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON players FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON sessions FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON sessions FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON sessions FOR DELETE USING (true);
