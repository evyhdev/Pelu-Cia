import pool from '../config/db.js';

export async function criarMensagemContato(dados) {
  const { nome, email, mensagem } = dados;
  const result = await pool.query(
    `INSERT INTO mensagens_contato (nome, email, mensagem)
     VALUES ($1, $2, $3)
     RETURNING id, nome, email, mensagem, lida, criado_em`,
    [nome, email, mensagem],
  );

  return result.rows[0];
}

export async function listarMensagensContato() {
  const result = await pool.query(
    `SELECT id, nome, email, mensagem, lida, criado_em
     FROM mensagens_contato
     ORDER BY lida ASC, criado_em DESC, id DESC`,
  );

  return result.rows;
}

export async function marcarMensagemComoLida(id) {
  const result = await pool.query(
    `UPDATE mensagens_contato
     SET lida = TRUE
     WHERE id = $1
     RETURNING id, nome, email, mensagem, lida, criado_em`,
    [id],
  );

  return result.rows[0] || null;
}

export async function deletarMensagemContato(id) {
  const result = await pool.query(
    `DELETE FROM mensagens_contato
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  return result.rowCount > 0;
}
