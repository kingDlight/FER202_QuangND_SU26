import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { state, dispatch } = useAuth();

  if (!state.user) return null;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <div className="h2 mb-3">
          Xin chào, {state.user.name}
        </div>
        <div className="fs-6 mt-2 fw-normal">
          Quyền hạn:{' '}
          <Badge bg={state.user.role === 'admin' ? 'danger' : 'success'}>
            {state.user.role}
          </Badge>
        </div>
        <Button variant="secondary" onClick={handleLogout} className="mt-3">
          Đăng xuất
        </Button>
      </Card.Body>
    </Card>
  );
}
