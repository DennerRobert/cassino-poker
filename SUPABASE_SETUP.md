# Configuração do Supabase

## 1. Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. Crie uma conta (se ainda não tiver)
3. Clique em "New Project"
4. Escolha um nome e senha para o banco

## 2. Obter Credenciais

1. No dashboard do projeto, vá em: **Settings → API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (a chave pública)

## 3. Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

## 4. Criar Tabelas no Supabase

No **SQL Editor** do Supabase, execute:

```sql
-- Criar tabela de players
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de sessions
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  chip_count INTEGER NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_sessions_player_id ON sessions(player_id);
CREATE INDEX idx_sessions_date ON sessions(date);

-- Habilitar Row Level Security (RLS)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para acesso público (desenvolvimento)
CREATE POLICY "Enable all for anon" ON players FOR ALL USING (true);
CREATE POLICY "Enable all for anon" ON sessions FOR ALL USING (true);
```

## 5. Deploy no Netlify

1. Faça push do código para o GitHub
2. No Netlify, conecte o repositório
3. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 6. Comandos Úteis

```bash
npm run dev        # Rodar em desenvolvimento
npm run build      # Build de produção
npm run start      # Rodar build de produção
```

## Estrutura do Banco

```
players
├── id (UUID, PK)
├── name (TEXT)
├── email (TEXT, nullable)
├── phone (TEXT, nullable)
└── created_at (TIMESTAMP)

sessions
├── id (UUID, PK)
├── player_id (UUID, FK → players.id)
├── chip_count (INTEGER)
├── date (TIMESTAMP)
├── notes (TEXT, nullable)
└── created_at (TIMESTAMP)
```
