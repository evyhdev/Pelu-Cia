import { apiUrl } from "../services/api.js";

const API_NOTICIAS_URL = apiUrl("/api/noticias");
const API_CONTAS_URL = apiUrl("/api/contas");
const API_DOACOES_URL = apiUrl("/api/doacoes");
const API_VOLUNTARIOS_URL = apiUrl("/api/voluntarios");

function obterTokenAdmin() {
  return localStorage.getItem("adminToken");
}

function obterCabecalhosAdmin(json = false) {
  const headers = {
    Authorization: `Bearer ${obterTokenAdmin()}`,
  };

  if (json) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor || 0));
}

function definirFeedback(id, texto, tipo = "") {
  const elemento = document.getElementById(id);

  if (!elemento) {
    return;
  }

  elemento.textContent = texto;
  elemento.className = `admin-feedback${tipo ? ` ${tipo}` : ""}`;
}

function tratarErroAutenticacao(status) {
  if (status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
    return true;
  }

  return false;
}

function preencherDataAtual(id) {
  const campo = document.getElementById(id);

  if (campo && !campo.value) {
    campo.value = new Date().toISOString().slice(0, 10);
  }
}

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
        </div>

        <section class="admin-panel ativo" data-admin-panel="noticias">
          <div class="admin-grid-duplo">
            <div class="admin-card">
              <h2>Cadastrar notícia</h2>
              <p>Publique novidades, resgates, eventos e histórias do projeto.</p>

              <form id="formNoticiaAdmin">
                <label for="tituloNoticia">Título</label>
                <input type="text" id="tituloNoticia" required>

                <label for="fotoNoticia">Foto</label>
                <input type="file" id="fotoNoticia" accept="image/*" required>

                <label for="tipoNoticia">Tipo</label>
                <input type="text" id="tipoNoticia" placeholder="Ex: Evento" required>

                <label for="dataNoticia">Data</label>
                <input type="date" id="dataNoticia" required>

                <label for="resumoNoticia">Resumo</label>
                <textarea id="resumoNoticia" rows="3" required></textarea>

                <label for="textoNoticia">Notícia</label>
                <textarea id="textoNoticia" rows="6" required></textarea>

                <button type="submit" class="btn-submit">Cadastrar notícia</button>
              </form>

              <p class="admin-feedback" id="feedbackNoticia"></p>
            </div>

            <div class="admin-card">
              <h2>Notícias cadastradas</h2>
              <p>Lista das publicações atualmente disponíveis no portal.</p>
              <div id="listaAdminNoticias">
                <p class="admin-feedback">Carregando notícias...</p>
              </div>
            </div>
          </div>
        </section>

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

        <section class="admin-panel" data-admin-panel="voluntarios">
          <div class="admin-grid-duplo">
            <div class="admin-card">
              <h2>Cadastrar voluntário</h2>
              <p>Cadastre manualmente um novo voluntário no sistema.</p>

              <form id="formVoluntarioAdmin">
                <div class="linha-form">
                  <div class="campo">
                    <label for="nomeVoluntarioAdmin">Nome completo</label>
                    <input type="text" id="nomeVoluntarioAdmin" required>
                  </div>

                  <div class="campo">
                    <label for="cpfVoluntarioAdmin">CPF</label>
                    <input type="text" id="cpfVoluntarioAdmin" required>
                  </div>
                </div>

                <div class="linha-form">
                  <div class="campo">
                    <label for="emailVoluntarioAdmin">E-mail</label>
                    <input type="email" id="emailVoluntarioAdmin" required>
                  </div>

                  <div class="campo">
                    <label for="telefoneVoluntarioAdmin">Telefone</label>
                    <input type="text" id="telefoneVoluntarioAdmin" required>
                  </div>
                </div>

                <div class="linha-form">
                  <div class="campo">
                    <label for="idadeVoluntarioAdmin">Idade</label>
                    <input type="number" id="idadeVoluntarioAdmin" min="16" required>
                  </div>

                  <div class="campo">
                    <label for="profissaoVoluntarioAdmin">Profissão</label>
                    <input type="text" id="profissaoVoluntarioAdmin" required>
                  </div>
                </div>

                <label for="disponibilidadeVoluntarioAdmin">Disponibilidade</label>
                <select id="disponibilidadeVoluntarioAdmin" required>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                  <option value="finais-de-semana">Finais de semana</option>
                </select>

                <button type="submit" class="btn-submit">Cadastrar voluntário</button>
              </form>

              <p class="admin-feedback" id="feedbackVoluntario"></p>
            </div>

            <div class="admin-card">
              <h2>Voluntários cadastrados</h2>
              <p>Cadastros recebidos pelo site e pelo painel administrativo.</p>
              <div id="listaAdminVoluntarios">
                <p class="admin-feedback">Carregando voluntários...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;
}

function ativarAbaAdmin(aba) {
  document.querySelectorAll("[data-admin-tab]").forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.adminTab === aba);
  });

  document.querySelectorAll("[data-admin-panel]").forEach((painel) => {
    painel.classList.toggle("ativo", painel.dataset.adminPanel === aba);
  });
}

function lerFoto(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = () => reject();
    leitor.readAsDataURL(arquivo);
  });
}

