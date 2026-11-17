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
          <p class="feedback-form" id="feedbackVoluntario" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
}

export function initVoluntarioPage() {
  const form = document.getElementById("formVoluntario");
  const feedback = document.getElementById("feedbackVoluntario");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const botaoEnviar = form.querySelector('button[type="submit"]');
    botaoEnviar.disabled = true;

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      idade: Number.parseInt(document.getElementById("idade").value, 10),
      disponibilidade: document.querySelector('input[name="disponibilidade"]:checked')?.value,
    };

    feedback.textContent = "Enviando inscrição...";
    feedback.className = "feedback-form";

    try {
      const resposta = await fetch(apiUrl("/api/voluntarios"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.message || "Erro ao cadastrar voluntário.");
      }

      feedback.textContent = "Inscrição enviada com sucesso.";
      feedback.className = "feedback-form feedback-sucesso";
      form.reset();
    } catch (erro) {
      feedback.textContent = erro.message || "Não foi possível conectar ao servidor.";
      feedback.className = "feedback-form feedback-erro";
    } finally {
      botaoEnviar.disabled = false;
    }
  });
}
