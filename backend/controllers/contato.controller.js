import {
  enviarMensagemContato,
  marcarMensagemContatoComoLida,
  obterMensagensContato,
  removerMensagemContato,
} from '../services/contato.service.js';
import { enviarCriado, enviarErro, enviarSucesso } from '../utils/http.js';

export async function enviarMensagemContatoController(req, res) {
  try {
    const mensagem = await enviarMensagemContato(req.body);
    enviarCriado(res, mensagem);
  } catch (err) {
    enviarErro(res, err, 'Erro ao salvar mensagem de contato.');
  }
}

export async function listarMensagensContatoController(_req, res) {
  try {
    const mensagens = await obterMensagensContato();
    enviarSucesso(res, mensagens);
  } catch (err) {
    enviarErro(res, err, 'Erro ao buscar mensagens.');
  }
}

export async function marcarMensagemContatoComoLidaController(req, res) {
  try {
    const mensagem = await marcarMensagemContatoComoLida(req.params.id);
    enviarSucesso(res, mensagem);
  } catch (err) {
    enviarErro(res, err, 'Erro ao marcar mensagem como lida.');
  }
}

export async function deletarMensagemContatoController(req, res) {
  try {
    await removerMensagemContato(req.params.id);
    res.status(204).send();
  } catch (err) {
    enviarErro(res, err, 'Erro ao deletar mensagem.');
  }
}
