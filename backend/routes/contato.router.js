import { Router } from 'express';
import { enviarMensagemContatoController } from '../controllers/contato.controller.js';

const router = Router();

router.post('/', enviarMensagemContatoController);

export default router;
