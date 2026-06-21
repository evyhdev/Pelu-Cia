import { enviarMensagemContato } from '../services/contato.service.js';

export async function enviarMensagemContatoController(req, res) {
  try {
    await enviarMensagemContato(req.body);
    res.status(201).json({ sucesso: true });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro ao enviar mensagem de contato.';
    res.status(status).json({ sucesso: false, message });
  }
}
