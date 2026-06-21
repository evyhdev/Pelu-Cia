import { Router } from 'express';
import {
  criarContaPrestacaoController,
  deletarContaPrestacaoController,
  listarContasPrestacaoController,
} from '../controllers/contas.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', listarContasPrestacaoController);
router.post('/', exigirAdmin, criarContaPrestacaoController);
router.delete('/:id', exigirAdmin, deletarContaPrestacaoController);

export default router;
