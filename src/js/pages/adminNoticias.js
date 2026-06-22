import { initContasAdminPanel } from "./adminNoticias/contas.js";
import { initMensagensAdminPanel } from "./adminNoticias/mensagens.js";
import { initNoticiasAdminPanel } from "./adminNoticias/noticias.js";
import { obterTokenAdmin } from "./adminNoticias/shared.js";
import { initVoluntariosAdminPanel } from "./adminNoticias/voluntarios.js";
export { renderAdminNoticiasPage } from "./adminNoticias/template.js";

function ativarAbaAdmin(aba) {
  document.querySelectorAll("[data-admin-tab]").forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.adminTab === aba);
  });

  document.querySelectorAll("[data-admin-panel]").forEach((painel) => {
    painel.classList.toggle("ativo", painel.dataset.adminPanel === aba);
  });
}

function configurarLogout() {
  document.getElementById("logoutAdmin")?.addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  });
}

function configurarAbas() {
  document.querySelector(".admin-tabs")?.addEventListener("click", (event) => {
    const botao = event.target.closest("[data-admin-tab]");

    if (!botao) {
      return;
    }

    ativarAbaAdmin(botao.dataset.adminTab);
  });
}

export function initAdminNoticiasPage() {
  if (!obterTokenAdmin()) {
    window.location.href = "/login";
    return;
  }

  configurarLogout();
  configurarAbas();
  initNoticiasAdminPanel();
  initContasAdminPanel();
  initVoluntariosAdminPanel();
  initMensagensAdminPanel();
}
