import {
  API_VOLUNTARIOS_URL,
  definirFeedback,
  escaparHTML,
  obterCabecalhosAdmin,
  tratarErroAutenticacao,
} from "./shared.js";

export function renderVoluntariosAdminPanel() {
  return `
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
                <label for="emailVoluntarioAdmin">E-mail</label>
                <input type="email" id="emailVoluntarioAdmin" required>
              </div>
            </div>

            <div class="linha-form">
              <div class="campo">
                <label for="telefoneVoluntarioAdmin">Telefone</label>
                <input type="text" id="telefoneVoluntarioAdmin" required>
              </div>

              <div class="campo">
                <label for="idadeVoluntarioAdmin">Idade</label>
                <input type="number" id="idadeVoluntarioAdmin" min="16" required>
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
  `;
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

function configurarFormularioVoluntarios() {
  const form = document.getElementById("formVoluntarioAdmin");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    definirFeedback("feedbackVoluntario", "Cadastrando voluntário...");

    try {
      const dados = {
        nome: document.getElementById("nomeVoluntarioAdmin").value,
        email: document.getElementById("emailVoluntarioAdmin").value,
        telefone: document.getElementById("telefoneVoluntarioAdmin").value,
        idade: document.getElementById("idadeVoluntarioAdmin").value,
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

export function initVoluntariosAdminPanel() {
  configurarFormularioVoluntarios();
  carregarVoluntariosAdmin();
}
