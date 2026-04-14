# CardioAI – Portal de Diagnóstico em Cardiologia

Aplicação front-end interativa que simula a rotina de um portal de diagnóstico em cardiologia. Construída com **React + Vite**, permite gerenciar pacientes e agendamentos de consultas com autenticação simulada e proteção de rotas.

---

## 🎬 Vídeo de Demonstração

> https://www.youtube.com/watch?v=QQLBkdXiM2w
> O vídeo deve estar publicado como "não listado" no YouTube e demonstrar o funcionamento completo da solução.

## ✨ Funcionalidades

- **Autenticação simulada** via Context API, com token JWT simulado persistido no `localStorage` sob a chave `token`
- **Listagem de pacientes** consumindo a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- **Formulário de agendamento** de consultas com validação por Zod e gerenciamento de estado via `useReducer`
- **Dashboard** na página inicial exibindo contagem de pacientes e consultas agendadas
- **Proteção de rotas**: páginas de pacientes e agendamentos só são acessíveis para usuários autenticados
- **Estilização responsiva** com CSS Modules

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React](https://react.dev/) | 19 | Biblioteca principal de UI |
| [Vite](https://vite.dev/) | 7 | Bundler e servidor de desenvolvimento |
| [TypeScript](https://www.typescriptlang.org/) | 6 | Tipagem estática |
| [React Router DOM](https://reactrouter.com/) | 7 | Roteamento da SPA |
| [React Hook Form](https://react-hook-form.com/) | 7 | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | 4 | Validação de esquemas |
| [CSS Modules](https://github.com/css-modules/css-modules) | — | Estilização com escopo local |

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── forms/           #   Formulários (UserForm, AgendamentoForm)
│   ├── NavBar.tsx       #   Barra de navegação
│   ├── ProtectedRoute.tsx  # Proteção de rotas
│   ├── ContagemPacientes.tsx  # Contagem de pacientes (dashboard)
│   └── ListagemAgendamentosComponent.tsx  # Lista de agendamentos
├── contexts/            # Contextos globais (Context API)
│   ├── authContext.tsx  #   Autenticação e sessão do usuário
│   └── agendamentoContext.tsx  # Estado de agendamentos (useReducer)
├── pages/               # Páginas da aplicação
│   ├── Home.jsx         #   Página inicial / dashboard
│   ├── Login.tsx        #   Login
│   ├── Register.tsx     #   Registro
│   ├── ListagemPacientes.tsx  # Listagem de pacientes
│   └── AgendamentoPage.tsx    # Agendamento de consultas
├── schemas/             # Esquemas de validação Zod
│   ├── user.ts
│   ├── paciente.ts
│   └── agentamento.ts
└── services/            # Funções de acesso à API externa
    ├── pacienteService.ts  # Busca de pacientes (JSONPlaceholder /users)
    └── postService.js      # Busca de posts (JSONPlaceholder /posts)
```

---

## 🚀 Como Instalar e Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior (incluso com o Node.js)

### Passo a passo

**1. Clone o repositório:**

```bash
git clone https://github.com/Hinten/simple-dashboard-react.git
cd simple-dashboard-react
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

A aplicação estará disponível em **http://localhost:5173**.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Serve a build de produção localmente |
| `npm run typecheck` | Executa a verificação de tipos do TypeScript |
| `npm run lint` | Executa o ESLint para análise estática do código |

---

## 🔑 Como Usar a Aplicação

1. **Registre-se**: Acesse `/register` e crie uma conta com nome e senha.
2. **Faça login**: Acesse `/login` com as mesmas credenciais.
3. **Dashboard**: Na página inicial (`/`), veja a contagem de pacientes e seus agendamentos.
4. **Pacientes**: Acesse `/listagemPacientes` para ver a lista de pacientes vindos da API.
5. **Agendamentos**: Acesse `/agendamento` para criar e gerenciar consultas.
6. **Logout**: Use o botão de logout na barra de navegação para encerrar a sessão.

> 💡 **Nota:** O login e os agendamentos são simulados — um token JWT simulado é gerado com `btoa` no momento do login e salvo no `localStorage` sob a chave `token`. Os dados são perdidos ao limpar os dados do site.

---

## ✅ Requisitos do Enunciado

| Requisito | Status |
|---|---|
| Autenticação simulada via Context API com persistência no `localStorage` | ✅ Implementado |
| Listagem de pacientes utilizando JSONPlaceholder (API fake) | ✅ Implementado |
| Formulário de agendamento com `useState` e `useReducer` | ✅ Implementado |
| Dashboard com contagem de pacientes e consultas agendadas | ✅ Implementado |
| Proteção de rotas com `AuthContext` | ✅ Implementado |
| Estilização com CSS Modules | ✅ Implementado |
| Pasta `/contexts` | ✅ Presente |
| Pasta `/components` | ✅ Presente |
| Pasta `/pages` | ✅ Presente |
| Pasta `/services` | ✅ Implementado |
| README com instruções de instalação e execução | ✅ Este arquivo |
| Lista com nome e RM dos integrantes | ⚠️ Preencher a tabela acima |
| Vídeo de demonstração no YouTube ("não listado") | ⚠️ Inserir link acima |

### ⚠️ Observações sobre requisitos pendentes

- **Integrantes e vídeo**: Preencha a tabela de integrantes e o link do vídeo nas seções indicadas neste README.
