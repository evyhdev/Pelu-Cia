import { atualizarConfiguracaoDoacao, buscarConfiguracaoDoacao } from '../services/doacoes.service.js';
import { enviarErro, enviarSucesso } from '../utils/http.js';

export async function obterConfiguracaoDoacaoController(_req, res) {
  try {
    const configuracao = await buscarConfiguracaoDoacao();
    enviarSucesso(res, configuracao);
  } catch (err) {
    enviarErro(res, err, 'Erro ao buscar configuração de doações.');
  }
}

export async function salvarConfiguracaoDoacaoController(req, res) {
  try {
    const configuracao = await atualizarConfiguracaoDoacao(req.body);
    enviarSucesso(res, configuracao);
  } catch (err) {
    enviarErro(res, err, 'Erro ao salvar configuração de doações.');
  }
}
