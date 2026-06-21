import {
  criarContaPrestacao,
  deletarContaPrestacao,
  listarContasPrestacao,
} from '../repositories/contas.repository.js';
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
    throw { status: 400, message: 'Todos os campos da conta são obrigatórios.' };
  }

  if (!['entrada', 'saida'].includes(tipo)) {
    throw { status: 400, message: 'Tipo de conta inválido.' };
  }

  const valorNumerico = normalizarValor(valor);

  if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
    throw { status: 400, message: 'Valor inválido.' };
  }

  if (Number.isNaN(Date.parse(data))) {
    throw { status: 400, message: 'Data inválida.' };
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
    throw { status: 404, message: 'Conta não encontrada.' };
  }
}
