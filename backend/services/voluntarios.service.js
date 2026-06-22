import { criarVoluntario, listarVoluntarios } from '../repositories/voluntarios.repository.js';

function validarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length !== 11 || /^(\d)\1+$/.test(numeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(numeros[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(numeros[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(numeros[10]);
}

function validarDadosVoluntario(dados) {
  const { nome, cpf, email, telefone, idade, profissao, disponibilidade } = dados;

  if (!nome || !cpf || !email || !telefone || !idade || !profissao || !disponibilidade) {
    throw { status: 400, message: 'Todos os campos são obrigatórios.' };
  }

  if (!validarCPF(cpf)) {
    throw { status: 400, message: 'CPF inválido.' };
  }

  const idadeNum = parseInt(idade);
  if (isNaN(idadeNum) || idadeNum < 16) {
    throw { status: 400, message: 'Idade mínima é 16 anos.' };
  }

  const disponibilidades = ['manha', 'tarde', 'noite', 'finais-de-semana'];
  if (!disponibilidades.includes(disponibilidade)) {
    throw { status: 400, message: 'Disponibilidade inválida.' };
  }

  const cpfFormatado = cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  return {
    nome: String(nome).trim(),
    cpf: cpfFormatado,
    email: String(email).trim(),
    telefone: String(telefone).trim(),
    idade: idadeNum,
    profissao: String(profissao).trim(),
    disponibilidade,
  };
}

export async function cadastrarVoluntario(dados) {
  const voluntarioValidado = validarDadosVoluntario(dados);
  return await criarVoluntario(voluntarioValidado);
}

export async function obterVoluntarios() {
  return await listarVoluntarios();
}
