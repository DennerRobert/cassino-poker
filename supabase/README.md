# Configuração do Supabase

## 1. Criar projeto no Supabase

1. Acesse https://supabase.com/
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha:
   - Nome do projeto: cassino-poker
   - Database Password: (escolha uma senha forte)
   - Region: (escolha a mais próxima)

## 2. Executar as migrações

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "+ New query"
3. Copie e cole o conteúdo de `migrations/001_initial_schema.sql`
4. Clique em "Run" para executar

## 3. Popular o banco de dados (opcional)

1. No SQL Editor, clique em "+ New query"
2. Copie e cole o conteúdo de `seed.sql`
3. Clique em "Run" para executar

## 4. Obter as credenciais

No dashboard do Supabase:
1. Vá em **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

## 6. Para Netlify

No dashboard do Netlify, configure as variáveis:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Estrutura do Banco de Dados

### Tabela `players`
- `id` (UUID, PK)
- `name` (TEXT, NOT NULL)
- `email` (TEXT, nullable)
- `phone` (TEXT, nullable)
- `created_at` (TIMESTAMP)

### Tabela `sessions`
- `id` (UUID, PK)
- `player_id` (UUID, FK → players.id)
- `chip_count` (INTEGER, NOT NULL)
- `date` (TIMESTAMP, NOT NULL)
- `notes` (TEXT, nullable)
- `created_at` (TIMESTAMP)

## Segurança (RLS)

As políticas de Row Level Security (RLS) estão configuradas para permitir acesso público.
Para produção, ajuste as políticas conforme necessário no dashboard do Supabase:
**Authentication** → **Policies**
