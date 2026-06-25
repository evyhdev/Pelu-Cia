import {
  cadastrarNoticia,
  obterNoticias,
  removerNoticia,
} from "../services/noticias.service.js";
import { enviarCriado, enviarErro, enviarSucesso } from "../utils/http.js";

export async function listarNoticiasController(req, res) {
  try {
    const noticias = await obterNoticias();
    enviarSucesso(res, noticias);
  } catch (err) {
    enviarErro(res, err, "Erro ao buscar notícias.");
  }
}

export async function criarNoticiaController(req, res) {
  try {
    const noticia = await cadastrarNoticia(req.body);
    enviarCriado(res, noticia);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ sucesso: false, message: "Título de notícia já cadastrado." });
    }

    enviarErro(res, err, "Erro ao criar notícia.");
  }
}

export async function deletarNoticiaController(req, res) {
  try {
    await removerNoticia(req.params.id);
    res.status(204).send();
  } catch (err) {
    enviarErro(res, err, "Erro ao deletar notícia.");
  }
}
