import { Router } from 'express';
import {
  buscarVoluntarioController,
  criarVoluntarioController,
  listarVoluntariosController,
} from '../controllers/voluntarios.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', criarVoluntarioController);
router.post('/admin', exigirAdmin, criarVoluntarioController);
router.get('/', exigirAdmin, listarVoluntariosController);
router.get('/:id', exigirAdmin, buscarVoluntarioController);

export default router;
