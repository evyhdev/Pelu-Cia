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
      foto TEXT NOT NULL,
      resumo TEXT NOT NULL,
      noticia TEXT NOT NULL,
      data DATE NOT NULL,
      tipo VARCHAR(80) NOT NULL,
      criado_em TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    ALTER TABLE noticias
    ALTER COLUMN foto TYPE TEXT
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contas_prestacao (
      id SERIAL PRIMARY KEY,
      tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
      descricao TEXT NOT NULL,
      valor NUMERIC(12, 2) NOT NULL CHECK (valor > 0),
      data DATE NOT NULL,
      criado_em TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS configuracoes_doacao (
      id INTEGER PRIMARY KEY,
      pix_chave TEXT NOT NULL DEFAULT '',
      pix_favorecido TEXT NOT NULL DEFAULT '',
      banco VARCHAR(255) NOT NULL DEFAULT '',
      agencia VARCHAR(100) NOT NULL DEFAULT '',
      conta VARCHAR(100) NOT NULL DEFAULT '',
      instituicao TEXT NOT NULL DEFAULT '',
      observacao_transferencia TEXT NOT NULL DEFAULT ''
    )
  `);

  await pool.query(`
    ALTER TABLE configuracoes_doacao
    DROP COLUMN IF EXISTS pix_link
  `);
}
