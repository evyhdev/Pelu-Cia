# Prompt para refatoração completa do Pelu&Cia

Você é um agente de engenharia de software trabalhando no repositório Pelu&Cia. Use o código atual como fonte de verdade. Refatore o sistema inteiro com foco em qualidade, manutenção, consistência visual, segurança básica e experiência de uso, sem recriar o produto do zero e sem trocar a stack sem necessidade.

## Contexto do projeto

O sistema é uma aplicação web da Pelu&Cia com:

- Frontend em Vite com JavaScript vanilla, CSS por domínio/página e roteamento manual.
- Backend em Node.js/Express com arquitetura em camadas: routes, controllers, services, repositories.
- PostgreSQL via Docker Compose.
- Painel administrativo com login simples e abas para notícias, prestação de contas, dados de doação, voluntários e mensagens de contato.
- Formulário de contato persistido em `mensagens_contato`; não existe mais envio por SMTP.
- Notícias, contas, doações, voluntários e mensagens devem ser dados reais vindos do backend/banco, não mocks no frontend.

## Objetivo

Refatorar todo o sistema de forma incremental, mantendo as funcionalidades atuais, removendo duplicações e corrigindo problemas técnicos, UX e documentação. Ao final, o sistema deve estar mais organizado, seguro, validável e fácil de evoluir.

## Regras obrigatórias

- Preserve a stack atual, salvo se houver justificativa forte e documentada.
- Não reintroduza SMTP, Mailpit, `nodemailer` ou qualquer fluxo de e-mail.
- Não recrie o frontend do zero; preserve a identidade visual da Pelu&Cia.
- Não use dados mockados onde já existe fluxo persistido/API.
- Mantenha textos, mensagens, docs e comentários em pt-BR.
- Faça mudanças pequenas e verificáveis, preferindo refatoração localizada.
- Não deixe rotas, services, repositories, scripts ou dependências sem uso.
- Não remova funcionalidades usadas pelo frontend.
- Atualize documentação sempre que mudar contrato, scripts, Docker, env ou fluxo de usuário.

## Tarefas de refatoração esperadas

1. Auditar backend e frontend

- Mapear todas as rotas Express e chamadas `fetch` do frontend.
- Remover código morto que não tenha consumidor real.
- Garantir que cada rota exposta tenha uso real ou justificativa documentada.
- Verificar imports, exports e dependências não utilizadas.

2. Melhorar backend

- Padronizar respostas de erro e sucesso.
- Revisar validações de entrada nos services.
- Revisar autenticação admin e middleware `exigirAdmin`.
- Garantir que as rotas administrativas estejam protegidas.
- Garantir que repositories tenham consultas simples, seguras e ordenadas.
- Avaliar se faz sentido adicionar exclusão ou marcação de leitura para mensagens de contato.
- Evitar rollback de cadastro por falha de integrações inexistentes.

3. Melhorar banco e Docker

- Conferir `docker-compose.yml` e `.env.example`.
- Manter apenas serviços realmente utilizados.
- Garantir que o PostgreSQL suba sem conflito de porta.
- Garantir que `backend/database/schema.js` represente as entidades reais.
- Validar criação de tabelas e seeds.

4. Melhorar frontend

- Reduzir duplicação em chamadas de API, feedbacks e tratamento de erros.
- Padronizar estados de loading, vazio, erro e sucesso.
- Melhorar a aba `Mensagens` do admin, se necessário.
- Melhorar acessibilidade básica de formulários, botões e navegação.
- Melhorar responsividade sem descaracterizar o design atual.
- Evitar `alert()`/`confirm()` se houver alternativa inline ou modal simples coerente.
- Melhorar a divisão de responsabilidades por arquivos e a arquitetura

5. Melhorar documentação

- Atualizar `README.md`, `backend/README.md`, `docs/arquitetura.md` e `docs/designer.md`.
- Garantir que não existam referências antigas a SMTP, Mailpit, `nodemailer` ou rotas removidas.
- Documentar as rotas realmente existentes.
- Documentar scripts, porta do banco, variáveis de ambiente e fluxo admin.

