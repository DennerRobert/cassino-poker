# 📝 Migração Prisma → Supabase

Este documento descreve a migração completa do projeto de Prisma + SQLite para Supabase + PostgreSQL.

## ✅ O que foi feito

### 1. Instalação de Dependências
- ✅ Instalado `@supabase/supabase-js` (v2.93.3)
- ✅ Removido `@prisma/client` e `prisma`
- ✅ Removido `dotenv-cli` e `tsx` (não mais necessários)

### 2. Configuração do Supabase
- ✅ Criado `src/lib/supabase.ts` com cliente configurado
- ✅ Definidas interfaces TypeScript para `Player` e `Session`
- ✅ Variáveis de ambiente atualizadas para Supabase

### 3. Scripts SQL de Migração
- ✅ Criado `supabase/migrations/001_initial_schema.sql`:
  - Tabelas `players` e `sessions`
  - Índices para performance
  - Row Level Security (RLS) habilitado
  - Políticas de acesso público configuradas

- ✅ Criado `supabase/seed.sql`:
  - 8 jogadores de exemplo
  - 18 sessões de exemplo
  - Dados compatíveis com o seed anterior do Prisma

### 4. APIs Atualizadas
Todas as rotas foram migradas de Prisma para Supabase:

#### `/api/players`
- ✅ `GET`: Listar jogadores
- ✅ `POST`: Criar jogador

#### `/api/players/[id]`
- ✅ `GET`: Buscar jogador com sessões
- ✅ `PATCH`: Atualizar jogador
- ✅ `DELETE`: Deletar jogador

#### `/api/sessions`
- ✅ `GET`: Listar sessões com jogador
- ✅ `POST`: Criar sessão

#### `/api/sessions/[id]`
- ✅ `GET`: Buscar sessão
- ✅ `PATCH`: Atualizar sessão
- ✅ `DELETE`: Deletar sessão

#### `/api/sessions/player/[playerId]`
- ✅ `GET`: Listar sessões de um jogador

#### `/api/rankings`
- ✅ `GET`: Calcular e retornar rankings

### 5. Stores Zustand Atualizados
- ✅ `playerStore.ts`: Mapeamento de campos snake_case → camelCase
- ✅ `sessionStore.ts`: Mapeamento de campos snake_case → camelCase
- ✅ Conversão correta de timestamps para Date objects

### 6. Limpeza de Arquivos
- ✅ Removido `src/lib/prisma.ts`
- ✅ Removida pasta `prisma/` completa
- ✅ Removidos scripts do Prisma do `package.json`
- ✅ Atualizado `README.md` com instruções do Supabase

## 🔄 Mapeamento de Campos

### PostgreSQL (Supabase) → TypeScript

| Supabase (snake_case) | TypeScript (camelCase) |
|-----------------------|------------------------|
| `id` | `id` |
| `name` | `name` |
| `email` | `email` |
| `phone` | `phone` |
| `created_at` | `createdAt` |
| `player_id` | `playerId` |
| `chip_count` | `chipCount` |

## 🚀 Próximos Passos

### Para o Desenvolvedor:

1. **Criar projeto no Supabase**:
   - Acesse https://supabase.com/
   - Crie um novo projeto
   - Anote as credenciais (URL e anon key)

2. **Executar migrations**:
   - No SQL Editor do Supabase
   - Execute `supabase/migrations/001_initial_schema.sql`
   - Execute `supabase/seed.sql` (opcional)

3. **Configurar .env.local**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```

4. **Testar localmente**:
   ```bash
   npm run dev
   ```

### Para Deploy no Netlify:

1. Configure as variáveis de ambiente no dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Deploy automático via Git

## ⚠️ Diferenças Importantes

### Prisma vs Supabase

| Aspecto | Prisma | Supabase |
|---------|--------|----------|
| **Sintaxe** | ORM com métodos como `.findMany()` | Cliente SQL-like com `.select()` |
| **Joins** | `include: { player: true }` | `.select('*, player:players(*)')` |
| **Campos** | camelCase no schema | snake_case no PostgreSQL |
| **IDs** | CUID por padrão | UUID no PostgreSQL |
| **Timestamps** | Automático via Prisma | Automático via PostgreSQL DEFAULT |

### Performance

- ✅ Supabase é mais rápido para queries complexas
- ✅ Built-in connection pooling
- ✅ Edge functions disponíveis
- ✅ Realtime subscriptions (não usado ainda)

## 📊 Vantagens da Migração

1. **Sem database file local** - Banco na nuvem desde o desenvolvimento
2. **Escalabilidade** - PostgreSQL é mais robusto que SQLite
3. **Deploy simplificado** - Sem preocupação com migrações em produção
4. **Dashboard visual** - Interface para gerenciar dados
5. **Gratuito** - Plano free generoso do Supabase
6. **RLS nativo** - Segurança em nível de linha
7. **APIs REST/GraphQL** - Geradas automaticamente (não usadas, mas disponíveis)

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se `.env.local` existe e está configurado
- Reinicie o servidor de desenvolvimento

### Erro: "relation does not exist"
- Execute as migrations no SQL Editor do Supabase
- Verifique se está usando o projeto correto

### Dados não aparecem
- Verifique as políticas RLS no Supabase
- Execute o seed.sql para dados de exemplo
- Verifique logs no dashboard do Supabase

## 📚 Recursos Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

✨ Migração concluída com sucesso!
