export function validarIdNumerico(id, nomeEntidade) {
  const idNumerico = Number(id);

  if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
    throw { status: 400, message: `ID de ${nomeEntidade} inválido.` };
  }

  return idNumerico;
}
