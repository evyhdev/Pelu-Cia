import {
  criarVoluntario,
  listarVoluntarios,
} from "../repositories/voluntarios.repository.js";
import { criarErro } from "../utils/http.js";

function validarDadosVoluntario(dados) {
  const { nome, email, telefone, idade, disponibilidade } = dados;

  if (!nome || !email || !telefone || !idade || !disponibilidade) {
    throw criarErro(400, "Todos os campos são obrigatórios.");
  }

  const idadeNum = parseInt(idade);

  if (isNaN(idadeNum) || idadeNum < 16) {
    throw criarErro(400, "Idade mínima é 16 anos.");
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

  if (!emailValido) {
    throw criarErro(400, "E-mail inválido.");
  }

  const disponibilidades = ["manha", "tarde", "noite", "finais-de-semana"];

  if (!disponibilidades.includes(disponibilidade)) {
    throw criarErro(400, "Disponibilidade inválida.");
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
