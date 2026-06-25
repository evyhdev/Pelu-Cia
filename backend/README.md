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
DB_PORT=5434
DB_NAME=pelucia
DB_USER=postgres
DB_PASSWORD=postgres
ADMIN_EMAIL=admin@pelucia.com
ADMIN_PASSWORD=admin123
ADMIN_TOKEN_SECRET=pelucia-dev-secret
VITE_API_BASE_URL=http://localhost:3000
```

Ao iniciar o backend, as tabelas `voluntarios`, `noticias`, `contas_prestacao`, `configuracoes_doacao` e `mensagens_contato` são criadas se ainda não existirem.
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

## Rotas De Autenticação

### Login administrativo

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@pelucia.com",
  "senha": "admin123"
}
```

Resposta `200`: retorna o token usado nas rotas administrativas.

Erros esperados:

- `401`: credenciais inválidas.

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

### Criar notícia

```http
POST /api/noticias
Authorization: Bearer token-admin
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
- `401`: token administrativo ausente ou inválido.
- `409`: título já cadastrado.

### Deletar notícia

```http
DELETE /api/noticias/:id
Authorization: Bearer token-admin
```

Retorna `204 No Content` quando a notícia é removida com sucesso.

Erro esperado:

- `401`: token administrativo ausente ou inválido.
- `404`: notícia não encontrada.

## Rotas De Contato

### Criar mensagem

```http
POST /api/contato
Content-Type: application/json
```

```json
{
  "nome": "Nome completo",
  "email": "email@exemplo.com",
  "mensagem": "Mensagem enviada pelo formulário."
}
```

Resposta `201`: retorna a mensagem salva.

Erros esperados:

- `400`: campos obrigatórios ausentes ou e-mail inválido.

### Listar mensagens

```http
GET /api/contato
Authorization: Bearer token-admin
```

Resposta `200`: retorna as mensagens recebidas em ordem decrescente de criação.

Erro esperado:

- `401`: token administrativo ausente ou inválido.

### Marcar mensagem como lida

```http
PATCH /api/contato/:id/lida
Authorization: Bearer token-admin
```

Resposta `200`: retorna a mensagem atualizada com `lida: true`.

Erros esperados:

- `400`: ID inválido.
- `401`: token administrativo ausente ou inválido.
- `404`: mensagem não encontrada.

### Deletar mensagem

```http
DELETE /api/contato/:id
Authorization: Bearer token-admin
```

Retorna `204 No Content` quando a mensagem é removida com sucesso.

Erros esperados:

- `400`: ID inválido.
- `401`: token administrativo ausente ou inválido.
- `404`: mensagem não encontrada.

## Rotas De Voluntários

### Criar voluntário

```http
POST /api/voluntarios
Content-Type: application/json
```

```json
{
  "nome": "Nome completo",
  "email": "email@exemplo.com",
  "telefone": "(00) 00000-0000",
  "idade": 18,
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

- `400`: campos obrigatórios, e-mail inválido, idade menor que 16 ou disponibilidade inválida.
- `409`: e-mail já cadastrado.

### Listar voluntários

```http
GET /api/voluntarios
Authorization: Bearer token-admin
```

Resposta `200`: retorna os voluntários cadastrados em ordem decrescente de criação.

Erro esperado:

- `401`: token administrativo ausente ou inválido.

### Criar voluntário pelo admin

```http
POST /api/voluntarios/admin
Authorization: Bearer token-admin
Content-Type: application/json
```

Usa o mesmo corpo e as mesmas validações de `POST /api/voluntarios`.

## Rotas De Prestação De Contas

### Listar contas

```http
GET /api/contas
```

Resposta `200`: retorna as movimentações financeiras em ordem decrescente de data.

### Criar conta

```http
POST /api/contas
Authorization: Bearer token-admin
Content-Type: application/json
```

```json
{
  "tipo": "entrada",
  "descricao": "Doação recebida",
  "valor": 100.5,
  "data": "2026-06-20"
}
```

Erros esperados:

- `400`: tipo, descrição, valor ou data inválidos.
- `401`: token administrativo ausente ou inválido.

### Deletar conta

```http
DELETE /api/contas/:id
Authorization: Bearer token-admin
```

Erros esperados:

- `401`: token administrativo ausente ou inválido.
- `404`: conta não encontrada.

## Rotas De Doações

### Obter dados de doação

```http
GET /api/doacoes
```

Resposta `200`: retorna chave PIX, favorecido, banco, agência, conta, instituição e observação de transferência.

### Salvar dados de doação

```http
PUT /api/doacoes
Authorization: Bearer token-admin
Content-Type: application/json
```

```json
{
  "pixChave": "pix@exemplo.com",
  "pixFavorecido": "Pelu&Cia",
  "banco": "Banco Exemplo",
  "agencia": "0001",
  "conta": "12345-6",
  "instituicao": "Projeto Pelu&Cia",
  "observacaoTransferencia": "Envie o comprovante para confirmação."
}
```

Erros esperados:

- `400`: campos obrigatórios ausentes.
- `401`: token administrativo ausente ou inválido.
