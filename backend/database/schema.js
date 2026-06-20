export async function createSchema(pool) {
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS noticias (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL UNIQUE,
      foto VARCHAR(500) NOT NULL,
      resumo TEXT NOT NULL,
      noticia TEXT NOT NULL,
      data DATE NOT NULL,
      tipo VARCHAR(80) NOT NULL,
      criado_em TIMESTAMP DEFAULT NOW()
    )
  `);
}
