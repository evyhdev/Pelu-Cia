import { initHeaderEffect, renderHeader } from './js/components/header.js';
import { renderFooter } from './js/components/footer.js';
import { renderAjudarPage } from './js/pages/ajudar.js';
import { renderHomePage } from './js/pages/home.js';
import { initNoticiasPage, renderNoticiasPage } from './js/pages/noticias.js';
import { renderSobrePage } from './js/pages/sobre.js';
import { renderVoluntarioPage } from './js/pages/voluntario.js';

const routes = {
  '/': {
    render: renderHomePage,
    title: 'Pelu&Cia - Home',
  },
  '/index.html': {
    render: renderHomePage,
    title: 'Pelu&Cia - Home',
  },
  '/ajudar': {
    render: renderAjudarPage,
    title: 'Pelu&Cia - Ajudar',
    pageClass: 'pagina-ajudar',
  },
  '/noticias': {
    render: renderNoticiasPage,
    title: 'Pelu&Cia - Notícias',
    afterRender: initNoticiasPage,
  },
  '/sobre': {
    render: renderSobrePage,
    title: 'Pelu&Cia - Sobre',
  },
  '/voluntario': {
    render: renderVoluntarioPage,
    title: 'Pelu&Cia - Voluntariado',
    pageClass: 'voluntariado-page',
  },
};

function mountFooter() {
  const footerContainer = document.querySelector('#footer');

  if (footerContainer) {
    footerContainer.innerHTML = renderFooter();
  }
}

function mountHeader() {
  const headerContainer = document.querySelector('#header');

  if (headerContainer) {
    headerContainer.innerHTML = renderHeader();
    initHeaderEffect();
  }
}

function renderRoute() {
  const app = document.querySelector('#app');

  if (!app) {
    return;
  }

  const route = routes[window.location.pathname] || routes['/'];

  app.className = route.pageClass || '';
  app.innerHTML = route.render();
  document.title = route.title;
  mountHeader();
  route.afterRender?.();

  if (window.location.hash) {
    document.querySelector(window.location.hash)?.scrollIntoView();
  } else {
    window.scrollTo({ top: 0 });
  }
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  renderRoute();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a');

  if (!link || link.target || link.origin !== window.location.origin) {
    return;
  }

  const path = link.pathname;

  if (!routes[path]) {
    return;
  }

  event.preventDefault();
  navigateTo(`${path}${link.hash}`);
});

window.addEventListener('popstate', renderRoute);

mountHeader();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderRoute();
    mountFooter();
  });
} else {
  renderRoute();
  mountFooter();
}
