import { criarTokenAdmin } from '../utils/auth.js';

export function loginAdminController(req, res) {
  const { email, senha } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pelucia.com';
  const adminSenha = process.env.ADMIN_PASSWORD || 'admin123';

  if (email !== adminEmail || senha !== adminSenha) {
    return res.status(401).json({ sucesso: false, message: 'E-mail ou senha inválidos.' });
  }

  res.json({
    sucesso: true,
    token: criarTokenAdmin(),
  });
}
