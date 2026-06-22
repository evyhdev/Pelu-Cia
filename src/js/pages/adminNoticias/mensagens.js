import {
  API_CONTATO_URL,
  escaparHTML,
  formatarDataHora,
  obterCabecalhosAdmin,
  tratarErroAutenticacao,
} from "./shared.js";

export function renderMensagensAdminPanel() {
  return `
    <section class="admin-panel" data-admin-panel="mensagens">
      <div class="admin-card">
        <h2>Mensagens recebidas</h2>
        <p>Mensagens enviadas pelo formulário de contato da página inicial.</p>
        <div id="listaAdminMensagens">
          <p class="admin-feedback">Carregando mensagens...</p>
        </div>
      </div>
    </section>
  `;
}

async function carregarMensagensAdmin() {
  const lista = document.getElementById("listaAdminMensagens");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(API_CONTATO_URL, {
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error(resultado.message);
    }

    const mensagens = resultado.data;

    if (mensagens.length === 0) {
      lista.innerHTML = '<p class="admin-feedback">Nenhuma mensagem recebida.</p>';
      return;
    }

    lista.innerHTML = mensagens
      .map(
        (mensagem) => `
          <div class="admin-list-item admin-list-item-coluna">
            <div>
              <strong>${escaparHTML(mensagem.nome)}</strong>
              <p>${escaparHTML(mensagem.email)} • ${formatarDataHora(mensagem.criado_em)}</p>
              <p>${escaparHTML(mensagem.mensagem)}</p>
            </div>
          </div>
        `
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = '<p class="admin-feedback erro">Não foi possível carregar as mensagens.</p>';
  }
}

export function initMensagensAdminPanel() {
  carregarMensagensAdmin();
}
