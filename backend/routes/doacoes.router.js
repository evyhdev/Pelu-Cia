import { Router } from 'express';
import {
  obterConfiguracaoDoacaoController,
  salvarConfiguracaoDoacaoController,
} from '../controllers/doacoes.controller.js';
import { exigirAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obterConfiguracaoDoacaoController);
router.put('/', exigirAdmin, salvarConfiguracaoDoacaoController);

export default router;
