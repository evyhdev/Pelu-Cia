import pool from '../config/db.js';

export async function criarVoluntario(dados) {
  const { nome, cpf, email, telefone, idade, profissao, disponibilidade } = dados;
  const result = await pool.query(
    `INSERT INTO voluntarios (nome, cpf, email, telefone, idade, profissao, disponibilidade)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, nome, email, criado_em`,
    [nome, cpf, email, telefone, idade, profissao, disponibilidade]
  );
  return result.rows[0];
}

export async function listarVoluntarios() {
  const result = await pool.query(
    'SELECT id, nome, email, telefone, disponibilidade, criado_em FROM voluntarios ORDER BY criado_em DESC'
  );
  return result.rows;
}

export async function buscarVoluntarioPorId(id) {
  const result = await pool.query(
    'SELECT id, nome, email, telefone, disponibilidade, criado_em FROM voluntarios WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}
