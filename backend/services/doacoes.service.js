import { obterConfiguracaoDoacao, salvarConfiguracaoDoacao } from '../repositories/doacoes.repository.js';
import { criarErro } from '../utils/http.js';

function limpar(valor) {
  return String(valor ?? '').trim();
}

function validarConfiguracaoDoacao(dados) {
  const configuracao = {
    pixChave: limpar(dados.pixChave),
    pixFavorecido: limpar(dados.pixFavorecido),
    banco: limpar(dados.banco),
    agencia: limpar(dados.agencia),
    conta: limpar(dados.conta),
    instituicao: limpar(dados.instituicao),
    observacaoTransferencia: limpar(dados.observacaoTransferencia),
  };

  if (
    !configuracao.pixChave ||
    !configuracao.pixFavorecido ||
    !configuracao.banco ||
    !configuracao.agencia ||
    !configuracao.conta ||
    !configuracao.instituicao
  ) {
    throw criarErro(400, 'Todos os campos principais de doação são obrigatórios.');
  }

  return configuracao;
}

export async function buscarConfiguracaoDoacao() {
  const configuracao = await obterConfiguracaoDoacao();

  return (
    configuracao || {
      pix_chave: '',
      pix_favorecido: '',
      banco: '',
      agencia: '',
      conta: '',
      instituicao: '',
      observacao_transferencia: '',
    }
  );
}

export async function atualizarConfiguracaoDoacao(dados) {
  const configuracao = validarConfiguracaoDoacao(dados);
  return await salvarConfiguracaoDoacao(configuracao);
}
