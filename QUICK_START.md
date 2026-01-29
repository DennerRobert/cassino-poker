# ⚡ Quick Start - Cassino Poker

## 🚀 Início Rápido em 5 Passos

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Criar Projeto no Supabase
1. Acesse https://supabase.com/
2. Clique em "New Project"
3. Preencha:
   - **Nome**: cassino-poker
   - **Database Password**: escolha uma senha forte
   - **Region**: escolha a mais próxima

### 3️⃣ Executar Migrations
1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "+ New query"
3. Copie e cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Clique em "Run"
5. (Opcional) Repita com `supabase/seed.sql` para dados de exemplo

### 4️⃣ Configurar Variáveis de Ambiente
1. No dashboard do Supabase, vá em **Settings → API**
2. Copie:
   - **Project URL**
   - **anon/public key**
3. Crie `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 5️⃣ Executar
```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 📦 Deploy no Netlify

### Deploy Automático
1. Faça push para seu repositório Git
2. Conecte no [Netlify](https://netlify.com/)
3. Configure variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

---

## ✅ Checklist

- [ ] Projeto Supabase criado
- [ ] Migrations executadas
- [ ] Seed executado (opcional)
- [ ] `.env.local` configurado
- [ ] `npm install` executado
- [ ] Servidor rodando
- [ ] Testou criar um jogador
- [ ] Testou criar uma sessão
- [ ] Visualizou o ranking

---

## 🆘 Problemas Comuns

### "Missing Supabase environment variables"
➡️ Verifique se `.env.local` existe e está correto

### "relation does not exist"
➡️ Execute as migrations no SQL Editor do Supabase

### Página em branco
➡️ Abra o console do navegador (F12) e verifique erros

### Dados não aparecem
➡️ Execute o seed.sql no Supabase

---

## 📖 Documentação Completa

- `README.md` - Documentação geral do projeto
- `supabase/README.md` - Guia detalhado do Supabase
- `MIGRACAO_SUPABASE.md` - Detalhes técnicos da migração

---

🎉 **Pronto! Seu sistema de ranking de poker está funcionando!**
