import pool from '../config/db.js';

export async function criarNoticia(dados) {
  const { titulo, foto, resumo, noticia, data, tipo } = dados;
  const result = await pool.query(
    `INSERT INTO noticias (titulo, foto, resumo, noticia, data, tipo)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, titulo, foto, resumo, noticia, data, tipo, criado_em`,
    [titulo, foto, resumo, noticia, data, tipo]
  );

  return result.rows[0];
}

export async function listarNoticias() {
  const result = await pool.query(
    `SELECT id, titulo, foto, resumo, noticia, data, tipo, criado_em
     FROM noticias
     ORDER BY data DESC, id DESC`
  );

  return result.rows;
}

export async function buscarNoticiaPorId(id) {
  const result = await pool.query(
    `SELECT id, titulo, foto, resumo, noticia, data, tipo, criado_em
     FROM noticias
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

export async function atualizarNoticia(id, dados) {
  const { titulo, foto, resumo, noticia, data, tipo } = dados;
  const result = await pool.query(
    `UPDATE noticias
     SET titulo = $1,
         foto = $2,
         resumo = $3,
         noticia = $4,
         data = $5,
         tipo = $6
     WHERE id = $7
     RETURNING id, titulo, foto, resumo, noticia, data, tipo, criado_em`,
    [titulo, foto, resumo, noticia, data, tipo, id]
  );

  return result.rows[0] || null;
}

export async function deletarNoticia(id) {
  const result = await pool.query(
    `DELETE FROM noticias
     WHERE id = $1
     RETURNING id`,
    [id]
  );

  return result.rowCount > 0;
}
