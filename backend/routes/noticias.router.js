import { Router } from 'express';
import {
  atualizarNoticiaController,
  buscarNoticiaController,
  criarNoticiaController,
  deletarNoticiaController,
  listarNoticiasController,
} from '../controllers/noticias.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', listarNoticiasController);
router.post('/', exigirAdmin, criarNoticiaController);
router.get('/:id', buscarNoticiaController);
router.put('/:id', exigirAdmin, atualizarNoticiaController);
router.delete('/:id', exigirAdmin, deletarNoticiaController);

export default router;
