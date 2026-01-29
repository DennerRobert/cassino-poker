-- Limpar dados existentes
TRUNCATE TABLE sessions CASCADE;
TRUNCATE TABLE players CASCADE;

-- Inserir jogadores
INSERT INTO players (id, name, email, phone) VALUES
  (uuid_generate_v4(), 'João Silva', 'joao@email.com', '(11) 98765-4321'),
  (uuid_generate_v4(), 'Maria Santos', 'maria@email.com', '(11) 91234-5678'),
  (uuid_generate_v4(), 'Pedro Oliveira', 'pedro@email.com', NULL),
  (uuid_generate_v4(), 'Ana Costa', 'ana@email.com', '(11) 99876-5432'),
  (uuid_generate_v4(), 'Carlos Ferreira', NULL, '(11) 97654-3210'),
  (uuid_generate_v4(), 'Juliana Alves', 'juliana@email.com', '(11) 96543-2109'),
  (uuid_generate_v4(), 'Roberto Lima', 'roberto@email.com', NULL),
  (uuid_generate_v4(), 'Fernanda Souza', 'fernanda@email.com', '(11) 95432-1098');

-- Inserir sessões (usando os IDs dos jogadores criados)
WITH player_ids AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY name) as rn FROM players
)
INSERT INTO sessions (player_id, chip_count, date, notes)
SELECT 
  (SELECT id FROM player_ids WHERE rn = 1), 15000, '2026-01-25'::timestamp, 'Boa noite'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 1), 22000, '2026-01-26'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 1), 18500, '2026-01-27'::timestamp, 'Excelente jogo'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 2), 28000, '2026-01-25'::timestamp, 'Vitória importante'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 2), 31000, '2026-01-26'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 2), 25500, '2026-01-28'::timestamp, 'Bom resultado'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 3), 12000, '2026-01-25'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 3), 9500, '2026-01-27'::timestamp, 'Dia difícil'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 4), 19000, '2026-01-26'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 4), 21500, '2026-01-27'::timestamp, 'Melhorando'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 4), 23000, '2026-01-28'::timestamp, 'Ótimo desempenho'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 5), 16500, '2026-01-25'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 5), 14000, '2026-01-28'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 6), 27000, '2026-01-26'::timestamp, 'Excelente'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 6), 29500, '2026-01-27'::timestamp, 'Continua forte'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 7), 11000, '2026-01-27'::timestamp, NULL
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 8), 20000, '2026-01-25'::timestamp, 'Primeira vez'
UNION ALL SELECT 
  (SELECT id FROM player_ids WHERE rn = 8), 24500, '2026-01-28'::timestamp, 'Melhor resultado';
