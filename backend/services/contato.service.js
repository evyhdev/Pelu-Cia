import {
  criarMensagemContato,
  listarMensagensContato,
  marcarMensagemComoLida,
  deletarMensagemContato,
} from '../repositories/contato.repository.js';
import { criarErro } from '../utils/http.js';
import { validarIdNumerico } from '../utils/validations.js';

function limpar(valor) {
  return String(valor ?? '').trim();
}

export async function enviarMensagemContato(dados) {
  const nome = limpar(dados.nome);
  const email = limpar(dados.email);
  const mensagem = limpar(dados.mensagem);

  if (!nome || !email || !mensagem) {
    throw criarErro(400, 'Todos os campos do contato são obrigatórios.');
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    throw criarErro(400, 'E-mail inválido.');
  }

  return await criarMensagemContato({ nome, email, mensagem });
}

export async function obterMensagensContato() {
  return await listarMensagensContato();
}

export async function marcarMensagemContatoComoLida(id) {
  const idNumerico = validarIdNumerico(id, 'mensagem');
  const mensagem = await marcarMensagemComoLida(idNumerico);

  if (!mensagem) {
    throw criarErro(404, 'Mensagem não encontrada.');
  }

  return mensagem;
}

export async function removerMensagemContato(id) {
  const idNumerico = validarIdNumerico(id, 'mensagem');
  const mensagemFoiRemovida = await deletarMensagemContato(idNumerico);

  if (!mensagemFoiRemovida) {
    throw criarErro(404, 'Mensagem não encontrada.');
  }
}
