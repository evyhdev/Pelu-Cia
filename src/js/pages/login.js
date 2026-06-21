import { apiUrl } from "../services/api.js";

export function renderLoginPage() {
  return `
    <section class="login-page">
      <div class="login-card">
        <img src="/images/logos/logo.webp" alt="Logo Pelu&Cia">
        <h1>Login administrativo</h1>
        <p>Acesse para cadastrar notícias.</p>

        <form id="formLogin">
          <label for="emailLogin">E-mail</label>
          <input type="email" id="emailLogin" required>

          <label for="senhaLogin">Senha</label>
          <input type="password" id="senhaLogin" required>

          <button type="submit" class="btn-submit">Entrar</button>
        </form>

        <p class="admin-feedback" id="feedbackLogin"></p>
      </div>
    </section>
  `;
}

export function initLoginPage() {
  const form = document.getElementById("formLogin");
  const feedback = document.getElementById("feedbackLogin");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedback.textContent = "Entrando...";
    feedback.className = "admin-feedback";

    try {
      const resposta = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.getElementById("emailLogin").value,
          senha: document.getElementById("senhaLogin").value,
        }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("adminToken", resultado.token);
        window.location.href = "/admin-noticias";
      } else {
        feedback.textContent = resultado.message || "Erro ao entrar.";
        feedback.className = "admin-feedback erro";
      }
    } catch (erro) {
      feedback.textContent = "Não foi possível conectar ao servidor.";
      feedback.className = "admin-feedback erro";
    }
  });
}
