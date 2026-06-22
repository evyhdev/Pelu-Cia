import { configurarBotaoCopiarPix } from "./actions.js";
import {
  renderizarHistorico,
  renderizarPix,
  renderizarResumo,
  renderizarTransferencia,
  atualizarSaldoDestaque,
} from "./renderers.js";
import { API_CONTAS_URL, API_DOACOES_URL } from "./shared.js";

function calcularResumo(contas) {
  return contas.reduce(
    (acc, conta) => {
      const valor = Number(conta.valor);

      if (conta.tipo === "entrada") {
        acc.entradas += valor;
      } else {
        acc.saidas += valor;
      }

      acc.saldo = acc.entradas - acc.saidas;
      return acc;
    },
    { entradas: 0, saidas: 0, saldo: 0 }
  );
}

export async function carregarDadosAjudar() {
  const resumoContainer = document.getElementById("resumoContasPublico");
  const historicoContainer = document.getElementById("historicoContas");
  const pixConteudo = document.querySelector(".conteudo-pix");
  const transferenciaConteudo = document.querySelector(".conteudo-transferencia");

  if (!resumoContainer || !historicoContainer || !pixConteudo || !transferenciaConteudo) {
    return;
  }

  try {
    const [respostaContas, respostaDoacoes] = await Promise.all([
      fetch(API_CONTAS_URL),
      fetch(API_DOACOES_URL),
    ]);
    const resultadoContas = await respostaContas.json();
    const resultadoDoacoes = await respostaDoacoes.json();

    if (!respostaContas.ok || !resultadoContas.sucesso) {
      throw new Error(resultadoContas.message || "Erro ao buscar contas.");
    }

    if (!respostaDoacoes.ok || !resultadoDoacoes.sucesso) {
      throw new Error(resultadoDoacoes.message || "Erro ao buscar dados de doação.");
    }

    const contas = resultadoContas.data;
    const doacoes = resultadoDoacoes.data;
    const resumo = calcularResumo(contas);

    pixConteudo.innerHTML = renderizarPix(doacoes);
    configurarBotaoCopiarPix();

    transferenciaConteudo.innerHTML = renderizarTransferencia(doacoes);
    resumoContainer.innerHTML = renderizarResumo(resumo);
    atualizarSaldoDestaque(resumo, contas);

    if (contas.length === 0) {
      historicoContainer.innerHTML =
        '<p class="contas-status">Ainda não existem movimentações cadastradas.</p>';
      return;
    }

    historicoContainer.innerHTML = renderizarHistorico(contas);
  } catch (erro) {
    resumoContainer.innerHTML =
      '<p class="contas-status">Não foi possível carregar a prestação de contas.</p>';
    historicoContainer.innerHTML =
      '<p class="contas-status">Não foi possível carregar o histórico financeiro.</p>';
    pixConteudo.innerHTML = '<p class="contas-status">Não foi possível carregar os dados do PIX.</p>';
    transferenciaConteudo.innerHTML =
      '<p class="contas-status">Não foi possível carregar os dados de transferência.</p>';
    const saldoTopo = document.getElementById("saldoAtualCaixa");
    if (saldoTopo) {
      saldoTopo.textContent = "Indisponível";
    }
  }
}

