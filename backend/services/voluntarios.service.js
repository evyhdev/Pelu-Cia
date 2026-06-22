import {
  criarVoluntario,
  listarVoluntarios,
} from "../repositories/voluntarios.repository.js";

function validarDadosVoluntario(dados) {
  const { nome, email, telefone, idade, disponibilidade } = dados;

  if (!nome || !email || !telefone || !idade || !disponibilidade) {
    throw { status: 400, message: "Todos os campos são obrigatórios." };
  }

  const idadeNum = parseInt(idade);

  if (isNaN(idadeNum) || idadeNum < 16) {
    throw { status: 400, message: "Idade mínima é 16 anos." };
  }

  const disponibilidades = ["manha", "tarde", "noite", "finais-de-semana"];

  if (!disponibilidades.includes(disponibilidade)) {
    throw { status: 400, message: "Disponibilidade inválida." };
  }

  return {
    nome: String(nome).trim(),
    email: String(email).trim(),
    telefone: String(telefone).trim(),
    idade: idadeNum,
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