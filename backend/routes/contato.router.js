import { Router } from 'express';
import {
  enviarMensagemContatoController,
  listarMensagensContatoController,
} from '../controllers/contato.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', exigirAdmin, listarMensagensContatoController);
router.post('/', enviarMensagemContatoController);

export default router;
