export function enviarSucesso(res, data, status = 200) {
  return res.status(status).json({ sucesso: true, data });
}

export function enviarCriado(res, data) {
  return enviarSucesso(res, data, 201);
}

export function enviarErro(res, err, fallback = 'Erro interno do servidor.') {
  const status = err?.status || 500;
  const message = err?.message || fallback;

  return res.status(status).json({ sucesso: false, message });
}

export function criarErro(status, message) {
  const erro = new Error(message);
  erro.status = status;
  return erro;
}
