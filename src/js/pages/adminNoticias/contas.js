import {
  API_CONTAS_URL,
  API_DOACOES_URL,
  definirFeedback,
  escaparHTML,
  formatarData,
  formatarMoeda,
  obterCabecalhosAdmin,
  preencherDataAtual,
  tratarErroAutenticacao,
} from "./shared.js";

export function renderContasAdminPanel() {
  return `
    <section class="admin-panel" data-admin-panel="contas">
      <div class="admin-grid-duplo">
        <div class="admin-card">
          <h2>Cadastrar movimentação</h2>
          <p>Registre entradas e saídas para a prestação de contas do projeto.</p>

          <form id="formContaAdmin">
            <label for="tipoConta">Tipo</label>
            <select id="tipoConta" required>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>

            <label for="dataConta">Data</label>
            <input type="date" id="dataConta" required>

            <label for="valorConta">Valor</label>
            <input type="number" id="valorConta" min="0.01" step="0.01" required>

            <label for="descricaoConta">Descrição</label>
            <textarea id="descricaoConta" rows="5" placeholder="Descreva a movimentação" required></textarea>

            <button type="submit" class="btn-submit">Cadastrar movimentação</button>
          </form>

          <p class="admin-feedback" id="feedbackConta"></p>
        </div>

        <div class="admin-card">
          <h2>Dados de doação</h2>
          <p>Cadastre a chave PIX e os dados usados na aba pública de doações.</p>

          <form id="formDoacaoAdmin">
            <label for="pixChaveAdmin">Chave PIX</label>
            <input type="text" id="pixChaveAdmin" required>

            <label for="pixFavorecidoAdmin">Favorecido do PIX</label>
            <input type="text" id="pixFavorecidoAdmin" required>

            <label for="bancoAdmin">Banco</label>
            <input type="text" id="bancoAdmin" required>

            <label for="agenciaAdmin">Agência</label>
            <input type="text" id="agenciaAdmin" required>

            <label for="contaAdmin">Conta</label>
            <input type="text" id="contaAdmin" required>

            <label for="instituicaoAdmin">Instituição</label>
            <input type="text" id="instituicaoAdmin" required>

            <label for="observacaoTransferenciaAdmin">Observação da transferência</label>
            <textarea id="observacaoTransferenciaAdmin" rows="4"></textarea>

            <button type="submit" class="btn-submit">Salvar dados de doação</button>
          </form>

          <p class="admin-feedback" id="feedbackDoacao"></p>
        </div>
      </div>

      <div class="admin-grid-duplo admin-grid-duplo-inferior">
        <div class="admin-card">
          <h2>Prestação cadastrada</h2>
          <p>Resumo das movimentações lançadas no sistema.</p>

          <div class="admin-resumo-financeiro" id="resumoContas"></div>
          <div id="listaAdminContas">
            <p class="admin-feedback">Carregando movimentações...</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderizarResumoContas(contas) {
  const resumo = document.getElementById("resumoContas");

  if (!resumo) {
    return;
  }

  const entradas = contas
    .filter((conta) => conta.tipo === "entrada")
    .reduce((total, conta) => total + Number(conta.valor), 0);
  const saidas = contas
    .filter((conta) => conta.tipo === "saida")
    .reduce((total, conta) => total + Number(conta.valor), 0);
  const saldo = entradas - saidas;

  resumo.innerHTML = `
    <div class="admin-resumo-card">
      <span>Entradas</span>
      <strong>${formatarMoeda(entradas)}</strong>
    </div>
    <div class="admin-resumo-card">
      <span>Saídas</span>
      <strong>${formatarMoeda(saidas)}</strong>
    </div>
    <div class="admin-resumo-card destaque">
      <span>Saldo</span>
      <strong>${formatarMoeda(saldo)}</strong>
    </div>
  `;
}

async function carregarDadosDoacaoAdmin() {
  try {
    const resposta = await fetch(API_DOACOES_URL, {
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error(resultado.message);
    }

    const dados = resultado.data;
    document.getElementById("pixChaveAdmin").value = dados.pix_chave || "";
    document.getElementById("pixFavorecidoAdmin").value = dados.pix_favorecido || "";
    document.getElementById("bancoAdmin").value = dados.banco || "";
    document.getElementById("agenciaAdmin").value = dados.agencia || "";
    document.getElementById("contaAdmin").value = dados.conta || "";
    document.getElementById("instituicaoAdmin").value = dados.instituicao || "";
    document.getElementById("observacaoTransferenciaAdmin").value = dados.observacao_transferencia || "";
  } catch (erro) {
    definirFeedback("feedbackDoacao", "Não foi possível carregar os dados de doação.", "erro");
  }
}

async function carregarContasAdmin() {
  const lista = document.getElementById("listaAdminContas");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(API_CONTAS_URL, {
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error(resultado.message);
    }

    const contas = resultado.data;
    renderizarResumoContas(contas);

    if (contas.length === 0) {
      lista.innerHTML = '<p class="admin-feedback">Nenhuma movimentação cadastrada.</p>';
      return;
    }

    lista.innerHTML = contas
      .map(
        (conta) => `
          <div class="admin-list-item">
            <div>
              <strong>${escaparHTML(conta.tipo === "entrada" ? "Entrada" : "Saída")} • ${formatarMoeda(conta.valor)}</strong>
              <p>${formatarData(conta.data)} • ${escaparHTML(conta.descricao)}</p>
            </div>
            <button type="button" class="admin-btn-perigo" data-excluir-conta="${conta.id}">Excluir</button>
          </div>
        `
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = '<p class="admin-feedback erro">Não foi possível carregar as movimentações.</p>';
  }
}

function configurarFormularioContas() {
  const form = document.getElementById("formContaAdmin");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    definirFeedback("feedbackConta", "Cadastrando movimentação...");

    try {
      const dados = {
        tipo: document.getElementById("tipoConta").value,
        data: document.getElementById("dataConta").value,
        valor: document.getElementById("valorConta").value,
        descricao: document.getElementById("descricaoConta").value,
      };

      const resposta = await fetch(API_CONTAS_URL, {
        method: "POST",
        headers: obterCabecalhosAdmin(true),
        body: JSON.stringify(dados),
      });

      if (tratarErroAutenticacao(resposta.status)) {
        return;
      }

      const resultado = await resposta.json();

      if (resposta.ok) {
        definirFeedback("feedbackConta", "Movimentação cadastrada com sucesso.", "sucesso");
        form.reset();
        preencherDataAtual("dataConta");
        carregarContasAdmin();
      } else {
        definirFeedback("feedbackConta", resultado.message || "Erro ao cadastrar movimentação.", "erro");
      }
    } catch (erro) {
      definirFeedback("feedbackConta", "Não foi possível conectar ao servidor.", "erro");
    }
  });

  document.getElementById("listaAdminContas")?.addEventListener("click", async (event) => {
    const botao = event.target.closest("[data-excluir-conta]");

    if (!botao || !confirm("Deseja excluir esta movimentação?")) {
      return;
    }

    const resposta = await fetch(`${API_CONTAS_URL}/${botao.dataset.excluirConta}`, {
      method: "DELETE",
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    if (resposta.ok) {
      carregarContasAdmin();
    } else {
      definirFeedback("feedbackConta", "Não foi possível excluir a movimentação.", "erro");
    }
  });
}

function configurarFormularioDoacao() {
  const form = document.getElementById("formDoacaoAdmin");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    definirFeedback("feedbackDoacao", "Salvando dados de doação...");

    try {
      const dados = {
        pixChave: document.getElementById("pixChaveAdmin").value,
        pixFavorecido: document.getElementById("pixFavorecidoAdmin").value,
        banco: document.getElementById("bancoAdmin").value,
        agencia: document.getElementById("agenciaAdmin").value,
        conta: document.getElementById("contaAdmin").value,
        instituicao: document.getElementById("instituicaoAdmin").value,
        observacaoTransferencia: document.getElementById("observacaoTransferenciaAdmin").value,
      };

      const resposta = await fetch(API_DOACOES_URL, {
        method: "PUT",
        headers: obterCabecalhosAdmin(true),
        body: JSON.stringify(dados),
      });

      if (tratarErroAutenticacao(resposta.status)) {
        return;
      }

      const resultado = await resposta.json();

      if (resposta.ok) {
        definirFeedback("feedbackDoacao", "Dados de doação salvos com sucesso.", "sucesso");
      } else {
        definirFeedback("feedbackDoacao", resultado.message || "Erro ao salvar dados de doação.", "erro");
      }
    } catch (erro) {
      definirFeedback("feedbackDoacao", "Não foi possível conectar ao servidor.", "erro");
    }
  });
}

export function initContasAdminPanel() {
  preencherDataAtual("dataConta");
  configurarFormularioContas();
  configurarFormularioDoacao();
  carregarContasAdmin();
  carregarDadosDoacaoAdmin();
}
