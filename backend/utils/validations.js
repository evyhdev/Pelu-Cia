import { criarErro } from './http.js';

export function validarIdNumerico(id, nomeEntidade) {
  const idNumerico = Number(id);

  if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
    throw criarErro(400, `ID de ${nomeEntidade} inválido.`);
  }

  return idNumerico;
}
