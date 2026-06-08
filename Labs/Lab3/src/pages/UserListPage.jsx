import React from 'react';
import { Card, Table, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import USERS from '../data/users';

export default function UserListPage({ onBack }) {
  const { state } = useAuth();

  if (state.user?.role !== 'admin') {
    return (
      <Card className="mt-4">
        <Card.Body>
          <Button variant="outline-secondary" className="mb-3" onClick={onBack}>Quay lại</Button>
          <Alert variant="danger" className="mb-0">Bạn không có quyền truy cập</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <Card.Header className="d-flex justify-content-between align-items-center bg-info text-white">
        <h5 className="mb-0">Danh sách người dùng</h5>
        <Button variant="outline-light" size="sm" onClick={onBack}>Quay lại Dashboard</Button>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Tên hiển thị</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
