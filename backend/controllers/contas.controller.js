import {
  cadastrarContaPrestacao,
  obterContasPrestacao,
  removerContaPrestacao,
} from '../services/contas.service.js';

export async function criarContaPrestacaoController(req, res) {
  try {
    const conta = await cadastrarContaPrestacao(req.body);
    res.status(201).json({ sucesso: true, data: conta });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro ao cadastrar conta.';
    res.status(status).json({ sucesso: false, message });
  }
}

export async function listarContasPrestacaoController(_req, res) {
  try {
    const contas = await obterContasPrestacao();
    res.json({ sucesso: true, data: contas });
  } catch (err) {
    res.status(500).json({ sucesso: false, message: 'Erro ao buscar contas.' });
  }
}

export async function deletarContaPrestacaoController(req, res) {
  try {
    await removerContaPrestacao(req.params.id);
    res.status(204).send();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro ao deletar conta.';
    res.status(status).json({ sucesso: false, message });
  }
}
