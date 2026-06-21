import { atualizarConfiguracaoDoacao, buscarConfiguracaoDoacao } from '../services/doacoes.service.js';

export async function obterConfiguracaoDoacaoController(_req, res) {
  try {
    const configuracao = await buscarConfiguracaoDoacao();
    res.json({ sucesso: true, data: configuracao });
  } catch (err) {
    res.status(500).json({ sucesso: false, message: 'Erro ao buscar configuração de doações.' });
  }
}

export async function salvarConfiguracaoDoacaoController(req, res) {
  try {
    const configuracao = await atualizarConfiguracaoDoacao(req.body);
    res.json({ sucesso: true, data: configuracao });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Erro ao salvar configuração de doações.';
    res.status(status).json({ sucesso: false, message });
  }
}
