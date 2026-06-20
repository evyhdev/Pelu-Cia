import { Router } from 'express';
import {
  buscarVoluntarioController,
  criarVoluntarioController,
  listarVoluntariosController,
} from '../controllers/voluntarios.controller.js';

const router = Router();

router.post('/', criarVoluntarioController);
router.get('/', listarVoluntariosController);
router.get('/:id', buscarVoluntarioController);

export default router;
