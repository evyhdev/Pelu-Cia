import {
  API_CONTATO_URL,
  definirFeedback,
  escaparHTML,
  formatarDataHora,
  lerRespostaJson,
  obterCabecalhosAdmin,
  prepararConfirmacaoExclusao,
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
        <p class="admin-feedback" id="feedbackMensagem"></p>
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
          <div class="admin-list-item admin-list-item-coluna ${mensagem.lida ? "mensagem-lida" : "mensagem-nao-lida"}">
            <div>
              <strong>${escaparHTML(mensagem.nome)}</strong>
              <span class="admin-status-mensagem">${mensagem.lida ? "Lida" : "Nova"}</span>
              <p>${escaparHTML(mensagem.email)} • ${formatarDataHora(mensagem.criado_em)}</p>
              <p>${escaparHTML(mensagem.mensagem)}</p>
            </div>
            <div class="admin-list-actions">
              ${
                mensagem.lida
                  ? ""
                  : `<button type="button" class="admin-btn-secundario" data-marcar-lida="${mensagem.id}">Marcar como lida</button>`
              }
              <button type="button" class="admin-btn-perigo" data-excluir-mensagem="${mensagem.id}">Excluir</button>
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
  document.getElementById("listaAdminMensagens")?.addEventListener("click", async (event) => {
    const botaoMarcarLida = event.target.closest("[data-marcar-lida]");
    const botaoExcluir = event.target.closest("[data-excluir-mensagem]");

    try {
      if (botaoMarcarLida) {
        const resposta = await fetch(`${API_CONTATO_URL}/${botaoMarcarLida.dataset.marcarLida}/lida`, {
          method: "PATCH",
          headers: obterCabecalhosAdmin(),
        });
        const resultado = await lerRespostaJson(resposta);

        if (tratarErroAutenticacao(resposta.status)) {
          return;
        }

        if (!resposta.ok) {
          throw new Error(resultado.message || "Não foi possível marcar a mensagem como lida.");
        }

        definirFeedback("feedbackMensagem", "Mensagem marcada como lida.", "sucesso");
        carregarMensagensAdmin();
        return;
      }

      if (botaoExcluir) {
        if (!prepararConfirmacaoExclusao(botaoExcluir)) {
          return;
        }

        const resposta = await fetch(`${API_CONTATO_URL}/${botaoExcluir.dataset.excluirMensagem}`, {
          method: "DELETE",
          headers: obterCabecalhosAdmin(),
        });
        const resultado = await lerRespostaJson(resposta);

        if (tratarErroAutenticacao(resposta.status)) {
          return;
        }

        if (!resposta.ok) {
          throw new Error(resultado.message || "Não foi possível excluir a mensagem.");
        }

        definirFeedback("feedbackMensagem", "Mensagem excluída com sucesso.", "sucesso");
        carregarMensagensAdmin();
      }
    } catch (erro) {
      definirFeedback("feedbackMensagem", erro.message || "Não foi possível processar a mensagem.", "erro");
    }
  });
}
