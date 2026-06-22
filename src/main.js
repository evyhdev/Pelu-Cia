import { initHeaderEffect, renderHeader } from './js/components/header.js';
import { renderFooter } from './js/components/footer.js';
import { initAjudarPage, renderAjudarPage } from './js/pages/ajudar.js';
import { initAdminNoticiasPage, renderAdminNoticiasPage } from './js/pages/adminNoticias.js';
import { initHomePage, renderHomePage } from './js/pages/home.js';
import { initLoginPage, renderLoginPage } from './js/pages/login.js';
import { initNoticiasPage, renderNoticiasPage } from './js/pages/noticias.js';
import { renderSobrePage } from './js/pages/sobre.js';
import { renderVoluntarioPage } from './js/pages/voluntario.js';

const routes = {
  '/': {
    render: renderHomePage,
    title: 'Pelu&Cia - Home',
    afterRender: initHomePage,
  },
  '/index.html': {
    render: renderHomePage,
    title: 'Pelu&Cia - Home',
    afterRender: initHomePage,
  },
  '/ajudar': {
    render: renderAjudarPage,
    title: 'Pelu&Cia - Ajudar',
    pageClass: 'pagina-ajudar',
    afterRender: initAjudarPage,
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
  '/login': {
    render: renderLoginPage,
    title: 'Pelu&Cia - Login',
    afterRender: initLoginPage,
  },
  '/admin': {
    render: renderAdminNoticiasPage,
    title: 'Pelu&Cia - Painel Administrativo',
    pageClass: 'admin-noticias-page',
    afterRender: initAdminNoticiasPage,
  },
  '/admin-noticias': {
    render: renderAdminNoticiasPage,
    title: 'Pelu&Cia - Painel Administrativo',
    pageClass: 'admin-noticias-page',
    afterRender: initAdminNoticiasPage,
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

function isUserAuthenticated() {
  return !!localStorage.getItem("adminToken");
}

function renderRoute() {
  const app = document.querySelector('#app');

  if (!app) {
    return;
  }

  const pathname = window.location.pathname;
  const isAuthenticated = isUserAuthenticated();

  // Se tenta acessar /admin ou /admin-noticias sem autenticação, redireciona para login
  if ((pathname === '/admin' || pathname === '/admin-noticias') && !isAuthenticated) {
    window.history.replaceState({}, '', '/login');
    const route = routes['/login'];
    app.className = route.pageClass || '';
    app.innerHTML = route.render();
    document.title = route.title;
    mountHeader();
    mountFooter();
    route.afterRender?.();
    return;
  }

  // Se está em /login e já autenticado, redireciona para /admin
  if (pathname === '/login' && isAuthenticated) {
    window.history.replaceState({}, '', '/admin');
    const route = routes['/admin'];
    app.className = route.pageClass || '';
    app.innerHTML = route.render();
    document.title = route.title;
    mountHeader();
    mountFooter();
    route.afterRender?.();
    return;
  }

  const route = routes[pathname] || routes['/'];

  app.className = route.pageClass || '';
  app.innerHTML = route.render();
  document.title = route.title;
  mountHeader();
  mountFooter();
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
  });
} else {
  renderRoute();
}
