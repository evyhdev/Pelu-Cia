const menuItems = [
  {
    href: '/ajudar',
    icon: '/icons/ajudar.webp',
    label: 'Ajudar',
  },
  {
    href: '/noticias',
    icon: '/icons/noticias.webp',
    label: 'Notícias',
  },
  {
    href: '/voluntario',
    icon: '/icons/voluntariado.webp',
    label: 'Voluntariado',
  },
  {
    href: '/sobre',
    icon: '/icons/sobre.webp',
    label: 'Sobre',
  },
];

function isActiveLink(href) {
  const currentPath = window.location.pathname;

  if (currentPath === '/' || currentPath === '/index.html') {
    return false;
  }

  return currentPath === href;
}

export function renderHeader() {
  const links = menuItems
    .map((item) => {
      const activeClass = isActiveLink(item.href) ? ' class="ativo"' : '';

      return `
        <a href="${item.href}"${activeClass}>
          <img src="${item.icon}" alt="">
          ${item.label}
        </a>
      `;
    })
    .join('');

  return `
    <header class="cabecalho">
      <div class="container cabecalho-conteudo">
        <a href="/" class="logo">
          <img src="/images/logos/logo.webp" alt="Logo Pelu&Cia">
        </a>

        <nav class="menu" aria-label="Menu principal">
          ${links}
        </nav>

        <a href="#" class="botao-login">Entrar</a>
      </div>
    </header>
  `;
}

export function initHeaderEffect() {
  const header = document.querySelector('.cabecalho');

  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle('cabecalho-rolado', window.scrollY > 10);
  };

  updateHeader();
  window.onscroll = updateHeader;
}
