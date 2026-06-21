# Designer do Sistema Pelu&Cia

## Objetivo deste documento

Este arquivo descreve o desenho visual e a identidade de interface atualmente implementados no sistema, com foco em estilo, componentes, responsividade e consistência de experiência.

## Direção visual

O sistema adota uma estética institucional, amigável e acessível, alinhada a um projeto social ligado ao cuidado animal. A interface combina:

- azul como cor principal de confiança e institucionalidade
- amarelo claro como cor de apoio e destaque afetivo
- branco e cinzas suaves para leveza visual
- imagens de animais para conexão emocional com a causa

O resultado é uma identidade visual limpa, acolhedora e relativamente simples de navegar.

## Tokens visuais principais

Os tokens estão centralizados em [`src/css/global.css`](../src/css/global.css).

### Cores

- `--azul-logo: #2d76b9`
- `--amarelo-logo: #fbe4a1`
- `--azul-titulo: #0655b8`
- `--azul-escuro: #05458f`
- `--amarelo-hover: #f7d77e`
- `--cinza-subtitulo: #717182`
- `--cinza-texto: #5f6270`
- `--brancogelo: #f5f5f5`
- `--preto-destaque: #1a1a1a`

### Tipografia

- fonte principal: `Poppins, Arial, Helvetica, sans-serif`
- escala com tamanhos pequenos, base, médios e grandes
- destaque forte para títulos e chamadas hero

### Raios e formas

- cantos arredondados recorrentes
- uso de botões tipo pílula para categorias e abas
- cards com bordas suaves

## Estrutura visual global

### Header

O cabeçalho:

- fica fixo no topo com `position: sticky`
- usa logo à esquerda, navegação central e botão de login à direita
- destaca a rota ativa
- adiciona sombra ao rolar a página

Função visual:

- manter navegação constante
- reforçar identidade institucional
- facilitar deslocamento entre áreas do site

### Footer

O rodapé:

- usa fundo azul sólido
- traz bloco institucional, links rápidos e contatos
- reforça a assinatura da marca

Função visual:

- fechamento consistente de página
- reforço de credibilidade
- canal de contato permanente

## Padrões visuais por página

### Home

Características:

- hero de alto contraste em azul
- imagem principal grande
- dois CTAs logo no início
- seção de notícias em cards
- área de parceiros
- formulário de contato em card claro

Leitura visual:

- primeiro impacto emocional
- depois prova social/conteúdo
- por fim conversão via contato

### Ajudar

Características:

- cabeçalho interno azul
- cards informativos com azul e amarelo translúcidos
- navegação por abas sem JavaScript, usando radio buttons
- seção de chamada final em bloco azul

Leitura visual:

- explica o problema
- mostra transparência
- conduz à ação de doação

### Notícias

Características:

- uma notícia em destaque com imagem maior
- cards secundários padronizados
- uso de badges para categoria
- modal nativo `dialog` para leitura completa

Leitura visual:

- hierarquia editorial clara
- primeiro destaque, depois grade de leitura

### Sobre

Características:

- narrativa institucional com imagem lateral
- cards de impacto com ícones
- CTA final para engajamento

Leitura visual:

- contexto
- legitimidade
- convite à participação

### Voluntariado

Características:

- imagem de abertura emocional
- formulário centralizado em card branco
- campos bem espaçados
- CTA principal ocupando a largura do formulário

Leitura visual:

- sensibilização inicial
- preenchimento orientado

### Login e admin

Características:

- fundo neutro
- cards brancos com borda leve
- linguagem mais operacional
- menos carga institucional e mais foco funcional

Leitura visual:

- transição do site público para um ambiente de gestão

## Componentes recorrentes

### Botões

Padrões identificados:

- botão dourado para ações de apoio/doação
- botão azul para ações principais
- botão com contorno branco em áreas escuras
- botão contornado azul em cards de notícia

Interpretação:

- o sistema diferencia ações emocionais, informativas e administrativas pela cor

### Cards

Usados em:

- notícias
- impacto
- estatísticas
- áreas administrativas
- transparência financeira

Padrão:

- fundo branco ou cinza claro
- bordas suaves
- espaçamento interno generoso

### Badges e categorias

Usados para:

- tipo da notícia
- destaque de conteúdo

Função:

- reforçar classificação visual rápida

## Responsividade

O arquivo [`src/css/responsivo.css`](../src/css/responsivo.css) concentra os principais ajustes para telas menores.

Comportamentos implementados:

- redução do padding das seções hero
- diminuição do tamanho do título principal
- ocultação da imagem da home no mobile
- empilhamento vertical de blocos de notícia
- empilhamento do conteúdo da página sobre
- cards de impacto em coluna

Pontos positivos:

- estrutura básica se adapta para mobile
- CTAs da home passam a ocupar largura total

Limitações observadas:

- nem todos os módulos possuem responsividade detalhada no CSS
- o menu superior continua simples e pode ficar apertado em larguras menores
- não há menu mobile dedicado

## Experiência do usuário

## Acertos

- navegação simples e previsível
- identidade coerente com causa social
- linguagem visual amigável
- boa separação entre áreas públicas e administrativas
- CTAs claros nas páginas principais

## Fragilidades

- uso frequente de `alert()` em fluxos importantes reduz a qualidade da experiência
- formulário de contato parece funcional, mas não envia dados
- parceiros ainda passam sensação de conteúdo incompleto
- o admin não tem tabela mais rica, filtros ou edição
- o login/admin reaproveita menos da identidade emocional do restante do site

## Recomendações de evolução do design

- substituir `alert()` por feedback inline padronizado
- criar estados visuais de loading, vazio e erro mais consistentes
- implementar menu mobile dedicado
- enriquecer a identidade dos parceiros com logos reais
- transformar o formulário de contato em fluxo real com confirmação visual
- padronizar melhor a experiência do admin com tabelas, ações e mensagens
- se o upload físico de imagem for ativado, mostrar preview e progresso

## Resumo do design atual

O desenho do Pelu&Cia é coerente com um projeto social universitário: amigável, limpo e centrado em confiança, acolhimento e mobilização. A identidade visual já está bem definida por cores, cards, CTAs e imagens de animais. O principal passo seguinte não é reinventar o visual, mas amadurecer a experiência com mais consistência funcional, feedbacks melhores e refinamento responsivo.
