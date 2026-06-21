import { renderPageHeader } from "../components/titles.js";
import { apiUrl } from "../services/api.js";

export function renderAjudarPage() {
  return `
    ${renderPageHeader({
      title: "Faça a Diferença",
      subtitle:
        "Sua doação ajuda a manter nosso projeto ativo, cuidando de mais animais e salvando vidas.",
    })}

    <section class="card-info">
      <h2>Cuidando dos Animais do Campus</h2>
      <p>
        Os voluntários do Pelu&Cia cuidam diariamente dos animais que vivem no campus da UFC
        Quixadá. Suas doações garantem ração de qualidade, vacinas, vermifugação e consultas
        veterinárias para todos eles.
      </p>

      <a href="#doacao" class="botao-azul">
        <img src="/images/ajudar/coracao.webp" alt=""> Fazer uma Doação
      </a>
    </section>

    <section class="estatisticas">
      <div class="card-estatistica">
        <img src="/images/ajudar/valor-atual.webp" alt="">
        <h3 id="saldoAtualCaixa">Carregando...</h3>
        <p>Valor atual em caixa</p>
      </div>

      <div class="card-estatistica amarelo">
        <img src="/images/ajudar/transparencia.webp" alt="">
        <h3>100%</h3>
        <p>Transparência nas contas</p>
      </div>
    </section>

    <section class="doacao" id="doacao">
      <input type="radio" name="abas-doacao" id="aba-pix" checked>
      <input type="radio" name="abas-doacao" id="aba-transferencia">
      <input type="radio" name="abas-doacao" id="aba-contas">

      <div class="abas">
        <label for="aba-pix">PIX</label>
        <label for="aba-transferencia">Transferência</label>
        <label for="aba-contas">Prestação de Contas</label>
      </div>

      <div class="conteudos-abas">
        <div class="conteudo conteudo-pix">
          <h2>Doação via PIX</h2>
          <p>Forma mais rápida e prática de ajudar</p>
          <p>Use a chave PIX cadastrada pela equipe para realizar sua contribuição.</p>

          <p>Chave PIX:</p>
          <div class="chave-pix">Chave PIX não cadastrada.</div>
          <button type="button" class="botao-copiar" id="copiarPixButton">Copiar chave PIX</button>
          <div class="favorecido">Favorecido: Pelu&Cia - UFC Quixadá</div>
        </div>

        <div class="conteudo conteudo-transferencia">
          <h2>Transferência Bancária</h2>
          <p>Dados para depósito ou transferência</p>

          <div class="dados-banco">
            <div>
              <span>Banco:</span>
              <strong>Nu Pagamentos S.A. (0260)</strong>
            </div>

            <div>
              <span>Agência:</span>
              <strong>XXXXX</strong>
            </div>

            <div>
              <span>Conta:</span>
              <strong>XXXXXXXXX</strong>
            </div>

            <div>
              <span>Instituição:</span>
              <strong>Nu Pagamentos S.A. - Instituição de Pagamento</strong>
            </div>
          </div>

          <div class="dica">
            <strong>Dica:</strong>
            Após realizar a transferência, envie o comprovante para nosso e-mail
            <strong>pelu.ciaqx@gmail.com</strong> para que possamos registrar sua contribuição.
          </div>
        </div>

        <div class="conteudo conteudo-contas">
          <h2>Transparência Total</h2>
          <p>Acompanhe os lançamentos financeiros cadastrados no sistema.</p>

          <div class="resumo-contas-publico" id="resumoContasPublico">
            <p class="contas-status">Carregando movimentações...</p>
          </div>

          <div class="saldo-caixa" id="saldoCaixaDetalhado">
            <h4>Saldo Atual em Caixa</h4>
            <p>Valor disponível para cuidados aos animais</p>
            <h2>Carregando...</h2>
            <small>Aguardando dados do sistema</small>
          </div>

          <h3>Histórico de movimentações</h3>
          <div id="historicoContas">
            <p class="contas-status">Carregando movimentações...</p>
          </div>

          <div class="compromisso">
            <h4>Nosso Compromisso</h4>
            <p>
              Mantemos total transparência sobre o uso dos recursos doados. Cada centavo é
              investido no cuidado dos animais do campus, incluindo alimentação, tratamento
              veterinário, medicamentos e deslocamento quando necessário.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="chamada">
      <h2>Cada Doação Salva Vidas</h2>
      <p>
        Não importa o valor, toda contribuição faz a diferença na vida de um animal que precisa de
        ajuda. Juntos, podemos fazer mais!
      </p>

      <div>
        <a href="#" class="botao-claro">Doar Agora</a>
        <a href="/voluntario" class="botao-contorno">Seja Voluntário</a>
      </div>
    </section>
  `;
}

