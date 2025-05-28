// pages/PostList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../contexts/PostContext';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px); /* Subtrair altura do header */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Author = styled.span`
  font-weight: 500;
`;

const Date = styled.span``;

const PostDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    // Usar window.Date explicitamente para evitar conflitos
    const date = new window.Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error, 'Data recebida:', dateString);
    return 'Data inválida';
  }
};

const PostList = () => {
  const { posts, loading, error, fetchPosts } = usePost();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchPosts(searchTerm);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, fetchPosts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading && posts.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          Carregando posts...
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Blog Posts</Title>
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar posts por título, autor ou conteúdo..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      {error && (
        <ErrorMessage>
          Erro ao carregar posts: {error}
        </ErrorMessage>
      )}

      {posts.length === 0 && !loading ? (
        <EmptyState>
          <EmptyTitle>Nenhum post encontrado</EmptyTitle>
          <p>
            {searchTerm 
              ? 'Tente ajustar sua busca ou limpar o filtro.'
              : 'Ainda não há posts publicados.'
            }
          </p>
        </EmptyState>
      ) : (
        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post.id} to={`/post/${post.id}`}>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                <Author>Por {post.author}</Author>
                <Date>{formatDate(post.createdAt)}</Date>
              </PostMeta>
              <PostDescription>
                {post.description || post.content?.substring(0, 150) + '...'}
              </PostDescription>
            </PostCard>
          ))}
        </PostGrid>
      )}
    </Container>
  );
};

export default PostList;