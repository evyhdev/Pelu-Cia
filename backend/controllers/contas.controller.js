import {
  cadastrarContaPrestacao,
  obterContasPrestacao,
  removerContaPrestacao,
} from '../services/contas.service.js';
import { enviarCriado, enviarErro, enviarSucesso } from '../utils/http.js';

export async function criarContaPrestacaoController(req, res) {
  try {
    const conta = await cadastrarContaPrestacao(req.body);
    enviarCriado(res, conta);
  } catch (err) {
    enviarErro(res, err, 'Erro ao cadastrar conta.');
  }
}

export async function listarContasPrestacaoController(_req, res) {
  try {
    const contas = await obterContasPrestacao();
    enviarSucesso(res, contas);
  } catch (err) {
    enviarErro(res, err, 'Erro ao buscar contas.');
  }
}

export async function deletarContaPrestacaoController(req, res) {
  try {
    await removerContaPrestacao(req.params.id);
    res.status(204).send();
  } catch (err) {
    enviarErro(res, err, 'Erro ao deletar conta.');
  }
}
