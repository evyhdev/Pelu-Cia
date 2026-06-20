# Pelu&Cia - Sistema de Adoção de Animais

Projeto web da Pelu&Cia com frontend em Vite e backend Node.js/Express usando PostgreSQL.

## Pré-requisitos

- Node.js 18 ou superior
- Git
- Docker e Docker Compose

## Configuração Inicial

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/evyhdev/Pelu-Cia.git
cd Pelu-Cia
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Suba o PostgreSQL local:

```bash
npm run db:up
```

Inicie o backend:

```bash
npm run dev:backend
```

Em outro terminal, inicie o frontend:

```bash
npm run dev:frontend
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

## Variáveis de Ambiente

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pelucia
DB_USER=postgres
DB_PASSWORD=postgres
VITE_API_BASE_URL=http://localhost:3000
```

`VITE_API_BASE_URL` define qual backend o frontend deve consumir.

## Scripts

- `npm run dev`: inicia o frontend Vite.
- `npm run dev:frontend`: inicia o frontend Vite.
- `npm run dev:backend`: inicia o backend com watch mode.
- `npm run db:up`: sobe o PostgreSQL local via Docker.
- `npm run db:down`: derruba o PostgreSQL local.
- `npm run build`: gera build de produção do frontend.
- `npm start`: inicia o backend sem watch mode.

## Estrutura

```txt
backend/              # API Node.js/Express em arquitetura MVC
public/               # Imagens e ícones públicos
src/                  # Frontend Vite
docker-compose.yml    # PostgreSQL local
```

## Fluxo de Trabalho

- `main`: versão estável.
- `developer`: branch de integração.
- Branches pessoais: criadas a partir de `developer`.

Antes de iniciar uma tarefa:

```bash
git fetch
git checkout sua-branch
git pull origin main
```
