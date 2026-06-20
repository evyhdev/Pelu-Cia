import { Router } from 'express';
import {
  atualizarNoticiaController,
  buscarNoticiaController,
  criarNoticiaController,
  deletarNoticiaController,
  listarNoticiasController,
} from '../controllers/noticias.controller.js';

const router = Router();

router.get('/', listarNoticiasController);
router.post('/', criarNoticiaController);
router.get('/:id', buscarNoticiaController);
router.put('/:id', atualizarNoticiaController);
router.delete('/:id', deletarNoticiaController);

export default router;
