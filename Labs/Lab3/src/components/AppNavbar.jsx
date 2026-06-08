import React, { useContext } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';

export default function AppNavbar({ onNavigate }) {
  const { state, dispatch } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!state.user) return null;

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'} expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => onNavigate && onNavigate('dashboard')} style={{cursor: 'pointer'}}>
          Lab 3 App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {state.user.role === 'admin' && (
              <Nav.Link onClick={() => onNavigate && onNavigate('users')}>Quản lý User</Nav.Link>
            )}
            <Nav.Link onClick={() => onNavigate && onNavigate('change-password')}>Đổi mật khẩu</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Navbar.Text className="me-3">
              Xin chào, {state.user.name}
            </Navbar.Text>
            <Button variant="outline-secondary" size="sm" className="me-3" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Đăng xuất
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
