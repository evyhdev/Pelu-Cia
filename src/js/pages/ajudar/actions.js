import { copiarTexto } from "./shared.js";

export function configurarBotaoCopiarPix() {
  document.getElementById("copiarPixButton")?.addEventListener("click", async (event) => {
    const botao = event.currentTarget;
    const chavePix = botao.dataset.pixKey;

    if (!chavePix) {
      botao.textContent = "Chave indisponível";
      setTimeout(() => {
        botao.textContent = "Copiar chave PIX";
      }, 1800);
      return;
    }

    try {
      await copiarTexto(chavePix);
      botao.textContent = "Copiado!";
      botao.classList.add("copiado");
    } catch (_erro) {
      botao.textContent = "Erro ao copiar";
    }

    setTimeout(() => {
      botao.textContent = "Copiar chave PIX";
      botao.classList.remove("copiado");
    }, 1800);
  });
}

