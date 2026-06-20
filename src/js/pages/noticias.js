import { apiUrl } from '../services/api.js';

export function renderNoticiasPage() {
  return `
    <section class="hero-noticias">
      <h1>Notícias</h1>
      <p>Fique por dentro de tudo que acontece na Pelu&Cia</p>
    </section>

    <section class="noticia-destaque" id="noticiaDestaque">
      <p class="noticias-status">Carregando notícias...</p>
    </section>

    <section class="ultimas-noticias">
      <h2>Últimas notícias</h2>
      <div class="container" id="listaNoticias"></div>
    </section>

    <dialog class="noticia-modal" id="noticiaModal">
      <button class="noticia-modal-fechar" type="button" data-fechar-noticia aria-label="Fechar notícia">×</button>
      <div id="noticiaModalConteudo"></div>
    </dialog>
  `;
}

const API_NOTICIAS_URL = apiUrl('/api/noticias');
let noticiasCarregadas = [];

function escaparHTML(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatarData(data) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
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
      <p>${escaparHTML(noticia.resumo)}</p>
      <p class="data">${formatarData(noticia.data)} | Equipe Pelu&Cia</p>
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
  const modal = document.querySelector('#noticiaModal');
  const conteudo = document.querySelector('#noticiaModalConteudo');

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
  const destaque = document.querySelector('#noticiaDestaque');
  const lista = document.querySelector('#listaNoticias');

  if (!destaque || !lista) {
    return;
  }

  try {
    const resposta = await fetch(API_NOTICIAS_URL);
    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error(resultado.message || 'Erro ao buscar notícias.');
    }

    noticiasCarregadas = resultado.data;

    if (noticiasCarregadas.length === 0) {
      destaque.innerHTML = '<p class="noticias-status">Nenhuma notícia cadastrada.</p>';
      lista.innerHTML = '';
      return;
    }

    const [noticiaPrincipal, ...ultimasNoticias] = noticiasCarregadas;
    destaque.innerHTML = renderizarDestaque(noticiaPrincipal);
    lista.innerHTML = ultimasNoticias.map(renderizarCard).join('');
  } catch (erro) {
    destaque.innerHTML = '<p class="noticias-status">Não foi possível carregar as notícias.</p>';
    lista.innerHTML = '';
  }
}

export function initNoticiasPage() {
  carregarNoticias();
}

document.addEventListener('click', (event) => {
  const botaoNoticia = event.target.closest('[data-noticia-id]');
  const botaoFechar = event.target.closest('[data-fechar-noticia]');

  if (botaoNoticia) {
    abrirNoticia(botaoNoticia.dataset.noticiaId);
  }

  if (botaoFechar) {
    document.querySelector('#noticiaModal')?.close();
  }
});
