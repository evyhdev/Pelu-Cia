import {
  criarContaPrestacao,
  deletarContaPrestacao,
  listarContasPrestacao,
} from '../repositories/contas.repository.js';
import { criarErro } from '../utils/http.js';
import { validarIdNumerico } from '../utils/validations.js';

function normalizarValor(valor) {
  if (typeof valor === 'string') {
    return Number(valor.replace(',', '.'));
  }

  return Number(valor);
}

function validarContaPrestacao(dados) {
  const { tipo, descricao, valor, data } = dados;

  if (!tipo || !descricao || valor === undefined || valor === null || !data) {
    throw criarErro(400, 'Todos os campos da conta são obrigatórios.');
  }

  if (!['entrada', 'saida'].includes(tipo)) {
    throw criarErro(400, 'Tipo de conta inválido.');
  }

  const valorNumerico = normalizarValor(valor);

  if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
    throw criarErro(400, 'Valor inválido.');
  }

  if (Number.isNaN(Date.parse(data))) {
    throw criarErro(400, 'Data inválida.');
  }

  return {
    tipo,
    descricao: String(descricao).trim(),
    valor: valorNumerico,
    data,
  };
}

export async function cadastrarContaPrestacao(dados) {
  const contaValidada = validarContaPrestacao(dados);
  return await criarContaPrestacao(contaValidada);
}

export async function obterContasPrestacao() {
  return await listarContasPrestacao();
}

export async function removerContaPrestacao(id) {
  const idNumerico = validarIdNumerico(id, 'conta');
  const contaFoiRemovida = await deletarContaPrestacao(idNumerico);

  if (!contaFoiRemovida) {
    throw criarErro(404, 'Conta não encontrada.');
  }
}
