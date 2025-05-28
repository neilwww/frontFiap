// services/mockApi.js
import { mockPosts } from './mockData';

// Simular delay de rede
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Simular localStorage como "banco de dados"
const getStoredPosts = () => {
  try {
    const stored = localStorage.getItem('mockPosts');
    return stored ? JSON.parse(stored) : mockPosts;
  } catch {
    return mockPosts;
  }
};

const setStoredPosts = (posts) => {
  localStorage.setItem('mockPosts', JSON.stringify(posts));
};

const getStoredComments = (postId) => {
  try {
    const stored = localStorage.getItem(`mockComments_${postId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setStoredComments = (postId, comments) => {
  localStorage.setItem(`mockComments_${postId}`, JSON.stringify(comments));
};

// Mock API Service
export const mockApiService = {
  // Autenticação
  auth: {
    login: async (email, password) => {
      await delay(800);
      
      // Credenciais válidas
      const validCredentials = [
        { email: 'professor@exemplo.com', password: 'demo123', name: 'Prof. João Silva', id: '1' },
        { email: 'admin@exemplo.com', password: 'admin123', name: 'Admin Sistema', id: '2' },
        { email: 'maria@exemplo.com', password: '123456', name: 'Profa. Maria Santos', id: '3' }
      ];

      const user = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (user) {
        const token = `mock_token_${user.id}_${Date.now()}`;
        return {
          success: true,
          data: {
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          }
        };
      } else {
        throw new Error('Credenciais inválidas');
      }
    }
  },

  // Posts
  posts: {
    getAll: async (searchTerm = '') => {
      await delay(300);
      
      let posts = getStoredPosts();
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
        );
      }
      
      // Ordenar por data de criação (mais recentes primeiro)
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getById: async (id) => {
      await delay(400);
      
      const posts = getStoredPosts();
      const post = posts.find(p => p.id === id);
      
      if (!post) {
        throw new Error('Post não encontrado');
      }

      // Adicionar comentários ao post
      const comments = getStoredComments(id);
      return { ...post, comments };
    },

    create: async (postData) => {
      await delay(600);
      
      const posts = getStoredPosts();
      const newPost = {
        id: Date.now().toString(),
        ...postData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedPosts = [newPost, ...posts];
      setStoredPosts(updatedPosts);
      
      return newPost;
    },

    update: async (id, postData) => {
      await delay(500);
      
      const posts = getStoredPosts();
      const postIndex = posts.findIndex(p => p.id === id);
      
      if (postIndex === -1) {
        throw new Error('Post não encontrado');
      }
      
      const updatedPost = {
        ...posts[postIndex],
        ...postData,
        updatedAt: new Date().toISOString()
      };
      
      posts[postIndex] = updatedPost;
      setStoredPosts(posts);
      
      return updatedPost;
    },

    delete: async (id) => {
      await delay(400);
      
      const posts = getStoredPosts();
      const updatedPosts = posts.filter(p => p.id !== id);
      
      if (posts.length === updatedPosts.length) {
        throw new Error('Post não encontrado');
      }
      
      setStoredPosts(updatedPosts);
      
      // Remover comentários do post excluído
      localStorage.removeItem(`mockComments_${id}`);
      
      return { success: true };
    }
  },

  // Comentários
  comments: {
    create: async (postId, commentData) => {
      await delay(300);
      
      const comments = getStoredComments(postId);
      const newComment = {
        id: Date.now().toString(),
        postId,
        ...commentData,
        createdAt: new Date().toISOString()
      };
      
      const updatedComments = [...comments, newComment];
      setStoredComments(postId, updatedComments);
      
      return newComment;
    },

    getByPostId: async (postId) => {
      await delay(200);
      return getStoredComments(postId);
    }
  }
};

// Simular fetch API
export const mockFetch = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const method = options.method || 'GET';
      const body = options.body ? JSON.parse(options.body) : null;
      
      console.log(`🎭 Mock API: ${method} ${url}`, body ? { body } : '');
      
      // Simular verificação de token para rotas protegidas
      const isProtectedRoute = (
        (url.includes('/api/posts') && ['POST', 'PUT', 'DELETE'].includes(method)) ||
        (url.includes('/api/posts/') && ['PUT', 'DELETE'].includes(method)) ||
        (url.includes('/comments') && method === 'POST')
      );
      
      if (isProtectedRoute) {
        const authHeader = options.headers?.['Authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer mock_token_')) {
          return resolve({
            ok: false,
            status: 401,
            json: async () => ({ error: 'Token inválido ou expirado' })
          });
        }
      }

      let result;

      // Roteamento das chamadas
      if (url.includes('/api/auth/login') && method === 'POST') {
        result = await mockApiService.auth.login(body.email, body.password);
        
      } else if (url.match(/\/api\/posts\/\d+$/) && method === 'GET') {
        // GET /api/posts/:id
        const postId = url.split('/').pop();
        result = await mockApiService.posts.getById(postId);
        
      } else if (url.includes('/api/posts') && method === 'GET') {
        // GET /api/posts?search=...
        const urlObj = new URL(url, 'http://localhost');
        const searchTerm = urlObj.searchParams.get('search') || '';
        result = await mockApiService.posts.getAll(searchTerm);
        
      } else if (url.includes('/api/posts') && method === 'POST') {
        // POST /api/posts
        result = await mockApiService.posts.create(body);
        
      } else if (url.match(/\/api\/posts\/\d+$/) && method === 'PUT') {
        // PUT /api/posts/:id
        const postId = url.split('/').pop();
        result = await mockApiService.posts.update(postId, body);
        
      } else if (url.match(/\/api\/posts\/\d+$/) && method === 'DELETE') {
        // DELETE /api/posts/:id
        const postId = url.split('/').pop();
        result = await mockApiService.posts.delete(postId);
        
      } else if (url.match(/\/api\/posts\/\d+\/comments$/) && method === 'POST') {
        // POST /api/posts/:id/comments
        const pathParts = url.split('/');
        const postId = pathParts[pathParts.indexOf('posts') + 1];
        result = await mockApiService.comments.create(postId, body);
        
      } else {
        console.error('🎭 Mock API: Rota não encontrada:', method, url);
        throw new Error(`Rota não encontrada: ${method} ${url}`);
      }

      console.log('🎭 Mock API: Resposta:', result);

      resolve({
        ok: true,
        status: 200,
        json: async () => result.data || result
      });

    } catch (error) {
      console.error('🎭 Mock API: Erro:', error);
      
      const status = error.message.includes('não encontrado') ? 404 : 
                    error.message.includes('inválid') ? 401 : 500;
      
      resolve({
        ok: false,
        status,
        json: async () => ({ error: error.message })
      });
    }
  });
};

// Substituir fetch global por mockFetch
export const enableMockApi = () => {
  window.originalFetch = window.fetch;
  window.fetch = mockFetch;
  console.log('🎭 Mock API habilitada! Usando dados fictícios.');
};

export const disableMockApi = () => {
  if (window.originalFetch) {
    window.fetch = window.originalFetch;
    console.log('🌐 Mock API desabilitada! Usando API real.');
  }
};