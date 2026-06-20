import {
  cadastrarVoluntario,
  obterVoluntarioPorId,
  obterVoluntarios,
} from '../services/voluntarios.service.js';

export async function criarVoluntarioController(req, res) {
  try {
    const voluntario = await cadastrarVoluntario(req.body);
    res.status(201).json({ sucesso: true, data: voluntario });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor.';

    if (err.code === '23505') {
      return res.status(409).json({ sucesso: false, message: 'CPF ou e-mail já cadastrado.' });
    }

    res.status(status).json({ sucesso: false, message });
  }
}

export async function listarVoluntariosController(req, res) {
  try {
    const voluntarios = await obterVoluntarios();
    res.json({ sucesso: true, data: voluntarios });
  } catch (err) {
    res.status(500).json({ sucesso: false, message: 'Erro ao buscar voluntários.' });
  }
}

export async function buscarVoluntarioController(req, res) {
  try {
    const voluntario = await obterVoluntarioPorId(req.params.id);
    res.json({ sucesso: true, data: voluntario });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro ao buscar voluntário.';
    res.status(status).json({ sucesso: false, message });
  }
}