6. Melhorar qualidade geral

- Rodar validações estáticas.
- Rodar build do frontend.
- Validar import do app backend.
- Validar conexão real com o PostgreSQL via Docker quando possível.
- Validar inicialização de schema/seeds.
- Procurar regressões com `rg` para termos antigos e código órfão.

## Critérios de aceitação

Ao terminar, o projeto deve atender a estes pontos:

- `npm run build` executa com sucesso.
- O backend importa sem erro.
- `docker compose config` passa.
- `docker compose up -d postgres` sobe o banco configurado.
- A conexão backend -> PostgreSQL funciona com as variáveis de ambiente documentadas.
- Não há dependências removidas ainda listadas no `package.json`.
- Não há scripts apontando para serviços inexistentes.
- Não há referências a SMTP/Mailpit/nodemailer.
- O painel admin continua com notícias, contas, doações, voluntários e mensagens.
- O formulário de contato salva mensagem no banco e o admin consegue listar.
- As docs descrevem o comportamento real do sistema.

## Validações sugeridas

Execute, no mínimo:

```bash
npm run build
find backend -name '*.js' -print0 | xargs -0 -n1 node --check
node --input-type=module -e "import('./backend/app.js').then(() => console.log('backend app import ok'))"
docker compose config
docker compose up -d --remove-orphans postgres
docker compose ps
docker compose exec -T postgres pg_isready -U postgres -d pelucia
node --input-type=module -e "import('./backend/config/db.js').then(async ({default: pool}) => { const result = await pool.query('select 1 as ok'); console.log('db ok', result.rows[0].ok); await pool.end(); })"
node --input-type=module -e "import('./backend/database/index.js').then(async ({ initDatabase }) => { await initDatabase(); console.log('database init ok'); })"
rg -n "SMTP|Mailpit|nodemailer|mailtrap|mail:up|GET /api/noticias/:id|PUT /api/noticias|GET /api/voluntarios/:id" .
git diff --check
```

Se alguma validação falhar, corrija a causa ou documente claramente o bloqueio.

## Registro obrigatório no final

Quando concluir toda a refatoração, volte a este arquivo `prompt.md` e adicione uma seção chamada:

```md
## Relatório final da refatoração
```

Nessa seção, escreva de forma objetiva:

- Tudo que foi alterado.
- Todas as melhorias implementadas.
- Arquivos principais modificados.
- Rotas, services, repositories ou dependências removidas.
- Mudanças em Docker, banco e variáveis de ambiente.
- Validações executadas e resultados.
- Qualquer limitação restante ou decisão técnica importante.

Não deixe o relatório apenas no chat. O relatório final precisa ficar escrito dentro deste próprio arquivo `prompt.md`.

## Relatório final da refatoração

### Alterações realizadas

- Backend padronizado com `backend/utils/http.js` para respostas de sucesso, criação e erro.
- Controllers de notícias, contas, contato, doações e voluntários ajustados para usar o formato comum `{ sucesso, data }` e `{ sucesso, message }`.
- Login administrativo endurecido para lidar com body ausente, normalizar e-mail e manter compatibilidade com o frontend retornando `token` na raiz e em `data.token`.
- Validação de token administrativo ajustada para comparar assinaturas com `crypto.timingSafeEqual`.
- Services passaram a lançar erros reais com `Error` e `status`, em vez de objetos soltos.
- Validação de e-mail adicionada ao cadastro de voluntários.
- Código morto removido: `removerVoluntario` saiu de `backend/repositories/voluntarios.repository.js`, porque não havia rota, service, controller ou tela consumindo exclusão de voluntário.
- Repository de voluntários passou a retornar também `idade` e ordenar por `criado_em DESC, id DESC`.
- Mensagens de contato ganharam o campo `lida`, ordenação por não lidas primeiro, marcação como lida e exclusão administrativa.
- Schema do banco ganhou migração segura com `ADD COLUMN IF NOT EXISTS lida BOOLEAN NOT NULL DEFAULT FALSE` em `mensagens_contato`.
- Novas rotas protegidas criadas:
  - `PATCH /api/contato/:id/lida`
  - `DELETE /api/contato/:id`
