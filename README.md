# CherryIT 🍒 React Bulletproof 🛡️ ⚛️

Um modelo(Boilerplate) de projeto React pronto para produção com TypeScript, apresentando uma arquitetura modular baseada em recursos **(Feature-Based Modular Architecture)**.

## 🚀 Tech Stack

- ⚡️ [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- 📦 [pnpm](https://pnpm.io/) - Gerenciador de pacotes rápido e com uso eficiente de espaço em disco
- 🎨 [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- 🔍 [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- 🪝 [Husky](https://typicode.github.io/husky/) para Git hooks
- 📡 [@tanstack/react-query](https://tanstack.com/query/latest) para gerenciamento de dados de API e caches
- 🛣️ [React Router](https://reactrouter.com/) para roteamento
- 📝 [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) para validação de formulário
- 🔄 [Axios](https://axios-http.com/) para requisição de API
- 🎲 [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) Para gerenciamento de estado global
- 🧪 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) Utilitários de teste simples e completos que incentivam boas práticas de teste
- 🧪 [Jest](https://jestjs.io/) Para testes unitários
- 🧪 [Cypress](https://www.cypress.io/) Para testes E2E

## 📁 Estrutura do Projeto

```
src/
|__ assets/   # Ficheiros estáticos como imagens, icones svg, etc...
├── components/   # Componentes compartilhados/comuns
├── config/   # Configuração do aplicativo (i18n.ts, theme.ts, etc..)
├── features/   # Módulos baseados em recursos
│ ├── auth/   # Recurso de autenticação
│ │ ├── api/  # Integração de API
│ │ ├── componentes/
│ │ ├── hooks/
│ │ ├── routes/
│ │ ├── types/
│ │ └── validators/
│ └── usuários/   # Recurso de usuários
├── ganchos /   # Ganchos compartilhados
├── lib/  # Funções utilitárias
├── providers/  # Provedores de contexto
├── routes/   # Configurações de rota global
├── services/   # Serviços de API
├── types/  # Tipos TypeScript compartilhados e os enums
|__ constants/   # Para valores constantes que são usados globalmente no aplicativo (como configurações fixas, limites de tamanho de ficheiros, limites de validação, etc.).
|__ data/    # Dados estáticos ou pré-definidos usados no app, como listas de países, categorias, etc.
|__ mocks/   # Arquivos de mock de dados para testes ou desenvolvimento, frequentemente usados para simular respostas da API.
|
|__ test/   # Para realização dos testes
| |__  unit/  # Testes de unidades para as funcionalidades e componentes do app.
| |__  integration/   # Testes que verificam a integração entre diferentes partes do sistema.
| |__  e2e/   # Testes que simulam o fluxo completo do usuário e verificam se o aplicativo funciona como esperado.
| |__ components/   # Testes específicos para componentes, utilizando bibliotecas como react-testing-library ou enzyme
└── validators/ # Validações compartilhados
```

## 🛠️ Guia de configuração

### 1. Criação de Projeto

```bash
# Criar um novo projeto
pnpm create vite nome-do-app --template react-ts

# Navegar até o projeto
cd nome-do-app

# Instalar dependências
pnpm i
```

### 2. ESLint Setup

```bash
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import
```

### 3. Prettier Setup

```bash
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier

# Crie o arquivo .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### 4. Husky & Commitlint Setup

```bash

# 1 - Opção
pnpm add -D husky lint-staged @commitlint/{cli,config-conventional}

# OU

# 2 - Opção
pnpm add -D husky lint-staged  @commitlint/config-conventional @commitlint/cli

# Inicializar Husky
pnpm exec husky init

# Criar arquivo de configuração do commitlint
echo "module.exports = { extends: ['@commitlint/config-conventional'] }" > commitlint.config.js

# Alternativa CommonJS commitlint.config.js
export default {
  extends: ["@commitlint/config-conventional"],
};

# Alternativa ES Module commitlint.config.cjs
module.exports = {extends: ['@commitlint/config-conventional']}

# 📄 Adicione no package.json:
"lint-staged": {
  "**/*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "**/*.{json,md,css,scss}": [
    "prettier --write"
  ]
}

# Criar o Hook pre-commit
mkdir -p .husky
touch .husky/pre-commit
chmod +x .husky/pre-commit

# 📄 Conteúdo do .husky/pre-commit:
#!/bin/sh
pnpm exec lint-staged

# Criar o Hook commit-msg
touch .husky/commit-msg
chmod +x .husky/commit-msg

#📄 Conteúdo do .husky/commit-msg:
#!/bin/sh
pnpm exec commitlint --edit "$1"

# Testar a Configuração
git add .
git commit -m "feat: teste de husky"
```

### 5. Padrões de Commits

#### Exemplos de mensagens de commit válidas:

git commit -m "feat: adiciona novo componente de botão"
git commit -m "fix: corrige bug no formulário de login"
git commit -m "docs: atualiza README"
git commit -m "style: ajusta espaçamento do header"
git commit -m "refactor: melhora performance da listagem"
git commit -m "test: adiciona testes para o componente Card"
git commit -m "chore: atualiza dependências"

#### Tipos de commit permitidos:

- build: Mudanças no sistema de build ou dependências externas
- chore: Mudanças em arquivos de configuração, etc
- ci: Mudanças nos arquivos de CI
- docs: Mudanças apenas na documentação
- feat: Adição de nova funcionalidade
- fix: Correção de bug
- perf: Mudanças relacionadas a performance
- refactor: Refatoração de código
- revert: Reverte um commit anterior
- style: Mudanças que não afetam o significado do código
- test: Adição ou correção de testes

### 6. Tailwind & shadcn/ui Setup

```bash
# Instalar Tailwind
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p

# Instalar shadcn/ui
pnpm dlx shadcn-ui@latest init
```

### 7. React Query Setup

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

### 8. React Router Setup

```bash
pnpm add react-router-dom
```

### 9. Form Validation Setup

```bash
pnpm add react-hook-form @hookform/resolvers zod
```

### 10. API Setup

```bash
pnpm add axios
```

## 🔒 Autenticação

O projeto inclui um sistema de autenticação completo com:

- Funcionalidades de Login/Logout
- Rotas protegidas
- Authentication context
- Gerenciamento de Token
- Refresh Token Automático
- Persistência de sessões

## 🚦 Tipos de Rota

- Rotas Públicas: Acessíveis a todos os usuários
- Rotas Privadas: Requerem autenticação
- Rotas Não Autorizadas: Para usuários autenticados sem permissões adequadas
- Página Não Encontrada: Manipulador da página 404

## 📝 Validação de Formulários

Os formulários são validados usando esquemas Zod e React Hook Form:

```typescript
// Exemplo de esquema de validação
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

## 🔄 Integração com API

As chamadas de API são organizadas usando React Query e Axios:

```typescript
// Example API hook
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
  });
};
```

## 🎨 Suporte a Tema

O projeto inclui uma implementação completa de modo escuro utilizando Tailwind CSS e shadcn/ui.

## 📚 Diretrizes de Desenvolvimento

1. Siga a Arquitetura Modular Baseada em Funcionalidades **(Feature-Based Modular Architecture)**
2. Escreva código limpo e fácil de manter
3. Adicione os tipos adequados em TypeScript
4. Inclua testes unitários para funcionalidades críticas
5. Siga as regras do ESLint e Prettier
6. Use mensagens de commit Git adequadas

## 🚀 Começando

1. Clone o repositório
2. Instale as dependências: `pnpm install`
3. Inicie o servidor de desenvolvimento: `pnpm dev`
4. Construa para produção: `pnpm build`

## 🚪 Acesso

##### Admin

email: admin@example.com
password: password123

##### Gestor:

email: manager@example.com
password: password123

##### Usuário:

email: user@example.com
password: password123

## 📄 Licença

[MIT](/LICENSE)
