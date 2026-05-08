# 🐾 Pelu&Cia - Sistema de Adoção de Animais

Bem-vindo ao repositório oficial do projeto **Pelu&Cia**! Este documento orienta a equipe sobre como configurar o ambiente, rodar o projeto e seguir o fluxo de trabalho acadêmico.

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (Versão 18 ou superior) - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **VS Code** (Editor sugerido)

---

## 🚀 Como Rodar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/evyhdev/Pelu-Cia.git](https://github.com/evyhdev/Pelu-Cia.git)


- Entre na pasta do projeto e no terminal do vs code siga a sequência de comandos:
01. npm install
02. npm run dev
Acesse o link que aparecer no terminal (geralmente http://localhost:5173).

**🌳 Fluxo de Trabalho (Branches)**
Para manter a organização, utilizaremos o seguinte padrão de branches:
- main: Versão final e estável (produção).
- developer: Branch de integração. Ninguém sobe código direto aqui.
- Branches Pessoais: Cada integrante deve criar sua branch a partir da developer.

## 🌳 Fluxo de Trabalho (Branches Pre-existentes)

As branches para cada página já foram criadas! Cada integrante deve trabalhar em sua respectiva branch. Antes de iniciar, é fundamental puxar o código da `main` para ter acesso à Header e ao CSS Global.

### Como começar:
```bash
# 1. Atualize sua lista de branches do servidor
git fetch

# 2. Vá para a sua branch (exemplo: pages/adotar)
git checkout pages/adotar

# 3. Puxe o código da main para dentro da sua branch
git pull origin main

# 4. Agora é só codar! Ao terminar:
git add .
git commit -m "feat: descrição da tarefa"
git push origin pages/adotar

📂 Estrutura de Pastas
Plaintext
├── public/              # Imagens e ícones (Caminho: /images ou /icons)
├── src/
│   ├── css/             # Arquivos de estilo (global.css e específicos)
│   ├── pages/           # Páginas internas (adotar.html, etc)
│   └── main.js          # Arquivo principal JS
├── index.html           # Página Home
└── package.json         # Configurações do Vite
