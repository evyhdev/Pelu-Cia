import {
  criarNoticia,
  deletarNoticia,
  listarNoticias,
} from '../repositories/noticias.repository.js';
import { validarIdNumerico } from '../utils/validations.js';

function validarNoticia(dados) {
  const { titulo, foto, resumo, noticia, data, tipo } = dados;

  if (!titulo || !foto || !resumo || !noticia || !data || !tipo) {
    throw { status: 400, message: 'Todos os campos da notícia são obrigatórios.' };
  }

  if (Number.isNaN(Date.parse(data))) {
    throw { status: 400, message: 'Data inválida.' };
  }

  return {
    titulo: String(titulo).trim(),
    foto: String(foto).trim(),
    resumo: String(resumo).trim(),
    noticia: String(noticia).trim(),
    data,
    tipo: String(tipo).trim(),
  };
}

export async function obterNoticias() {
  return await listarNoticias();
}

export async function cadastrarNoticia(dados) {
  const noticiaValidada = validarNoticia(dados);
  return await criarNoticia(noticiaValidada);
}

export async function removerNoticia(id) {
  const idNumerico = validarIdNumerico(id, 'notícia');
  const noticiaFoiRemovida = await deletarNoticia(idNumerico);

  if (!noticiaFoiRemovida) {
    throw { status: 404, message: 'Notícia não encontrada.' };
  }
}
