import { Router } from 'express';
import { cadastrarVoluntario, obterVoluntarios, obterVoluntarioPorId } from './voluntarios.service.js';

const router = Router();

router.post('/', async (req, res) => {
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
});

router.get('/', async (req, res) => {
  try {
    const voluntarios = await obterVoluntarios();
    res.json({ sucesso: true, data: voluntarios });
  } catch (err) {
    res.status(500).json({ sucesso: false, message: 'Erro ao buscar voluntários.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const voluntario = await obterVoluntarioPorId(req.params.id);
    res.json({ sucesso: true, data: voluntario });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ sucesso: false, message: err.message });
  }
});

export default router;