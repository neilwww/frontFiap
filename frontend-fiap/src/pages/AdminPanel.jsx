// pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../contexts/PostContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const CreateButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &::before {
    content: '+ ';
  }
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableTitle = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.background};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
`;

const PostTitle = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  transition: color 0.2s;
  display: block;
  margin-bottom: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PostMeta = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ActionButton = styled(Link)`
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'edit':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          
          &:hover {
            background-color: ${theme.colors.primaryHover};
          }
        `;
      case 'view':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          
          &:hover {
            background-color: #059669;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
        `;
    }
  }}
`;

const DeleteButton = styled.button`
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'danger':
        return `
          background-color: ${theme.colors.error};
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #dc2626;
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
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

const AdminPanel = () => {
  const { posts, fetchPosts, deletePost, loading, error } = usePost();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeleteClick = (post) => {
    setDeleteConfirm(post);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    setDeleting(true);
    try {
      const result = await deletePost(deleteConfirm.id);
      if (result.success) {
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Erro ao excluir post:', error);
    } finally {
      setDeleting(false);
    }
  };

  const stats = {
    totalPosts: posts.length,
    publishedToday: posts.filter(post => {
      const today = new Date().toDateString();
      const postDate = new Date(post.createdAt).toDateString();
      return today === postDate;
    }).length,
    thisMonth: posts.filter(post => {
      const now = new Date();
      const postDate = new Date(post.createdAt);
      return postDate.getMonth() === now.getMonth() && 
             postDate.getFullYear() === now.getFullYear();
    }).length,
  };

  if (loading && posts.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          Carregando painel administrativo...
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Painel Administrativo</Title>
        <CreateButton to="/create-post">
          Novo Post
        </CreateButton>
      </Header>

      <StatsCards>
        <StatCard>
          <StatNumber>{stats.totalPosts}</StatNumber>
          <StatLabel>Total de Posts</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.publishedToday}</StatNumber>
          <StatLabel>Publicados Hoje</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.thisMonth}</StatNumber>
          <StatLabel>Este Mês</StatLabel>
        </StatCard>
      </StatsCards>

      {error && <ErrorMessage>Erro: {error}</ErrorMessage>}

      <TableContainer>
        <TableTitle>
          Gerenciar Posts ({posts.length})
        </TableTitle>

        {posts.length === 0 ? (
          <EmptyState>
            <h3>Nenhum post encontrado</h3>
            <p>Comece criando seu primeiro post!</p>
          </EmptyState>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Post</TableHeader>
                <TableHeader>Autor</TableHeader>
                <TableHeader>Data</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <PostTitle to={`/post/${post.id}`}>
                      {post.title}
                    </PostTitle>
                    <PostMeta>
                      {post.description?.substring(0, 100) || 
                       post.content?.substring(0, 100)}...
                    </PostMeta>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton to={`/post/${post.id}`} variant="view">
                        Ver
                      </ActionButton>
                      <ActionButton to={`/edit-post/${post.id}`} variant="edit">
                        Editar
                      </ActionButton>
                      <DeleteButton onClick={() => handleDeleteClick(post)}>
                        Excluir
                      </DeleteButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>

      {deleteConfirm && (
        <ConfirmDialog>
          <ConfirmContent>
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir o post 
              "<strong>{deleteConfirm.title}</strong>"?
              <br />
              Esta ação não pode ser desfeita.
            </p>
            <ButtonGroup>
              <Button 
                variant="secondary" 
                onClick={() => setDeleteConfirm(null)}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger" 
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Excluindo...' : 'Excluir'}
              </Button>
            </ButtonGroup>
          </ConfirmContent>
        </ConfirmDialog>
      )}
    </Container>
  );
};

export default AdminPanel;