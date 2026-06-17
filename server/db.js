import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pelucia',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS voluntarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      cpf VARCHAR(14) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      telefone VARCHAR(20) NOT NULL,
      idade INTEGER NOT NULL CHECK (idade >= 16),
      profissao VARCHAR(255) NOT NULL,
      disponibilidade VARCHAR(50) NOT NULL,
      criado_em TIMESTAMP DEFAULT NOW()
    )
  `);
}

export default pool;