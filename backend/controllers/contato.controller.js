import {
  enviarMensagemContato,
  obterMensagensContato,
} from '../services/contato.service.js';

export async function enviarMensagemContatoController(req, res) {
  try {
    const mensagem = await enviarMensagemContato(req.body);
    res.status(201).json({ sucesso: true, data: mensagem });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro ao salvar mensagem de contato.';
    res.status(status).json({ sucesso: false, message });
  }
}

export async function listarMensagensContatoController(_req, res) {
  try {
    const mensagens = await obterMensagensContato();
    res.json({ sucesso: true, data: mensagens });
  } catch (err) {
    res.status(500).json({ sucesso: false, message: 'Erro ao buscar mensagens.' });
  }
}
