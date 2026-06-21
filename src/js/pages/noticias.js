import { renderPageHeader, renderSectionHeading } from "../components/titles.js";
import { apiUrl } from "../services/api.js";

export function renderNoticiasPage() {
  return `
    ${renderPageHeader({
      title: "Notícias",
      subtitle: "Fique por dentro de tudo que acontece na Pelu&Cia",
    })}

    <section class="noticias-destaque-section">
      <div class="container">
        ${renderSectionHeading({
          title: "Última notícia",
          subtitle: "O destaque mais recente publicado pela equipe Pelu&Cia.",
          className: "titulo-secao titulo-secao-noticias",
        })}

        <div class="noticia-destaque" id="noticiaDestaque">
          <p class="noticias-status">Carregando notícias...</p>
        </div>
      </div>
    </section>

    <section class="noticias-listagem-section">
      <div class="container">
        ${renderSectionHeading({
          title: "Últimas notícias",
          subtitle: "As 8 publicações mais recentes da Pelu&Cia.",
          className: "titulo-secao titulo-secao-noticias",
        })}

        <div class="noticias-grid" id="listaNoticias"></div>
      </div>
    </section>

    <dialog class="noticia-modal" id="noticiaModal">
      <button class="noticia-modal-fechar" type="button" data-fechar-noticia aria-label="Fechar notícia">×</button>
      <div id="noticiaModalConteudo"></div>
    </dialog>
  `;
}

const API_NOTICIAS_URL = apiUrl("/api/noticias");
let noticiasCarregadas = [];

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

function renderizarDestaque(noticia) {
  return `
    <div class="imagem-destaque">
      <img class="foto-principal" src="${escaparHTML(noticia.foto)}" alt="${escaparHTML(noticia.titulo)}">
    </div>

    <div class="texto-destaque">
      <span class="categoria-azul">${escaparHTML(noticia.tipo)}</span>
      <h2>${escaparHTML(noticia.titulo)}</h2>
      <p class="data">${formatarData(noticia.data)} | Equipe Pelu&Cia</p>
      <p>${escaparHTML(noticia.resumo)}</p>
      <button class="btn-azul" type="button" data-noticia-id="${noticia.id}">Ler mais</button>
    </div>
  `;
}

function renderizarCard(noticia) {
  return `
    <article class="card-noticia">
      <img src="${escaparHTML(noticia.foto)}" alt="${escaparHTML(noticia.titulo)}">
      <div class="card-texto">
        <span class="categoria">${escaparHTML(noticia.tipo)}</span>
        <h3>${escaparHTML(noticia.titulo)}</h3>
        <p class="data">${formatarData(noticia.data)}</p>
        <p>${escaparHTML(noticia.resumo)}</p>
        <button class="btn-card" type="button" data-noticia-id="${noticia.id}">Ler mais</button>
      </div>
    </article>
  `;
}

function abrirNoticia(id) {
  const noticia = noticiasCarregadas.find((item) => item.id === Number(id));
  const modal = document.querySelector("#noticiaModal");
  const conteudo = document.querySelector("#noticiaModalConteudo");

  if (!noticia || !modal || !conteudo) {
    return;
  }

  conteudo.innerHTML = `
    <img src="${escaparHTML(noticia.foto)}" alt="${escaparHTML(noticia.titulo)}">
    <span class="categoria">${escaparHTML(noticia.tipo)}</span>
    <h2>${escaparHTML(noticia.titulo)}</h2>
    <p class="data">${formatarData(noticia.data)} | Equipe Pelu&Cia</p>
    <p>${escaparHTML(noticia.noticia)}</p>
  `;

  modal.showModal();
}

async function carregarNoticias() {
  const destaque = document.querySelector("#noticiaDestaque");
  const lista = document.querySelector("#listaNoticias");

  if (!destaque || !lista) {
    return;
  }

  try {
    const resposta = await fetch(API_NOTICIAS_URL);
    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error(resultado.message || "Erro ao buscar notícias.");
    }

    noticiasCarregadas = resultado.data.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (noticiasCarregadas.length === 0) {
      destaque.innerHTML = '<p class="noticias-status">Nenhuma notícia cadastrada.</p>';
      lista.innerHTML = "";
      return;
    }

    const [noticiaPrincipal] = noticiasCarregadas;
    const ultimasNoticias = noticiasCarregadas.slice(0, 8);

    destaque.innerHTML = renderizarDestaque(noticiaPrincipal);

    if (ultimasNoticias.length === 0) {
      lista.innerHTML = '<p class="noticias-status">Ainda não existem outras notícias publicadas.</p>';
      return;
    }

    lista.innerHTML = ultimasNoticias.map(renderizarCard).join("");
  } catch (erro) {
    destaque.innerHTML = '<p class="noticias-status">Não foi possível carregar as notícias.</p>';
    lista.innerHTML = "";
  }
}

export function initNoticiasPage() {
  carregarNoticias();
}

document.addEventListener("click", (event) => {
  const botaoNoticia = event.target.closest("[data-noticia-id]");
  const botaoFechar = event.target.closest("[data-fechar-noticia]");

  if (botaoNoticia) {
    abrirNoticia(botaoNoticia.dataset.noticiaId);
  }

  if (botaoFechar) {
    document.querySelector("#noticiaModal")?.close();
  }
});
