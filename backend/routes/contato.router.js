import { Router } from 'express';
import {
  deletarMensagemContatoController,
  enviarMensagemContatoController,
  listarMensagensContatoController,
  marcarMensagemContatoComoLidaController,
} from '../controllers/contato.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', exigirAdmin, listarMensagensContatoController);
router.post('/', enviarMensagemContatoController);
router.patch('/:id/lida', exigirAdmin, marcarMensagemContatoComoLidaController);
router.delete('/:id', exigirAdmin, deletarMensagemContatoController);

export default router;
