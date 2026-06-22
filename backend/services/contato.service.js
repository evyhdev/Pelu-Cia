import {
  criarMensagemContato,
  listarMensagensContato,
} from '../repositories/contato.repository.js';

function limpar(valor) {
  return String(valor ?? '').trim();
}

export async function enviarMensagemContato(dados) {
  const nome = limpar(dados.nome);
  const email = limpar(dados.email);
  const mensagem = limpar(dados.mensagem);

  if (!nome || !email || !mensagem) {
    throw { status: 400, message: 'Todos os campos do contato são obrigatórios.' };
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    throw { status: 400, message: 'E-mail inválido.' };
  }

  return await criarMensagemContato({ nome, email, mensagem });
}

export async function obterMensagensContato() {
  return await listarMensagensContato();
}
