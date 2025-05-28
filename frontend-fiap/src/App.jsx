// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { enableMockApi } from './services/mockApi';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    // Habilitar Mock API no desenvolvimento
    enableMockApi();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <PostProvider>
          <Router>
            <Header />
            <Routes>
              {/* Páginas públicas */}
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/login" element={<Login />} />
              
              {/* Páginas protegidas - apenas para professores autenticados */}
              <Route 
                path="/create-post" 
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-post/:id" 
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect para página principal se rota não existir */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;