import pool from '../config/db.js';

const CONFIG_ID = 1;

export async function obterConfiguracaoDoacao() {
  const result = await pool.query(
    `SELECT id, pix_chave, pix_favorecido, banco, agencia, conta, instituicao, observacao_transferencia
     FROM configuracoes_doacao
     WHERE id = $1`,
    [CONFIG_ID]
  );

  return result.rows[0] || null;
}

export async function salvarConfiguracaoDoacao(dados) {
  const {
    pixChave,
    pixFavorecido,
    banco,
    agencia,
    conta,
    instituicao,
    observacaoTransferencia,
  } = dados;

  const result = await pool.query(
    `INSERT INTO configuracoes_doacao (
      id,
      pix_chave,
      pix_favorecido,
      banco,
      agencia,
      conta,
      instituicao,
      observacao_transferencia
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (id) DO UPDATE SET
      pix_chave = EXCLUDED.pix_chave,
      pix_favorecido = EXCLUDED.pix_favorecido,
      banco = EXCLUDED.banco,
      agencia = EXCLUDED.agencia,
      conta = EXCLUDED.conta,
      instituicao = EXCLUDED.instituicao,
      observacao_transferencia = EXCLUDED.observacao_transferencia
    RETURNING id, pix_chave, pix_favorecido, banco, agencia, conta, instituicao, observacao_transferencia`,
    [
      CONFIG_ID,
      pixChave,
      pixFavorecido,
      banco,
      agencia,
      conta,
      instituicao,
      observacaoTransferencia,
    ]
  );

  return result.rows[0];
}
