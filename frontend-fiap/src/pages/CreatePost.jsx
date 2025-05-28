// pages/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../contexts/PostContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const Container = styled.div`
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

const PreviewButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Preview = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .preview-content {
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    white-space: pre-wrap;
  }
`;

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const { createPost } = usePost();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpar mensagens ao editar
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validações
    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      setLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('Conteúdo é obrigatório');
      setLoading(false);
      return;
    }

    if (formData.title.length > 200) {
      setError('Título deve ter no máximo 200 caracteres');
      setLoading(false);
      return;
    }

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        description: formData.description.trim() || formData.content.substring(0, 150) + '...',
        author: user.name,
      };

      const result = await createPost(postData);

      if (result.success) {
        setSuccess('Post criado com sucesso!');
        setTimeout(() => {
          navigate(`/post/${result.post.id}`);
        }, 1500);
      } else {
        setError(result.error || 'Erro ao criar post');
      }
    } catch (error) {
      setError('Erro inesperado ao criar post');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      content: '',
      description: '',
    });
    setError('');
    setSuccess('');
    setShowPreview(false);
  };

  return (
    <Container>
      <Header>
        <Title>Criar Novo Post</Title>
        <BackButton to="/">Voltar para posts</BackButton>
      </Header>

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
            placeholder="Breve descrição do post (será gerada automaticamente se não preenchida)..."
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
          <PreviewButton 
            type="button"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Ocultar' : 'Mostrar'} Preview
          </PreviewButton>
        </FormGroup>

        {showPreview && formData.content && (
          <Preview>
            <h3>Preview do Conteúdo:</h3>
            <div className="preview-content">
              {formData.content}
            </div>
          </Preview>
        )}

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Limpar
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Post'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CreatePost;