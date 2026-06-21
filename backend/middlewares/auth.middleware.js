import { validarTokenAdmin } from '../utils/auth.js';

export function exigirAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!validarTokenAdmin(token)) {
    return res.status(401).json({ sucesso: false, message: 'Acesso não autorizado.' });
  }

  next();
}
