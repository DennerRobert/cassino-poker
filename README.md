# 🎰 Cassino Poker - Sistema de Ranking

Sistema web para gerenciar rankings de jogadores de poker em cassinos, construído com Next.js, Supabase, Zustand e TailwindCSS.

## 🚀 Tecnologias

- **Framework**: Next.js 16.1.6 (App Router + Turbopack)
- **Banco de Dados**: Supabase (PostgreSQL)
- **Estado Global**: Zustand
- **Validação**: Zod
- **Formulários**: React Hook Form
- **Estilização**: TailwindCSS 4 + Lucide Icons
- **TypeScript**: Tipagem completa

## 📋 Pré-requisitos

- Node.js >= 20.9.0
- Conta no Supabase (gratuita)
- npm ou yarn

## 🔧 Instalação

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd cassino-poker
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com/) e crie um novo projeto
2. No SQL Editor, execute o script em `supabase/migrations/001_initial_schema.sql`
3. (Opcional) Execute `supabase/seed.sql` para popular com dados de exemplo
4. Copie as credenciais em **Settings → API**:
   - **Project URL**
   - **anon/public key**

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 5. Executar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🌐 Deploy

### Netlify

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático!

### Vercel

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático!

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   │   ├── players/       # CRUD de jogadores
│   │   ├── sessions/      # CRUD de sessões
│   │   └── rankings/      # Rankings calculados
│   ├── players/           # Página de jogadores
│   ├── sessions/          # Página de sessões
│   └── ranking/           # Página de ranking
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizáveis
│   ├── PlayerForm.tsx
│   ├── SessionForm.tsx
│   └── ...
├── lib/                   # Utilitários
│   ├── supabase.ts       # Config do Supabase
│   └── utils.ts          # Funções auxiliares
├── stores/               # Estado global (Zustand)
│   ├── playerStore.ts
│   └── sessionStore.ts
└── schemas/              # Validações (Zod)
    ├── player.schema.ts
    └── session.schema.ts

supabase/
├── migrations/           # Scripts SQL
└── README.md            # Documentação do Supabase
```

## 🎯 Funcionalidades

### Jogadores
- ✅ Criar jogador (nome, email, telefone)
- ✅ Listar jogadores
- ✅ Editar jogador
- ✅ Deletar jogador
- ✅ Ver histórico de sessões

### Sessões
- ✅ Registrar sessão de poker
- ✅ Vincular a um jogador
- ✅ Registrar valor em dinheiro
- ✅ Adicionar notas
- ✅ Editar sessão
- ✅ Deletar sessão

### Rankings
- ✅ Calcular total de dinheiro por jogador
- ✅ Calcular média por sessão
- ✅ Ordenar por total de dinheiro
- ✅ Exibir número de sessões
- ✅ Top 3 com destaque visual

### Dashboard
- ✅ Estatísticas gerais
- ✅ Sessões recentes
- ✅ Top 3 jogadores
- ✅ Gráficos visuais

## 🗄️ Estrutura do Banco de Dados

### Tabela `players`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK, auto-gerado |
| name | TEXT | Nome do jogador |
| email | TEXT | Email (opcional) |
| phone | TEXT | Telefone (opcional) |
| created_at | TIMESTAMP | Data de criação |

### Tabela `sessions`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK, auto-gerado |
| player_id | UUID | FK → players.id |
| chip_count | INTEGER | Valor em dinheiro |
| date | TIMESTAMP | Data da sessão |
| notes | TEXT | Observações (opcional) |
| created_at | TIMESTAMP | Data de criação |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

⚡ Feito com Next.js e Supabase
