import {
  criarNoticia,
  deletarNoticia,
  listarNoticias,
} from '../repositories/noticias.repository.js';
import { criarErro } from '../utils/http.js';
import { validarIdNumerico } from '../utils/validations.js';

function validarNoticia(dados) {
  const { titulo, foto, resumo, noticia, data, tipo } = dados;

  if (!titulo || !foto || !resumo || !noticia || !data || !tipo) {
    throw criarErro(400, 'Todos os campos da notícia são obrigatórios.');
  }

  if (Number.isNaN(Date.parse(data))) {
    throw criarErro(400, 'Data inválida.');
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
    throw criarErro(404, 'Notícia não encontrada.');
  }
}
