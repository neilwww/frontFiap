Blog Posts - Frontend
Sistema de gerenciamento de posts para professores, desenvolvido em React com Vite e Styled Components.

🚀 Funcionalidades
Páginas Públicas
Lista de Posts: Visualização de todos os posts com busca por palavras-chave
Leitura de Post: Visualização completa do post com sistema de comentários
Login: Autenticação para professores
Páginas Protegidas (Apenas Professores Autenticados)
Criação de Posts: Formulário para criar novos posts
Edição de Posts: Editar e excluir posts existentes
Painel Administrativo: Gerenciamento completo de todos os posts
🛠️ Tecnologias Utilizadas
React 18 - Biblioteca principal
Vite - Build tool e servidor de desenvolvimento
React Router DOM - Roteamento
Styled Components - Estilização
Context API - Gerenciamento de estado
ESLint - Linting e qualidade de código
📋 Pré-requisitos
Node.js (versão 16 ou superior)
npm ou yarn
Back-end da aplicação rodando
🔧 Setup Inicial
Clone o repositório
bash
git clone [url-do-repositorio]
cd blog-posts-frontend
Instale as dependências
bash
npm install
# ou
yarn install
Configure as variáveis de ambiente Crie um arquivo .env na raiz do projeto:
env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Blog Posts
Execute o projeto
bash
npm run dev
# ou
yarn dev
A aplicação estará disponível em http://localhost:5173

🏗️ Arquitetura da Aplicação
Estrutura de Pastas
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx
│   └── ProtectedRoute.jsx
├── contexts/           # Contextos React
│   ├── AuthContext.js
│   └── PostContext.js
├── pages/              # Páginas da aplicação
│   ├── PostList.jsx
│   ├── PostDetail.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── AdminPanel.jsx
│   └── Login.jsx
├── styles/             # Estilos globais
│   ├── GlobalStyle.js
│   └── theme.js
├── App.jsx             # Componente principal
└── main.jsx           # Entry point
Gerenciamento de Estado
AuthContext
Função: Gerencia autenticação e autorização
Estados: user, loading
Métodos: login(), logout(), isAuthenticated(), authenticatedFetch()
PostContext
Função: Gerencia operações CRUD de posts
Estados: posts, loading, error
Métodos: fetchPosts(), fetchPostById(), createPost(), updatePost(), deletePost()
Roteamento
Público: /, /post/:id, /login
Protegido: /create-post, /edit-post/:id, /admin
Proteção: Componente ProtectedRoute verifica autenticação
🎨 Sistema de Design
Tema
Cores Principais: Azul (
#4F46E5), Verde (
#10B981)
Tipografia: System fonts (San Francisco, Segoe UI, Roboto)
Breakpoints: Mobile (480px), Tablet (768px), Desktop (1024px)
Componentes Styled
Uso consistente de Styled Components
Props dinâmicas para variações
Responsividade mobile-first
Sistema de cores e espaçamentos padronizado
🔐 Autenticação
Fluxo de Autenticação
Professor faz login com email/senha
Token JWT é armazenado no localStorage
Token é enviado em todas as requisições protegidas
Redirecionamento automático se não autenticado
Credenciais de Demonstração
Email: professor@exemplo.com
Senha: demo123
📡 Integração com Back-End
Endpoints Utilizados
javascript
// Autenticação
POST /api/auth/login

// Posts
GET /api/posts?search={termo}
GET /api/posts/:id
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id

// Comentários (opcional)
POST /api/posts/:id/comments
Headers Padrão
javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}' // Para rotas protegidas
}
📱 Responsividade
Breakpoints
Mobile: < 480px
Tablet: 481px - 768px
Desktop: > 768px
Adaptações Mobile
Menu de navegação responsivo
Cards em coluna única
Formulários otimizados para toque
Botões com tamanho adequado
🧪 Guia de Uso
Para Visitantes
Acesse a página principal para ver todos os posts
Use a barra de busca para filtrar posts
Clique em um post para ler o conteúdo completo
Para Professores
Faça login com suas credenciais
Use "Criar Post" para publicar novo conteúdo
Acesse "Admin" para gerenciar todos os posts
Edite ou exclua posts conforme necessário
Funcionalidades Especiais
Busca em Tempo Real: Filtro automático com debounce
Preview de Conteúdo: Visualização antes de publicar
Confirmação de Exclusão: Proteção contra exclusões acidentais
Breadcrumbs: Navegação clara entre páginas
🔧 Scripts Disponíveis
bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
🐛 Tratamento de Erros
Estados de Loading
Indicadores visuais durante operações
Feedback imediato para ações do usuário
Tratamento de Erros
Mensagens de erro amigáveis
Fallbacks para falhas de rede
Validação de formulários
Casos Edge
Posts sem conteúdo
Usuário não autenticado
Falhas de conectividade
📊 Performance
Otimizações Implementadas
Lazy loading de componentes
Debounce na busca (500ms)
Memoização de contextos
Otimização de re-renders
Métricas Alvo
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
🔮 Funcionalidades Futuras
Próximas Implementações
 Editor de texto rico (WYSIWYG)
 Upload de imagens
 Sistema de categorias
 Notificações push
 Modo escuro
 Compartilhamento social
 Analytics de posts
Melhorias Técnicas
 Testes automatizados (Jest + Testing Library)
 Storybook para componentes
 PWA (Progressive Web App)
 Cache de dados com React Query
 Internacionalização (i18n)
🤝 Contribuição
Fork o projeto
Crie uma branch para sua feature (git checkout -b feature/nova-feature)
Commit suas mudanças (git commit -m 'Adiciona nova feature')
Push para a branch (git push origin feature/nova-feature)
Abra um Pull Request
📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👥 Equipe
Desenvolvido para sistema educacional de gerenciamento de posts.

Última atualização: Dezembro 2024

