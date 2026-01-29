import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_PLAYERS = [
  {
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 98765-4321',
  },
  {
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 91234-5678',
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '',
  },
  {
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 99876-5432',
  },
  {
    name: 'Carlos Ferreira',
    email: '',
    phone: '(11) 97654-3210',
  },
  {
    name: 'Juliana Alves',
    email: 'juliana@email.com',
    phone: '(11) 96543-2109',
  },
  {
    name: 'Roberto Lima',
    email: 'roberto@email.com',
    phone: '',
  },
  {
    name: 'Fernanda Souza',
    email: 'fernanda@email.com',
    phone: '(11) 95432-1098',
  },
];

const main = async () => {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.session.deleteMany();
  await prisma.player.deleteMany();
  console.log('✓ Dados existentes removidos');

  // Criar players
  const players = [];
  for (const playerData of MOCK_PLAYERS) {
    const player = await prisma.player.create({
      data: {
        name: playerData.name,
        email: playerData.email || null,
        phone: playerData.phone || null,
      },
    });
    players.push(player);
    console.log(`✓ Player criado: ${player.name}`);
  }

  // Criar sessions
  const sessions = [
    // João Silva
    { playerIndex: 0, chipCount: 15000, date: new Date('2026-01-25'), notes: 'Boa noite' },
    { playerIndex: 0, chipCount: 22000, date: new Date('2026-01-26'), notes: '' },
    { playerIndex: 0, chipCount: 18500, date: new Date('2026-01-27'), notes: 'Excelente jogo' },
    
    // Maria Santos
    { playerIndex: 1, chipCount: 28000, date: new Date('2026-01-25'), notes: 'Vitória importante' },
    { playerIndex: 1, chipCount: 31000, date: new Date('2026-01-26'), notes: '' },
    { playerIndex: 1, chipCount: 25500, date: new Date('2026-01-28'), notes: 'Bom resultado' },
    
    // Pedro Oliveira
    { playerIndex: 2, chipCount: 12000, date: new Date('2026-01-25'), notes: '' },
    { playerIndex: 2, chipCount: 9500, date: new Date('2026-01-27'), notes: 'Dia difícil' },
    
    // Ana Costa
    { playerIndex: 3, chipCount: 19000, date: new Date('2026-01-26'), notes: '' },
    { playerIndex: 3, chipCount: 21500, date: new Date('2026-01-27'), notes: 'Melhorando' },
    { playerIndex: 3, chipCount: 23000, date: new Date('2026-01-28'), notes: 'Ótimo desempenho' },
    
    // Carlos Ferreira
    { playerIndex: 4, chipCount: 16500, date: new Date('2026-01-25'), notes: '' },
    { playerIndex: 4, chipCount: 14000, date: new Date('2026-01-28'), notes: '' },
    
    // Juliana Alves
    { playerIndex: 5, chipCount: 27000, date: new Date('2026-01-26'), notes: 'Excelente' },
    { playerIndex: 5, chipCount: 29500, date: new Date('2026-01-27'), notes: 'Continua forte' },
    
    // Roberto Lima
    { playerIndex: 6, chipCount: 11000, date: new Date('2026-01-27'), notes: '' },
    
    // Fernanda Souza
    { playerIndex: 7, chipCount: 20000, date: new Date('2026-01-25'), notes: 'Primeira vez' },
    { playerIndex: 7, chipCount: 24500, date: new Date('2026-01-28'), notes: 'Melhor resultado' },
  ];

  for (const sessionData of sessions) {
    const session = await prisma.session.create({
      data: {
        playerId: players[sessionData.playerIndex].id,
        chipCount: sessionData.chipCount,
        date: sessionData.date,
        notes: sessionData.notes || null,
      },
    });
    console.log(`✓ Session criada: ${session.chipCount} chips para ${players[sessionData.playerIndex].name}`);
  }

  console.log('\n✅ Seed concluído com sucesso!');
  console.log(`📊 ${players.length} jogadores criados`);
  console.log(`🎮 ${sessions.length} sessões criadas`);
};

main()
  .catch((error) => {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
