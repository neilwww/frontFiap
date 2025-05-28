// pages/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../contexts/PostContext';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
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

const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: ${theme.colors.textLight};
          border: 1px solid ${theme.colors.border};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background};
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.error};
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border: none;
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 0.25rem;
`;

const PostInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 400px;
  width: 90%;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.textLight};
  }
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

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPostById, updatePost, deletePost, loading } = usePost();

  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const postData = await fetchPostById(id);
      setPost(postData);
      setFormData({
        title: postData.title,
        content: postData.content,
        description: postData.description || '',
      });
    } catch (error) {
      setError('Erro ao carregar post para edição');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');

    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      setFormLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('Conteúdo é obrigatório');
      setFormLoading(false);
      return;
    }

    if (formData.title.length > 200) {
      setError('Título deve ter no máximo 200 caracteres');
      setFormLoading(false);
      return;
    }

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        description: formData.description.trim() || formData.content.substring(0, 150) + '...',
      };

      const result = await updatePost(id, postData);

      if (result.success) {
        setSuccess('Post atualizado com sucesso!');
        setTimeout(() => {
          navigate(`/post/${id}`);
        }, 1500);
      } else {
        setError(result.error || 'Erro ao atualizar post');
      }
    } catch (error) {
      setError('Erro inesperado ao atualizar post');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deletePost(id);
      
      if (result.success) {
        navigate('/', { 
          state: { message: 'Post excluído com sucesso!' } 
        });
      } else {
        setError(result.error || 'Erro ao excluir post');
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      setError('Erro inesperado ao excluir post');
      setShowDeleteConfirm(false);
    }
  };

  if (loading && !post) {
    return (
      <Container>
        <LoadingContainer>
          Carregando post...
        </LoadingContainer>
      </Container>
    );
  }

  if (error && !post) {
    return (
      <Container>
        <BackButton to="/">Voltar para posts</BackButton>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Editar Post</Title>
        <BackButton to={`/post/${id}`}>Voltar para post</BackButton>
      </Header>

      {post && (
        <PostInfo>
          <strong>Post criado em:</strong> {formatDate(post.createdAt)} por {post.author}
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <><br /><strong>Última atualização:</strong> {formatDate(post.updatedAt)}</>
          )}
        </PostInfo>
      )}

      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FormGroup>
          <Label htmlFor="title">Título *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o título do post..."
            maxLength={200}
            required
          />
          <CharCount>{formData.title.length}/200</CharCount>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descrição (opcional)</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Breve descrição do post..."
            maxLength={300}
          />
          <CharCount>{formData.description.length}/300</CharCount>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Conteúdo *</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Escreva o conteúdo do post aqui..."
            required
          />
        </FormGroup>

        <ButtonGroup>
          <Button 
            type="button" 
            variant="danger" 
            onClick={() => setShowDeleteConfirm(true)}
          >
            Excluir Post
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate(`/post/${id}`)}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={formLoading}>
            {formLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </ButtonGroup>
      </Form>

      {showDeleteConfirm && (
        <ConfirmDialog>
          <ConfirmContent>
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir este post? 
              Esta ação não pode ser desfeita.
            </p>
            <ButtonGroup>
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </Button>
            </ButtonGroup>
          </ConfirmContent>
        </ConfirmDialog>
      )}
    </Container>
  );
};

export default EditPost;