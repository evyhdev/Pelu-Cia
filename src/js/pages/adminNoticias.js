import { apiUrl } from "../services/api.js";

export function renderAdminNoticiasPage() {
  return `
    <section class="admin-page">
      <div class="admin-card">
        <h1>Cadastrar notícia</h1>
        <p>Preencha os dados para publicar uma nova notícia.</p>

        <form id="formNoticiaAdmin">
          <label for="tituloNoticia">Título</label>
          <input type="text" id="tituloNoticia" required>

          <label for="fotoNoticia">Foto</label>
          <input type="file" id="fotoNoticia" accept="image/*" required>

          <label for="tipoNoticia">Tipo</label>
          <input type="text" id="tipoNoticia" placeholder="Ex: Adoção" required>

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
        <div id="listaAdminNoticias">
          <p class="admin-feedback">Carregando notícias...</p>
        </div>
      </div>
    </section>
  `;
}

const API_NOTICIAS_URL = apiUrl("/api/noticias");

function obterTokenAdmin() {
  return localStorage.getItem("adminToken");
}

export function initAdminNoticiasPage() {
  if (!obterTokenAdmin()) {
    window.location.href = "/login";
    return;
  }

  const form = document.getElementById("formNoticiaAdmin");
  const feedback = document.getElementById("feedbackNoticia");
  const lista = document.getElementById("listaAdminNoticias");

  carregarNoticiasAdmin();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedback.textContent = "Cadastrando notícia...";
    feedback.className = "admin-feedback";

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
        headers: {
          Authorization: `Bearer ${obterTokenAdmin()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        feedback.textContent = "Notícia cadastrada com sucesso.";
        feedback.className = "admin-feedback sucesso";
        form.reset();
        carregarNoticiasAdmin();
      } else if (resposta.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
      } else {
        feedback.textContent = resultado.message || "Erro ao cadastrar notícia.";
        feedback.className = "admin-feedback erro";
      }
    } catch (erro) {
      feedback.textContent = "Não foi possível conectar ao servidor.";
      feedback.className = "admin-feedback erro";
    }
  });

  lista.addEventListener("click", async (event) => {
    const botao = event.target.closest("[data-excluir-noticia]");

    if (!botao) {
      return;
    }

    const confirmou = confirm("Deseja excluir esta notícia?");

    if (!confirmou) {
      return;
    }

    try {
      const resposta = await fetch(`${API_NOTICIAS_URL}/${botao.dataset.excluirNoticia}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${obterTokenAdmin()}`,
        },
      });

      if (resposta.ok) {
        carregarNoticiasAdmin();
      } else if (resposta.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
      } else {
        alert("Erro ao excluir notícia.");
      }
    } catch (erro) {
      alert("Não foi possível conectar ao servidor.");
    }
  });
}

function lerFoto(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = () => reject();
    leitor.readAsDataURL(arquivo);
  });
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function carregarNoticiasAdmin() {
  const lista = document.getElementById("listaAdminNoticias");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(API_NOTICIAS_URL);
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
          <div class="admin-noticia-item">
            <div>
              <strong>${escaparHTML(noticia.titulo)}</strong>
              <p>${new Date(noticia.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</p>
            </div>
            <button type="button" data-excluir-noticia="${noticia.id}">Excluir</button>
          </div>
        `
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = '<p class="admin-feedback erro">Não foi possível carregar as notícias.</p>';
  }
}
