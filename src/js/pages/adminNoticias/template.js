import { renderContasAdminPanel } from "./contas.js";
import { renderMensagensAdminPanel } from "./mensagens.js";
import { renderNoticiasAdminPanel } from "./noticias.js";
import { renderVoluntariosAdminPanel } from "./voluntarios.js";

export function renderAdminNoticiasPage() {
  return `
    <section class="admin-page">
      <div class="admin-shell container">
        <div class="admin-hero-card">
          <div>
            <span class="admin-badge">Painel Administrativo</span>
            <h1>Gerencie o conteúdo e a prestação de contas da Pelu&Cia</h1>
            <p>
              Área interna para publicar notícias, registrar entradas e saídas financeiras
              e cadastrar voluntários mantendo a identidade visual do projeto.
            </p>
          </div>

          <button type="button" class="botao-sair-admin" id="logoutAdmin">Sair</button>
        </div>

        <div class="admin-tabs" role="tablist" aria-label="Seções administrativas">
          <button type="button" class="admin-tab ativo" data-admin-tab="noticias">Notícias</button>
          <button type="button" class="admin-tab" data-admin-tab="contas">Prestação de contas</button>
          <button type="button" class="admin-tab" data-admin-tab="voluntarios">Voluntários</button>
          <button type="button" class="admin-tab" data-admin-tab="mensagens">Mensagens</button>
        </div>

        ${renderNoticiasAdminPanel()}
        ${renderContasAdminPanel()}
        ${renderVoluntariosAdminPanel()}
        ${renderMensagensAdminPanel()}
      </div>
    </section>
  `;
}
