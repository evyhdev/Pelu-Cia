import { renderPageHeader } from "../components/titles.js";
import { apiUrl } from "../services/api.js";

export function renderVoluntarioPage() {
  return `
    ${renderPageHeader({
      title: "Seja um Voluntário",
      subtitle:
        "Junte-se à nossa equipe e ajude a transformar vidas! Seu tempo e dedicação fazem toda a diferença.",
    })}

    <section class="foto-section">
      <div class="foto-gato">
        <img src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=920&q=80" alt="Gato preto olhando entre barras">
        <span class="barra barra-1"></span>
        <span class="barra barra-2"></span>
        <span class="barra barra-3"></span>
        <span class="barra barra-4"></span>
        <span class="barra barra-5"></span>
        <span class="barra barra-6"></span>
        <span class="barra barra-7"></span>
      </div>
    </section>

    <section class="inscricao" id="inscricao">
      <div class="container formulario-card">
        <h2>Formulário de Inscrição</h2>
        <p>Preencha os dados abaixo para se candidatar como voluntário</p>

        <form id="formVoluntario">
          <div class="linha-form">
            <div class="campo">
              <label for="nome">Nome Completo *</label>
              <input type="text" id="nome" name="nome" required>
            </div>

            
          </div>

          <div class="linha-form">
            <div class="campo">
              <label for="email">E-mail *</label>
              <input type="email" id="email" name="email" required>
            </div>

            <div class="campo">
              <label for="telefone">Telefone *</label>
              <input type="tel" id="telefone" name="telefone" required>
            </div>
          </div>

          <div class="linha-form">
            <div class="campo">
              <label for="idade">Idade *</label>
              <input type="number" id="idade" name="idade" min="16" required>
            </div>

           
          </div>

          <div class="campo">
            <p class="label-disponibilidade">Disponibilidade *</p>

            <div class="opcoes-disponibilidade">
              <label>
                <input type="radio" name="disponibilidade" value="manha" required>
                Manhã
              </label>
              <label>
                <input type="radio" name="disponibilidade" value="tarde">
                Tarde
              </label>
              <label>
                <input type="radio" name="disponibilidade" value="noite">
                Noite
              </label>
              <label>
                <input type="radio" name="disponibilidade" value="finais-de-semana">
                Finais de semana
              </label>
            </div>
          </div>

          <div class="termos">
            <input type="checkbox" id="termos" name="termos" required>
            <label for="termos">Declaro que as informações fornecidas são verdadeiras e estou ciente que o voluntariado exige comprometimento e responsabilidade.</label>
          </div>

          <button type="submit" class="btn-submit">Enviar Inscrição</button>
        </form>
        <p class="feedback-voluntario" id="feedbackVoluntarioPublico" role="status" aria-live="polite"></p>
      </div>
    </section>
  `;
}

function definirFeedbackVoluntario(texto, tipo = "") {
  const feedback = document.getElementById("feedbackVoluntarioPublico");

  if (!feedback) {
    return;
  }

  feedback.textContent = texto;
  feedback.className = `feedback-voluntario${tipo ? ` ${tipo}` : ""}`;
}

document.addEventListener("submit", async (event) => {
  if (event.target && event.target.id === "formVoluntario") {
    event.preventDefault();

    const disponibilidadeSelecionada = document.querySelector(
      'input[name="disponibilidade"]:checked'
    )?.value;

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      idade: parseInt(document.getElementById("idade").value),
      disponibilidade: disponibilidadeSelecionada,
    };

    try {
      definirFeedbackVoluntario("Enviando inscrição...");
      const resposta = await fetch(apiUrl("/api/voluntarios"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        definirFeedbackVoluntario("Inscrição enviada com sucesso. Entraremos em contato pelos dados informados.", "sucesso");
        event.target.reset();
      } else {
        definirFeedbackVoluntario(resultado.message || "Erro ao cadastrar voluntário.", "erro");
      }
    } catch (erro) {
      definirFeedbackVoluntario("Não foi possível conectar ao servidor.", "erro");
    }
  }
});
