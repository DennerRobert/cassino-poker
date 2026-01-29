import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('🧹 Limpando banco de dados...');

  await prisma.session.deleteMany();
  console.log('✓ Todas as sessions deletadas');

  await prisma.player.deleteMany();
  console.log('✓ Todos os players deletados');

  console.log('\n✅ Banco de dados limpo com sucesso!');
};

main()
  .catch((error) => {
    console.error('❌ Erro ao limpar banco:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
