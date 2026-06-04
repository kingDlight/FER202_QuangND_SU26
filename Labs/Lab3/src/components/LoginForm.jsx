import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { findUser } from '../utils/authHelpers';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    // Giả lập xử lý delay để hiển thị Loading Spinner
    setTimeout(() => {
      const user = findUser(username, password);
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }
    }, 500);
  };

  return (
    <Card className="mt-4 mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Header className="bg-primary text-white">Đăng nhập</Card.Header>
      <Card.Body>
        {state.error && <Alert variant="danger">{state.error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={state.isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={state.isLoading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={state.isLoading}>
            {state.isLoading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            )}
            Đăng nhập
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
