import { renderSectionHeading } from "../components/titles.js";
import { apiUrl } from "../services/api.js";

export function renderHomePage() {
  return `
    <section class="hero-home">
      <div class="container hero-conteudo">
        <div class="hero-texto">
          <h1>Cuidando com amor dos animais do nosso campus</h1>
          <p>
            A Pelu&Cia é um projeto social da UFC - Campus Quixadá dedicado a
            alimentar, vacinar e garantir o bem-estar dos cães e gatos que vivem aqui.
          </p>

          <div class="hero-botoes">
            <a href="/ajudar" class="btn-dourado">
              <img src="/icons/ajudar.webp" alt="">
              Quero Ajudar
            </a>
            <a href="/voluntario" class="btn-contorno-branco">Seja Voluntário</a>
          </div>
        </div>

        <div class="hero-foto">
          <img class="hero-imagem" src="/images/home/pelucia.webp" alt="Animais do campus Quixadá">
        </div>
      </div>
    </section>

    <section class="ultimas-noticias">
      <div class="container">
        <h2>Últimas Notícias</h2>
        <div id="homeNoticias" class="home-noticias-lista">
          <p class="noticias-status">Carregando notícias...</p>
        </div>
      </div>
    </section>



    <section class="contato">
      <div class="container">
        ${renderSectionHeading({
          title: "Entre em Contato",
          subtitle: "Tem dúvidas? Quer saber mais sobre o projeto? Envie sua mensagem!",
        })}

        <form class="formulario-contato" id="formContatoHome">
          <label for="name">Nome</label>
          <input type="text" id="name" name="name" required>

          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" required>

          <label for="message">Mensagem</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Enviar Mensagem</button>
          <p class="admin-feedback" id="feedbackContatoHome"></p>
        </form>
      </div>
    </section>
  `;
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(data));
}

function renderizarNoticiaHome(noticia) {
  return `
    <article class="card-noticia">
      <img src="${escaparHTML(noticia.foto)}" alt="${escaparHTML(noticia.titulo)}">
      <div class="card-texto">
        <span class="categoria">${escaparHTML(noticia.tipo)}</span>
        <h3>${escaparHTML(noticia.titulo)}</h3>
        <p class="data">${formatarData(noticia.data)}</p>
        <p>${escaparHTML(noticia.resumo)}</p>
        <a href="/noticias" class="btn-card">Ler mais</a>
      </div>
    </article>
  `;
}

export async function initHomePage() {
  const lista = document.getElementById("homeNoticias");
  const formContato = document.getElementById("formContatoHome");
  const feedbackContato = document.getElementById("feedbackContatoHome");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(apiUrl("/api/noticias"));
    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error();
    }

    const ultimasNoticias = resultado.data
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 3);

    if (ultimasNoticias.length === 0) {
      lista.innerHTML = '<p class="noticias-status">Nenhuma notícia cadastrada.</p>';
      return;
    }

    lista.innerHTML = ultimasNoticias.map(renderizarNoticiaHome).join("");
  } catch (erro) {
    lista.innerHTML = '<p class="noticias-status">Não foi possível carregar as notícias.</p>';
  }

  formContato?.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedbackContato.textContent = "Salvando mensagem...";
    feedbackContato.className = "admin-feedback";

    try {
      const resposta = await fetch(apiUrl("/api/contato"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: document.getElementById("name").value,
          email: document.getElementById("email").value,
          mensagem: document.getElementById("message").value,
        }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        feedbackContato.textContent = "Mensagem salva com sucesso.";
        feedbackContato.className = "admin-feedback sucesso";
        formContato.reset();
      } else {
        feedbackContato.textContent = resultado.message || "Erro ao salvar mensagem.";
        feedbackContato.className = "admin-feedback erro";
      }
    } catch (_erro) {
      feedbackContato.textContent = "Não foi possível conectar ao servidor.";
      feedbackContato.className = "admin-feedback erro";
    }
  });
}
