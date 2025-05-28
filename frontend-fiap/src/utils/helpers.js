// utils/helpers.js

/**
 * Formata uma data para exibição em português brasileiro
 * @param {string|Date} dateString - Data para formatar
 * @param {Object} options - Opções de formatação
 * @returns {string} Data formatada ou mensagem de erro
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    
    return date.toLocaleDateString('pt-BR', formatOptions);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma data com hora
 * @param {string|Date} dateString - Data para formatar
 * @returns {string} Data e hora formatadas
 */
export const formatDateTime = (dateString) => {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formata uma data curta (dd/mm/yyyy)
 * @param {string|Date} dateString - Data para formatar
 * @returns {string} Data formatada
 */
export const formatShortDate = (dateString) => {
  return formatDate(dateString, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Trunca um texto para um número específico de caracteres
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Número máximo de caracteres
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Remove tags HTML de um texto
 * @param {string} html - HTML para limpar
 * @returns {string} Texto sem tags HTML
 */
export const stripHtml = (html) => {
  if (!html || typeof html !== 'string') return '';
  
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

/**
 * Gera um slug a partir de um título
 * @param {string} title - Título para converter
 * @returns {string} Slug gerado
 */
export const generateSlug = (title) => {
  if (!title || typeof title !== 'string') return '';
  
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim('-'); // Remove hífens das bordas
};

/**
 * Valida um email
 * @param {string} email - Email para validar
 * @returns {boolean} Se o email é válido
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce para otimizar chamadas de função
 * @param {Function} func - Função para executar
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função com debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Calcula tempo relativo (ex: "2 horas atrás")
 * @param {string|Date} dateString - Data para calcular
 * @returns {string} Tempo relativo
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Agora mesmo';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutos atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas atrás`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} meses atrás`;
    
    return `${Math.floor(diffInSeconds / 31536000)} anos atrás`;
  } catch (error) {
    return 'Data inválida';
  }
};

/**
 * Copia texto para a área de transferência
 * @param {string} text - Texto para copiar
 * @returns {Promise<boolean>} Se a cópia foi bem-sucedida
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Calcula tempo de leitura estimado
 * @param {string} text - Texto para calcular
 * @param {number} wordsPerMinute - Palavras por minuto (padrão: 200)
 * @returns {number} Tempo em minutos
 */
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  if (!text || typeof text !== 'string') return 0;
  
  const words = stripHtml(text).split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return Math.max(1, minutes); // Mínimo de 1 minuto
};

/**
 * Gera uma cor baseada em uma string (útil para avatars)
 * @param {string} str - String para gerar cor
 * @returns {string} Cor em hexadecimal
 */
export const generateColorFromString = (str) => {
  if (!str) return '#6B7280';
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - color.length) + color;
};