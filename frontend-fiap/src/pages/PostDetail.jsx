// pages/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &::before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const Author = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Date = styled.span``;

const EditButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  p {
    margin-bottom: 1.5rem;
  }

  h2, h3, h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textLight};
  }

  code {
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0.2rem 0.4rem;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9rem;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.background};
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: 1.5rem 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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

const CommentsSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const CommentButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Comment = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1rem;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const CommentText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = new window.Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPostById, loading, error } = usePost();
  const { isAuthenticated, user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setPost(postData);
        setComments(postData.comments || []);
      } catch (error) {
        console.error('Erro ao carregar post:', error);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id, fetchPostById]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !isAuthenticated()) {
      return;
    }

    setSubmittingComment(true);
    
    try {
      // Aqui você faria a chamada para o back-end para salvar o comentário
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          content: newComment,
          author: user.name,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments(prevComments => [...prevComments, comment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          Carregando post...
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container>
        <BackButton to="/">Voltar para posts</BackButton>
        <ErrorMessage>
          {error || 'Post não encontrado'}
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/">Voltar para posts</BackButton>
      
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <Author>Por {post.author}</Author>
          <Date>{formatDate(post.createdAt)}</Date>
          {isAuthenticated() && (
            <EditButton to={`/edit-post/${post.id}`}>
              Editar Post
            </EditButton>
          )}
        </PostMeta>
      </PostHeader>

      <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

      <CommentsSection>
        <CommentsTitle>Comentários ({comments.length})</CommentsTitle>
        
        {isAuthenticated() ? (
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentTextarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deixe seu comentário..."
              required
            />
            <CommentButton type="submit" disabled={submittingComment}>
              {submittingComment ? 'Enviando...' : 'Comentar'}
            </CommentButton>
          </CommentForm>
        ) : (
          <p>
            <Link 
              to="/login" 
              style={{ color: 'var(--primary)', textDecoration: 'underline' }}
            >
              Faça login
            </Link>{' '}
            para comentar.
          </p>
        )}

        {comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentText>{comment.content}</CommentText>
          </Comment>
        ))}
      </CommentsSection>
    </Container>
  );
};

export default PostDetail;