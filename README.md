# Pelu&Cia

Sistema web da Pelu&Cia com frontend em Vite, backend em Node.js/Express e banco PostgreSQL.

## O que o sistema faz

- Exibe a home institucional do projeto.
- Lista e detalha notícias reais do banco de dados.
- Salva mensagens da página inicial para consulta no painel administrativo.
- Recebe inscrições de voluntariado no banco.
- Mostra a página de doações com chave PIX e dados bancários cadastrados no banco.
- Exibe a prestação de contas real com entradas e saídas do projeto.
- Possui painel administrativo para notícias, prestação de contas, doações, voluntários e mensagens.

## Requisitos

- Node.js 18 ou superior
- Docker e Docker Compose
- Git

## Como rodar do zero

1. Clone o repositório.

```bash
git clone https://github.com/evyhdev/Pelu-Cia.git
cd Pelu-Cia
```

2. Instale as dependências.

```bash
npm install
```

3. Crie o arquivo `.env` a partir do exemplo.

```bash
cp .env.example .env
```

4. Suba a infraestrutura local.

```bash
npm run infra:up
```

Isso sobe:

- PostgreSQL em `localhost:5434`

5. Inicie o backend.

```bash
npm run dev:backend
```

6. Em outro terminal, inicie o frontend.

```bash
npm run dev:frontend
```

7. Abra o sistema.

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Scripts

- `npm run dev`: inicia o frontend Vite.
- `npm run dev:frontend`: inicia o frontend Vite.
- `npm run dev:backend`: inicia o backend com watch mode.
- `npm start`: inicia o backend sem watch mode.
- `npm run build`: gera o build de produção do frontend.
- `npm run db:up`: sobe apenas o PostgreSQL.
- `npm run infra:up`: sobe o PostgreSQL.
- `npm run db:down`: derruba a infraestrutura Docker.
- `npm run infra:down`: derruba a infraestrutura Docker.

## Estrutura do projeto

```txt
backend/            API Express, regras de negócio e acesso ao PostgreSQL
src/                Frontend Vite
public/             Imagens e arquivos públicos
docs/               Documentação do sistema
docker-compose.yml  Infra local com PostgreSQL
```

## Acesso administrativo

1. Abra `http://localhost:5173/login`
2. Entre com o e-mail e senha definidos em `.env`
3. Você será redirecionado para `/admin`

O painel administrativo possui:

- cadastro e exclusão de notícias
- cadastro de movimentações financeiras
- cadastro dos dados de doação
- cadastro e visualização das solicitações de voluntariado
- visualização das mensagens de contato recebidas

## Integrações principais

- Notícias: `GET /api/noticias`
- Contato da home: `POST /api/contato`
- Mensagens no admin: `GET /api/contato`
- Voluntariado: `POST /api/voluntarios`
- Prestação de contas: `GET /api/contas`
- Dados de doação: `GET /api/doacoes`
- Admin de doação: `PUT /api/doacoes`

## Observações importantes

- As mensagens de contato ficam salvas no banco e aparecem na aba `Mensagens` do painel administrativo.
- A página `Ajudar` consome os dados reais de doação e contas do banco.
- A página `Notícias` e a home consomem o backend real, não dados mockados do frontend.

## Problemas comuns

- Se o backend não subir, confira se o PostgreSQL está rodando e se o `.env` está correto.
- Se o frontend não conseguir acessar a API, confirme `VITE_API_BASE_URL=http://localhost:3000`.
