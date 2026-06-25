import {
  cadastrarVoluntario,
  obterVoluntarios,
} from '../services/voluntarios.service.js';
import { enviarCriado, enviarErro, enviarSucesso } from '../utils/http.js';

export async function criarVoluntarioController(req, res) {
  try {
    const voluntario = await cadastrarVoluntario(req.body);
    enviarCriado(res, voluntario);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ sucesso: false, message: 'E-mail já cadastrado.' });
    }

    enviarErro(res, err, 'Erro interno do servidor.');
  }
}

export async function listarVoluntariosController(req, res) {
  try {
    const voluntarios = await obterVoluntarios();
    enviarSucesso(res, voluntarios);
  } catch (err) {
    enviarErro(res, err, 'Erro ao buscar voluntários.');
  }
}
