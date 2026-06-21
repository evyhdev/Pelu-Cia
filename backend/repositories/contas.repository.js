import pool from '../config/db.js';

export async function criarContaPrestacao(dados) {
  const { tipo, descricao, valor, data } = dados;
  const result = await pool.query(
    `INSERT INTO contas_prestacao (tipo, descricao, valor, data)
     VALUES ($1, $2, $3, $4)
     RETURNING id, tipo, descricao, valor, data, criado_em`,
    [tipo, descricao, valor, data]
  );

  return result.rows[0];
}

export async function listarContasPrestacao() {
  const result = await pool.query(
    `SELECT id, tipo, descricao, valor, data, criado_em
     FROM contas_prestacao
     ORDER BY data DESC, id DESC`
  );

  return result.rows;
}

export async function deletarContaPrestacao(id) {
  const result = await pool.query(
    `DELETE FROM contas_prestacao
     WHERE id = $1
     RETURNING id`,
    [id]
  );

  return result.rowCount > 0;
}
