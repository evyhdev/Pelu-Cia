import { apiUrl } from "../../services/api.js";

export const API_NOTICIAS_URL = apiUrl("/api/noticias");
export const API_CONTAS_URL = apiUrl("/api/contas");
export const API_DOACOES_URL = apiUrl("/api/doacoes");
export const API_VOLUNTARIOS_URL = apiUrl("/api/voluntarios");
export const API_CONTATO_URL = apiUrl("/api/contato");

export function obterTokenAdmin() {
  return localStorage.getItem("adminToken");
}

export function obterCabecalhosAdmin(json = false) {
  const headers = {
    Authorization: `Bearer ${obterTokenAdmin()}`,
  };

  if (json) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function formatarDataHora(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(data));
}

export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor || 0));
}

export function definirFeedback(id, texto, tipo = "") {
  const elemento = document.getElementById(id);

  if (!elemento) {
    return;
  }

  elemento.textContent = texto;
  elemento.className = `admin-feedback${tipo ? ` ${tipo}` : ""}`;
}

export function prepararConfirmacaoExclusao(botao, texto = "Confirmar exclusão") {
  if (botao.dataset.confirmando === "true") {
    return true;
  }

  botao.dataset.confirmando = "true";
  botao.dataset.textoOriginal = botao.textContent;
  botao.textContent = texto;

  setTimeout(() => {
    if (botao.isConnected && botao.dataset.confirmando === "true") {
      botao.dataset.confirmando = "false";
      botao.textContent = botao.dataset.textoOriginal || "Excluir";
    }
  }, 4000);

  return false;
}

export async function lerRespostaJson(resposta) {
  if (resposta.status === 204) {
    return {};
  }

  return await resposta.json();
}

export function tratarErroAutenticacao(status) {
  if (status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
    return true;
  }

  return false;
}

export function preencherDataAtual(id) {
  const campo = document.getElementById(id);

  if (campo && !campo.value) {
    campo.value = new Date().toISOString().slice(0, 10);
  }
}

export function lerFoto(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => resolve(leitor.result);
    leitor.onerror = () => reject();
    leitor.readAsDataURL(arquivo);
  });
}
