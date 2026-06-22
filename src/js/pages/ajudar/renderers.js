import { escaparHTML, formatarData, formatarMoeda } from "./shared.js";

export function renderizarResumo(resumo) {
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

export function renderizarHistorico(contas) {
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

export function renderizarPix(doacoes) {
  return `
    <h2>Doação via PIX</h2>
    <p>Forma mais rápida e prática de ajudar</p>
    <p>Use a chave PIX cadastrada pela equipe para realizar sua contribuição.</p>

    <p>Chave PIX:</p>
    <div class="chave-pix">${escaparHTML(doacoes.pix_chave || "Chave PIX não cadastrada.")}</div>
    <button type="button" class="botao-copiar" id="copiarPixButton" data-pix-key="${escaparHTML(doacoes.pix_chave || "")}">Copiar chave PIX</button>
    <div class="favorecido">Favorecido: ${escaparHTML(doacoes.pix_favorecido || "Não informado")}</div>
  `;
}

export function renderizarTransferencia(doacoes) {
  return `
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
}

export function atualizarSaldoDestaque(resumo, contas) {
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

