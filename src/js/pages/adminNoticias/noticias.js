import {
  API_NOTICIAS_URL,
  definirFeedback,
  escaparHTML,
  formatarData,
  lerFoto,
  lerRespostaJson,
  obterCabecalhosAdmin,
  preencherDataAtual,
  prepararConfirmacaoExclusao,
  tratarErroAutenticacao,
} from "./shared.js";

export function renderNoticiasAdminPanel() {
  return `
    <section class="admin-panel ativo" data-admin-panel="noticias">
      <div class="admin-grid-duplo">
        <div class="admin-card">
          <h2>Cadastrar notícia</h2>
          <p>Publique novidades, resgates, eventos e histórias do projeto.</p>

          <form id="formNoticiaAdmin">
            <label for="tituloNoticia">Título</label>
            <input type="text" id="tituloNoticia" required>

            <label for="fotoNoticia">Foto</label>
            <input type="file" id="fotoNoticia" accept="image/*" required>

            <label for="tipoNoticia">Tipo</label>
            <input type="text" id="tipoNoticia" placeholder="Ex: Evento" required>

            <label for="dataNoticia">Data</label>
            <input type="date" id="dataNoticia" required>

            <label for="resumoNoticia">Resumo</label>
            <textarea id="resumoNoticia" rows="3" required></textarea>

            <label for="textoNoticia">Notícia</label>
            <textarea id="textoNoticia" rows="6" required></textarea>

            <button type="submit" class="btn-submit">Cadastrar notícia</button>
          </form>

          <p class="admin-feedback" id="feedbackNoticia"></p>
        </div>

        <div class="admin-card">
          <h2>Notícias cadastradas</h2>
          <p>Lista das publicações atualmente disponíveis no portal.</p>
          <div id="listaAdminNoticias">
            <p class="admin-feedback">Carregando notícias...</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

async function carregarNoticiasAdmin() {
  const lista = document.getElementById("listaAdminNoticias");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(API_NOTICIAS_URL, {
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error();
    }

    const noticias = resultado.data.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (noticias.length === 0) {
      lista.innerHTML = '<p class="admin-feedback">Nenhuma notícia cadastrada.</p>';
      return;
    }

    lista.innerHTML = noticias
      .map(
        (noticia) => `
          <div class="admin-list-item">
            <div>
              <strong>${escaparHTML(noticia.titulo)}</strong>
              <p>${formatarData(noticia.data)} • ${escaparHTML(noticia.tipo)}</p>
            </div>
            <button type="button" class="admin-btn-perigo" data-excluir-noticia="${noticia.id}">Excluir</button>
          </div>
        `
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = '<p class="admin-feedback erro">Não foi possível carregar as notícias.</p>';
  }
}

function configurarFormularioNoticias() {
  const form = document.getElementById("formNoticiaAdmin");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    definirFeedback("feedbackNoticia", "Cadastrando notícia...");

    try {
      const foto = document.getElementById("fotoNoticia").files[0];
      const dados = {
        titulo: document.getElementById("tituloNoticia").value,
        foto: await lerFoto(foto),
        tipo: document.getElementById("tipoNoticia").value,
        data: document.getElementById("dataNoticia").value,
        resumo: document.getElementById("resumoNoticia").value,
        noticia: document.getElementById("textoNoticia").value,
      };

      const resposta = await fetch(API_NOTICIAS_URL, {
        method: "POST",
        headers: obterCabecalhosAdmin(true),
        body: JSON.stringify(dados),
      });

      if (tratarErroAutenticacao(resposta.status)) {
        return;
      }

      const resultado = await resposta.json();

      if (resposta.ok) {
        definirFeedback("feedbackNoticia", "Notícia cadastrada com sucesso.", "sucesso");
        form.reset();
        preencherDataAtual("dataNoticia");
        carregarNoticiasAdmin();
      } else {
        definirFeedback("feedbackNoticia", resultado.message || "Erro ao cadastrar notícia.", "erro");
      }
    } catch (erro) {
      definirFeedback("feedbackNoticia", "Não foi possível conectar ao servidor.", "erro");
    }
  });

  document.getElementById("listaAdminNoticias")?.addEventListener("click", async (event) => {
    const botao = event.target.closest("[data-excluir-noticia]");

    if (!botao || !prepararConfirmacaoExclusao(botao)) {
      return;
    }

    const resposta = await fetch(`${API_NOTICIAS_URL}/${botao.dataset.excluirNoticia}`, {
      method: "DELETE",
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await lerRespostaJson(resposta);

    if (resposta.ok) {
      definirFeedback("feedbackNoticia", "Notícia excluída com sucesso.", "sucesso");
      carregarNoticiasAdmin();
    } else {
      definirFeedback("feedbackNoticia", resultado.message || "Não foi possível excluir a notícia.", "erro");
    }
  });
}

export function initNoticiasAdminPanel() {
  preencherDataAtual("dataNoticia");
  configurarFormularioNoticias();
  carregarNoticiasAdmin();
}