- Aba `Mensagens` do admin passou a mostrar status `Nova`/`Lida`, marcar mensagem como lida e excluir mensagem com confirmação inline.
- Exclusão de notícias e movimentações deixou de usar confirmação nativa do navegador e passou para confirmação inline em dois cliques.
- Formulário público de voluntariado deixou de usar alertas nativos e passou a mostrar feedback inline acessível com `role="status"` e `aria-live`.
- CSS administrativo recebeu estilos para botão secundário, status de mensagem, ações em lista e feedback do voluntariado público.
- `README.md`, `backend/README.md`, `docs/arquitetura.md` e `docs/designer.md` foram atualizados para refletir o contrato real do sistema.

### Arquivos principais modificados

- `backend/utils/http.js`
- `backend/controllers/*.controller.js`
- `backend/services/*.service.js`
- `backend/repositories/contato.repository.js`
- `backend/repositories/voluntarios.repository.js`
- `backend/routes/contato.router.js`
- `backend/database/schema.js`
- `backend/utils/auth.js`
- `backend/utils/validations.js`
- `src/js/pages/adminNoticias/shared.js`
- `src/js/pages/adminNoticias/mensagens.js`
- `src/js/pages/adminNoticias/noticias.js`
- `src/js/pages/adminNoticias/contas.js`
- `src/js/pages/voluntario.js`
- `src/css/voluntariado.css`
- `README.md`
- `backend/README.md`
- `docs/arquitetura.md`
- `docs/designer.md`

### Docker, banco e variáveis de ambiente

- `docker-compose.yml`, `.env.example` e `package.json` não precisaram mudar.
- O schema do banco mudou apenas em `mensagens_contato`, adicionando o campo `lida`.
- O `docker compose config` passou e usou `DB_PORT=5435` vindo do `.env` local. O exemplo versionado continua documentando `5434`, que é o padrão de onboarding do projeto.

### Validações executadas

- `npm run build`: passou.
- `find backend -name '*.js' -print0 | xargs -0 -n1 node --check`: passou.
- `node --input-type=module -e "import('./backend/app.js').then(() => console.log('backend app import ok'))"`: passou.
- `docker compose config`: passou.
- `git diff --check`: passou.
- Busca por alertas, confirmações nativas, rotas antigas e integrações removidas: não encontrou ocorrências no código ou documentação do sistema; encontrou apenas as instruções do próprio `prompt.md`.

### Validações bloqueadas

- `docker compose up -d --remove-orphans postgres`: bloqueado porque o Docker daemon não está acessível em `unix:///home/jacdev/.docker/desktop/docker.sock`.
- `docker compose ps`: bloqueado pelo mesmo motivo.
- `docker compose exec -T postgres pg_isready -U postgres -d pelucia`: bloqueado pelo mesmo motivo.
- Conexão backend -> PostgreSQL e `initDatabase()`: no sandbox retornaram `EPERM`; fora do sandbox retornaram `ECONNREFUSED` em `localhost:5435`, porque o banco não estava rodando e o Docker daemon não pôde subir o container.

### Limitações e decisões técnicas

- A exclusão de voluntários não foi adicionada porque não existe consumidor real hoje; o código morto foi removido em vez de criar uma rota sem uso.
- A marcação de leitura e exclusão de mensagens foram implementadas porque têm consumidor direto no painel admin e resolvem uma lacuna funcional já documentada.
- O campo `lida` é retrocompatível para bancos existentes por usar `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`.
- O arquivo `.gitignore` já estava modificado antes desta execução e não foi tratado como parte da refatoração.
