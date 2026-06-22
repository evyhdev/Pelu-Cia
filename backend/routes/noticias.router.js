import { Router } from 'express';
import {
  criarNoticiaController,
  deletarNoticiaController,
  listarNoticiasController,
} from '../controllers/noticias.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', listarNoticiasController);
router.post('/', exigirAdmin, criarNoticiaController);
router.delete('/:id', exigirAdmin, deletarNoticiaController);

export default router;
