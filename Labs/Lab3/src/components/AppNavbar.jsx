import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export default function AppNavbar() {
  const { state, dispatch } = useAuth();

  if (!state.user) return null;

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand>Lab 3 App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            Xin chào, {state.user.name}
          </Navbar.Text>
          <Button 
            variant="outline-danger" 
            onClick={() => dispatch({ type: 'LOGOUT' })}
          >
            Đăng xuất
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
