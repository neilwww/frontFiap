import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext.jsx';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.white : theme.colors.text};
  border: ${({ theme, variant }) => 
    variant === 'outline' ? `1px solid ${theme.colors.border}` : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme, variant }) => 
      variant === 'primary' ? theme.colors.primaryHover : theme.colors.background};
  }
`;

const UserInfo = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-right: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">BlogPosts</Logo>
        
        <NavLinks>
          <NavLink to="/">Posts</NavLink>
          
          {isAuthenticated() ? (
            <>
              <NavLink to="/create-post">Criar Post</NavLink>
              <NavLink to="/admin">Admin</NavLink>
              <UserInfo>Olá, {user?.name}</UserInfo>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => navigate('/login')}>
              Entrar
            </Button>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;