const API_CONTAS_URL = apiUrl("/api/contas");
const API_DOACOES_URL = apiUrl("/api/doacoes");

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor || 0));
}

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(data));
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderizarResumo(resumo) {
  return `
    <div class="card-conta card-resumo-conta">
      <span>Total de entradas</span>
      <h4>${formatarMoeda(resumo.entradas)}</h4>
    </div>
    <div class="card-conta card-resumo-conta">
      <span>Total de saídas</span>
      <h4>${formatarMoeda(resumo.saidas)}</h4>
    </div>
    <div class="card-conta card-resumo-conta destaque">
      <span>Saldo atual</span>
      <h4>${formatarMoeda(resumo.saldo)}</h4>
    </div>
  `;
}

function renderizarHistorico(contas) {
  return contas
    .map(
      (conta) => `
        <div class="card-conta card-movimentacao ${conta.tipo === "entrada" ? "entrada" : "saida"}">
          <div class="card-conta-topo">
            <span class="tag-movimentacao">${conta.tipo === "entrada" ? "Entrada" : "Saída"}</span>
            <strong>${formatarMoeda(conta.valor)}</strong>
          </div>
          <h4>${escaparHTML(conta.descricao)}</h4>
          <p>Lançamento em ${formatarData(conta.data)}</p>
        </div>
      `
    )
    .join("");
}

function atualizarSaldoDestaque(resumo, contas) {
  const saldoTopo = document.getElementById("saldoAtualCaixa");
  const saldoDetalhado = document.getElementById("saldoCaixaDetalhado");

  if (saldoTopo) {
    saldoTopo.textContent = formatarMoeda(resumo.saldo);
  }

  if (saldoDetalhado) {
    const dataAtualizacao = contas[0]?.data
      ? formatarData(contas[0].data)
      : "sem movimentações cadastradas";

    saldoDetalhado.innerHTML = `
      <h4>Saldo Atual em Caixa</h4>
      <p>Valor disponível para cuidados aos animais</p>
      <h2>${formatarMoeda(resumo.saldo)}</h2>
      <small>Atualizado com base no último lançamento em ${dataAtualizacao}</small>
    `;
  }
}

async function copiarTexto(texto) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(texto);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = texto;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function configurarBotaoCopiarPix() {
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

export async function initAjudarPage() {
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
    const resumo = contas.reduce(
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

    pixConteudo.innerHTML = `
      <h2>Doação via PIX</h2>
      <p>Forma mais rápida e prática de ajudar</p>
      <p>Use a chave PIX cadastrada pela equipe para realizar sua contribuição.</p>

      <p>Chave PIX:</p>
      <div class="chave-pix">${escaparHTML(doacoes.pix_chave || "Chave PIX não cadastrada.")}</div>
      <button type="button" class="botao-copiar" id="copiarPixButton" data-pix-key="${escaparHTML(doacoes.pix_chave || "")}">Copiar chave PIX</button>
      <div class="favorecido">Favorecido: ${escaparHTML(doacoes.pix_favorecido || "Não informado")}</div>
    `;
    configurarBotaoCopiarPix();

    transferenciaConteudo.innerHTML = `
      <h2>Transferência Bancária</h2>
      <p>Dados para depósito ou transferência</p>

      <div class="dados-banco">
        <div>
          <span>Banco:</span>
          <strong>${escaparHTML(doacoes.banco || "Não informado")}</strong>
        </div>

        <div>
          <span>Agência:</span>
          <strong>${escaparHTML(doacoes.agencia || "Não informado")}</strong>
        </div>

        <div>
          <span>Conta:</span>
          <strong>${escaparHTML(doacoes.conta || "Não informado")}</strong>
        </div>

        <div>
          <span>Instituição:</span>
          <strong>${escaparHTML(doacoes.instituicao || "Não informado")}</strong>
        </div>
      </div>

      <div class="dica">
        <strong>Dica:</strong>
        ${escaparHTML(
          doacoes.observacao_transferencia ||
            "Após realizar a transferência, envie o comprovante para a equipe responsável."
        )}
      </div>
    `;

    resumoContainer.innerHTML = renderizarResumo(resumo);
    atualizarSaldoDestaque(resumo, contas);

    if (contas.length === 0) {
      historicoContainer.innerHTML = '<p class="contas-status">Ainda não existem movimentações cadastradas.</p>';
      return;
    }

    historicoContainer.innerHTML = renderizarHistorico(contas);
  } catch (erro) {
    resumoContainer.innerHTML = '<p class="contas-status">Não foi possível carregar a prestação de contas.</p>';
    historicoContainer.innerHTML = '<p class="contas-status">Não foi possível carregar o histórico financeiro.</p>';
    pixConteudo.innerHTML = '<p class="contas-status">Não foi possível carregar os dados do PIX.</p>';
    transferenciaConteudo.innerHTML = '<p class="contas-status">Não foi possível carregar os dados de transferência.</p>';
    const saldoTopo = document.getElementById("saldoAtualCaixa");
    if (saldoTopo) {
      saldoTopo.textContent = "Indisponível";
    }
  }
}
