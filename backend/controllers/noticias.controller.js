import {
  cadastrarNoticia,
  obterNoticias,
  removerNoticia,
} from "../services/noticias.service.js";

export async function listarNoticiasController(req, res) {
  try {
    const noticias = await obterNoticias();
    res.json({ sucesso: true, data: noticias });
  } catch (err) {
    res
      .status(500)
      .json({ sucesso: false, message: "Erro ao buscar notícias." });
  }
}

export async function criarNoticiaController(req, res) {
  try {
    const noticia = await cadastrarNoticia(req.body);
    res.status(201).json({ sucesso: true, data: noticia });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Erro ao criar notícia.";

    if (err.code === "23505") {
      return res
        .status(409)
        .json({ sucesso: false, message: "Título de notícia já cadastrado." });
    }

    res.status(status).json({ sucesso: false, message });
  }
}

export async function deletarNoticiaController(req, res) {
  try {
    await removerNoticia(req.params.id);
    res.status(204).send();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Erro ao deletar notícia.";
    res.status(status).json({ sucesso: false, message });
  }
}
