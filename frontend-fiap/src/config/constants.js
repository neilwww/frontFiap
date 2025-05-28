// config/constants.js

// Configurações da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
};

// Rotas da aplicação
export const ROUTES = {
  HOME: '/',
  POST_DETAIL: '/post/:id',
  LOGIN: '/login',
  CREATE_POST: '/create-post',
  EDIT_POST: '/edit-post/:id',
  ADMIN: '/admin',
};

// Endpoints da API
export const API_ENDPOINTS = {
  // Autenticação
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  
  // Posts
  POSTS: '/posts',
  POST_BY_ID: (id) => `/posts/${id}`,
  
  // Comentários
  COMMENTS: (postId) => `/posts/${postId}/comments`,
  
  // Upload
  UPLOAD: '/upload',
};

// Configurações de validação
export const VALIDATION_RULES = {
  POST_TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200,
  },
  POST_CONTENT: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 50000,
  },
  POST_DESCRIPTION: {
    MAX_LENGTH: 300,
  },
  COMMENT: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 1000,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
};

// Configurações de UI
export const UI_CONFIG = {
  // Paginação
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 20,
  
  // Debounce
  SEARCH_DEBOUNCE: 500,
  AUTO_SAVE_DEBOUNCE: 2000,
  
  // Timeouts
  TOAST_DURATION: 5000,
  LOADING_DELAY: 200,
  
  // Limites de texto
  PREVIEW_LENGTH: 150,
  TITLE_TRUNCATE: 60,
};

// Mensagens do sistema
export const MESSAGES = {
  SUCCESS: {
    POST_CREATED: 'Post criado com sucesso!',
    POST_UPDATED: 'Post atualizado com sucesso!',
    POST_DELETED: 'Post excluído com sucesso!',
    COMMENT_ADDED: 'Comentário adicionado com sucesso!',
    LOGIN_SUCCESS: 'Login realizado com sucesso!',
    LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro inesperado. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
    POST_NOT_FOUND: 'Post não encontrado.',
    INVALID_CREDENTIALS: 'Email ou senha incorretos.',
    REQUIRED_FIELDS: 'Por favor, preencha todos os campos obrigatórios.',
    TITLE_TOO_SHORT: `Título deve ter pelo menos ${VALIDATION_RULES.POST_TITLE.MIN_LENGTH} caracteres.`,
    TITLE_TOO_LONG: `Título deve ter no máximo ${VALIDATION_RULES.POST_TITLE.MAX_LENGTH} caracteres.`,
    CONTENT_TOO_SHORT: `Conteúdo deve ter pelo menos ${VALIDATION_RULES.POST_CONTENT.MIN_LENGTH} caracteres.`,
    INVALID_EMAIL: 'Por favor, insira um email válido.',
    SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
  },
  LOADING: {
    POSTS: 'Carregando posts...',
    POST: 'Carregando post...',
    CREATING: 'Criando post...',
    UPDATING: 'Atualizando post...',
    DELETING: 'Excluindo post...',
    LOGIN: 'Fazendo login...',
    SAVING: 'Salvando...',
  },
  EMPTY_STATES: {
    NO_POSTS: 'Nenhum post encontrado.',
    NO_RESULTS: 'Nenhum resultado encontrado para sua busca.',
    NO_COMMENTS: 'Ainda não há comentários neste post.',
    FIRST_POST: 'Seja o primeiro a publicar um post!',
  },
  CONFIRMATIONS: {
    DELETE_POST: 'Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.',
    DELETE_COMMENT: 'Tem certeza que deseja excluir este comentário?',
    UNSAVED_CHANGES: 'Você tem alterações não salvas. Deseja sair mesmo assim?',
  },
};

// Configurações de tema
export const THEME_CONFIG = {
  STORAGE_KEY: 'blogposts_theme',
  DEFAULT_THEME: 'light',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
  },
};

// Configurações de localStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'blogposts_theme',
  DRAFT_POST: 'draftPost',
  RECENT_SEARCHES: 'recentSearches',
  USER_PREFERENCES: 'userPreferences',
};

// Status de posts
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

// Tipos de usuário
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  MOCK_API_ENABLED: import.meta.env.DEV || false,
  DEBUG_MODE: import.meta.env.DEV || false,
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
};

// Expressões regulares úteis
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HTML_TAGS: /<[^>]*>?/gm,
  WHITESPACE: /\s+/g,
};

// Configurações de SEO
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Blog Posts - Sistema de Gerenciamento',
  TITLE_SEPARATOR: ' | ',
  DEFAULT_DESCRIPTION: 'Sistema de gerenciamento de posts para professores e estudantes.',
  DEFAULT_KEYWORDS: 'blog, posts, educação, professores, estudantes',
  DEFAULT_IMAGE: '/images/og-image.jpg',
};

// Atalhos de teclado
export const KEYBOARD_SHORTCUTS = {
  SAVE: 'Ctrl+S',
  NEW_POST: 'Ctrl+N',
  SEARCH: 'Ctrl+K',
  HOME: 'Alt+H',
  ADMIN: 'Alt+A',
  LOGOUT: 'Alt+Q',
};

// Configurações de acessibilidade
export const A11Y_CONFIG = {
  SKIP_LINK_TARGET: '#main-content',
  FOCUS_OUTLINE_COLOR: '#4F46E5',
  HIGH_CONTRAST_MODE: false,
  REDUCED_MOTION: false,
};

export default {
  API_CONFIG,
  ROUTES,
  API_ENDPOINTS,
  VALIDATION_RULES,
  UI_CONFIG,
  MESSAGES,
  THEME_CONFIG,
  STORAGE_KEYS,
  POST_STATUS,
  USER_ROLES,
  DEV_CONFIG,
  REGEX_PATTERNS,
  SEO_CONFIG,
  KEYBOARD_SHORTCUTS,
  A11Y_CONFIG,
};