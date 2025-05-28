// contexts/PostContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost deve ser usado dentro de um PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authenticatedFetch } = useAuth();

  // Buscar todos os posts
  const fetchPosts = useCallback(async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '/api/posts';
      if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar um post específico
  const fetchPostById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/posts/${id}`);
      
      if (!response.ok) {
        throw new Error('Post não encontrado');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar novo post
  const createPost = useCallback(async (postData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authenticatedFetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao criar post');
      }
      
      const newPost = await response.json();
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch]);

  // Atualizar post existente
  const updatePost = useCallback(async (id, postData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authenticatedFetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao atualizar post');
      }
      
      const updatedPost = await response.json();
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? updatedPost : post
        )
      );
      
      return { success: true, post: updatedPost };
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch]);

  // Excluir post
  const deletePost = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authenticatedFetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erro ao excluir post');
      }
      
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch]);

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};