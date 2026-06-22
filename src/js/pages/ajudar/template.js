import { renderPageHeader } from "../../components/titles.js";

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

