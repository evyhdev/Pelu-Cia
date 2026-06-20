# Backend Pelu&Cia

## Arquitetura

```txt
backend/
├── config/          # Configuração de banco e inicialização de schema
├── controllers/     # Entrada HTTP: req/res e status codes
├── database/        # Criação de schema e seeds iniciais
├── repositories/    # Acesso direto ao PostgreSQL
├── routes/          # Mapeamento de endpoints do Express
├── services/        # Regras de negócio e validações
├── app.js           # Configuração do Express
└── index.js         # Entrada do backend
```

## Banco De Dados

O backend usa PostgreSQL. Para desenvolvimento local, suba o banco com Docker:

```bash
npm run db:up
```

Configure as variáveis abaixo em um arquivo `.env` na raiz do projeto:

```txt
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pelucia
DB_USER=postgres
DB_PASSWORD=postgres
VITE_API_BASE_URL=http://localhost:3000
```

Ao iniciar o backend, as tabelas `voluntarios` e `noticias` são criadas se ainda não existirem.
A tabela `noticias` também recebe notícias simuladas iniciais, sem duplicar títulos já existentes.

## Contrato Geral

Base URL local:

```txt
http://localhost:3000
```

Respostas de sucesso:

```json
{
  "sucesso": true,
  "data": {}
}
```

Respostas de erro:

```json
{
  "sucesso": false,
  "message": "Mensagem do erro."
}
```

## Entidade Noticia

```json
{
  "id": 1,
  "titulo": "Título da notícia",
  "foto": "/images/noticias/noticia-1.webp",
  "resumo": "Resumo curto da notícia.",
  "noticia": "Texto completo da notícia.",
  "data": "2026-06-20T00:00:00.000Z",
  "tipo": "Evento",
  "criado_em": "2026-06-20T12:00:00.000Z"
}
```

O campo `foto` pode ser uma URL absoluta ou um caminho público do frontend, como `/images/noticias/noticia-1.webp`.

## Rotas De Notícias

### Listar notícias

```http
GET /api/noticias
```

Resposta `200`:

```json
{
  "sucesso": true,
  "data": [
    {
      "id": 1,
      "titulo": "Título da notícia",
      "foto": "/images/noticias/noticia-1.webp",
      "resumo": "Resumo curto.",
      "noticia": "Texto completo.",
      "data": "2026-06-20T00:00:00.000Z",
      "tipo": "Evento",
      "criado_em": "2026-06-20T12:00:00.000Z"
    }
  ]
}
```

### Buscar notícia por ID

```http
GET /api/noticias/:id
```

Resposta `200`: retorna uma entidade `Noticia`.

Resposta `404`:

```json
{
  "sucesso": false,
  "message": "Notícia não encontrada."
}
```

### Criar notícia

```http
POST /api/noticias
Content-Type: application/json
```

```json
{
  "titulo": "Título da notícia",
  "foto": "/images/noticias/noticia-1.webp",
  "resumo": "Resumo curto da notícia.",
  "noticia": "Texto completo da notícia.",
  "data": "2026-06-20",
  "tipo": "Evento"
}
```

Resposta `201`: retorna a notícia criada.

Erros esperados:

- `400`: campo obrigatório ausente ou data inválida.
- `409`: título já cadastrado.

### Modificar notícia

```http
PUT /api/noticias/:id
Content-Type: application/json
```

O corpo da requisição usa os mesmos campos do cadastro.

Resposta `200`: retorna a notícia modificada.

Erros esperados:

- `400`: campo obrigatório ausente ou data inválida.
- `404`: notícia não encontrada.
- `409`: título já cadastrado.

### Deletar notícia

```http
DELETE /api/noticias/:id
```

Retorna `204 No Content` quando a notícia é removida com sucesso.

Erro esperado:

- `404`: notícia não encontrada.

## Rotas De Voluntários

### Criar voluntário

```http
POST /api/voluntarios
Content-Type: application/json
```

```json
{
  "nome": "Nome completo",
  "cpf": "000.000.000-00",
  "email": "email@exemplo.com",
  "telefone": "(00) 00000-0000",
  "idade": 18,
  "profissao": "Estudante",
  "disponibilidade": "manha"
}
```

Disponibilidades aceitas:

- `manha`
- `tarde`
- `noite`
- `finais-de-semana`

Resposta `201`:

```json
{
  "sucesso": true,
  "data": {
    "id": 1,
    "nome": "Nome completo",
    "email": "email@exemplo.com",
    "criado_em": "2026-06-20T12:00:00.000Z"
  }
}
```

Erros esperados:

- `400`: campos obrigatórios, CPF inválido, idade menor que 16 ou disponibilidade inválida.
- `409`: CPF ou e-mail já cadastrado.

### Listar voluntários

```http
GET /api/voluntarios
```

### Buscar voluntário por ID

```http
GET /api/voluntarios/:id
```