async function carregarNoticiasAdmin() {
  const lista = document.getElementById("listaAdminNoticias");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(API_NOTICIAS_URL, {
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error();
    }

    const noticias = resultado.data.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (noticias.length === 0) {
      lista.innerHTML = '<p class="admin-feedback">Nenhuma notícia cadastrada.</p>';
      return;
    }

    lista.innerHTML = noticias
      .map(
        (noticia) => `
          <div class="admin-list-item">
            <div>
              <strong>${escaparHTML(noticia.titulo)}</strong>
              <p>${formatarData(noticia.data)} • ${escaparHTML(noticia.tipo)}</p>
            </div>
            <button type="button" class="admin-btn-perigo" data-excluir-noticia="${noticia.id}">Excluir</button>
          </div>
        `
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = '<p class="admin-feedback erro">Não foi possível carregar as notícias.</p>';
  }
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

async function carregarVoluntariosAdmin() {
  const lista = document.getElementById("listaAdminVoluntarios");

  if (!lista) {
    return;
  }

  try {
    const resposta = await fetch(API_VOLUNTARIOS_URL, {
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      throw new Error(resultado.message);
    }

    const voluntarios = resultado.data;

    if (voluntarios.length === 0) {
      lista.innerHTML = '<p class="admin-feedback">Nenhum voluntário cadastrado.</p>';
      return;
    }

    lista.innerHTML = voluntarios
      .map(
        (voluntario) => `
          <div class="admin-list-item admin-list-item-coluna">
            <div>
              <strong>${escaparHTML(voluntario.nome)}</strong>
              <p>${escaparHTML(voluntario.email)} • ${escaparHTML(voluntario.telefone)}</p>
              <p>Disponibilidade: ${escaparHTML(voluntario.disponibilidade)}</p>
            </div>
          </div>
        `
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = '<p class="admin-feedback erro">Não foi possível carregar os voluntários.</p>';
  }
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

function configurarFormularioNoticias() {
  const form = document.getElementById("formNoticiaAdmin");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    definirFeedback("feedbackNoticia", "Cadastrando notícia...");

    try {
      const foto = document.getElementById("fotoNoticia").files[0];
      const dados = {
        titulo: document.getElementById("tituloNoticia").value,
        foto: await lerFoto(foto),
        tipo: document.getElementById("tipoNoticia").value,
        data: document.getElementById("dataNoticia").value,
        resumo: document.getElementById("resumoNoticia").value,
        noticia: document.getElementById("textoNoticia").value,
      };

      const resposta = await fetch(API_NOTICIAS_URL, {
        method: "POST",
        headers: obterCabecalhosAdmin(true),
        body: JSON.stringify(dados),
      });

      if (tratarErroAutenticacao(resposta.status)) {
        return;
      }

      const resultado = await resposta.json();

      if (resposta.ok) {
        definirFeedback("feedbackNoticia", "Notícia cadastrada com sucesso.", "sucesso");
        form.reset();
        preencherDataAtual("dataNoticia");
        carregarNoticiasAdmin();
      } else {
        definirFeedback("feedbackNoticia", resultado.message || "Erro ao cadastrar notícia.", "erro");
      }
    } catch (erro) {
      definirFeedback("feedbackNoticia", "Não foi possível conectar ao servidor.", "erro");
    }
  });

  document.getElementById("listaAdminNoticias")?.addEventListener("click", async (event) => {
    const botao = event.target.closest("[data-excluir-noticia]");

    if (!botao || !confirm("Deseja excluir esta notícia?")) {
      return;
    }

    const resposta = await fetch(`${API_NOTICIAS_URL}/${botao.dataset.excluirNoticia}`, {
      method: "DELETE",
      headers: obterCabecalhosAdmin(),
    });

    if (tratarErroAutenticacao(resposta.status)) {
      return;
    }

    if (resposta.ok) {
      carregarNoticiasAdmin();
    } else {
      definirFeedback("feedbackNoticia", "Não foi possível excluir a notícia.", "erro");
    }
  });
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

function configurarFormularioVoluntarios() {
  const form = document.getElementById("formVoluntarioAdmin");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    definirFeedback("feedbackVoluntario", "Cadastrando voluntário...");

    try {
      const dados = {
        nome: document.getElementById("nomeVoluntarioAdmin").value,
        cpf: document.getElementById("cpfVoluntarioAdmin").value,
        email: document.getElementById("emailVoluntarioAdmin").value,
        telefone: document.getElementById("telefoneVoluntarioAdmin").value,
        idade: document.getElementById("idadeVoluntarioAdmin").value,
        profissao: document.getElementById("profissaoVoluntarioAdmin").value,
        disponibilidade: document.getElementById("disponibilidadeVoluntarioAdmin").value,
      };

      const resposta = await fetch(`${API_VOLUNTARIOS_URL}/admin`, {
        method: "POST",
        headers: obterCabecalhosAdmin(true),
        body: JSON.stringify(dados),
      });

      if (tratarErroAutenticacao(resposta.status)) {
        return;
      }

      const resultado = await resposta.json();

      if (resposta.ok) {
        definirFeedback("feedbackVoluntario", "Voluntário cadastrado com sucesso.", "sucesso");
        form.reset();
        carregarVoluntariosAdmin();
      } else {
        definirFeedback("feedbackVoluntario", resultado.message || "Erro ao cadastrar voluntário.", "erro");
      }
    } catch (erro) {
      definirFeedback("feedbackVoluntario", "Não foi possível conectar ao servidor.", "erro");
    }
  });
}

export function initAdminNoticiasPage() {
  if (!obterTokenAdmin()) {
    window.location.href = "/login";
    return;
  }

  preencherDataAtual("dataNoticia");
  preencherDataAtual("dataConta");
  configurarLogout();
  configurarAbas();
  configurarFormularioNoticias();
  configurarFormularioContas();
  configurarFormularioDoacao();
  configurarFormularioVoluntarios();
  carregarNoticiasAdmin();
  carregarContasAdmin();
  carregarDadosDoacaoAdmin();
  carregarVoluntariosAdmin();
}
