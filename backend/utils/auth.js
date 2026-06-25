import crypto from 'crypto';

const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'pelucia-dev-secret';
const TOKEN_DURATION = 1000 * 60 * 60 * 8;

function assinar(payload) {
  return crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
}

function assinaturasIguais(assinaturaRecebida, assinaturaEsperada) {
  const recebida = Buffer.from(assinaturaRecebida);
  const esperada = Buffer.from(assinaturaEsperada);

  return recebida.length === esperada.length && crypto.timingSafeEqual(recebida, esperada);
}

export function criarTokenAdmin() {
  const dados = {
    tipo: 'admin',
    expiraEm: Date.now() + TOKEN_DURATION,
  };
  const payload = Buffer.from(JSON.stringify(dados)).toString('base64url');
  const assinatura = assinar(payload);

  return `${payload}.${assinatura}`;
}

export function validarTokenAdmin(token) {
  if (!token) {
    return false;
  }

  const [payload, assinatura] = token.split('.');

  if (!payload || !assinatura || !assinaturasIguais(assinatura, assinar(payload))) {
    return false;
  }

  try {
    const dados = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return dados.tipo === 'admin' && dados.expiraEm > Date.now();
  } catch (erro) {
    return false;
  }
}
