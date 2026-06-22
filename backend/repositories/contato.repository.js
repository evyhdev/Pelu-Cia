import pool from '../config/db.js';

export async function criarMensagemContato(dados) {
  const { nome, email, mensagem } = dados;
  const result = await pool.query(
    `INSERT INTO mensagens_contato (nome, email, mensagem)
     VALUES ($1, $2, $3)
     RETURNING id, nome, email, mensagem, criado_em`,
    [nome, email, mensagem],
  );

  return result.rows[0];
}

export async function listarMensagensContato() {
  const result = await pool.query(
    `SELECT id, nome, email, mensagem, criado_em
     FROM mensagens_contato
     ORDER BY criado_em DESC, id DESC`,
  );

  return result.rows;
}
