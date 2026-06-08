import React, { useState } from 'react';
import { Card, Form, Button, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export default function ChangePasswordPage({ onBack }) {
  const { state, dispatch } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (currentPassword !== state.user.password) {
      setError('Mật khẩu hiện tại không đúng');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    dispatch({ type: 'CHANGE_PASSWORD', payload: newPassword });
    setShowToast(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Card className="mt-4 mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Header className="d-flex justify-content-between align-items-center bg-warning">
          <h5 className="mb-0">Đổi mật khẩu</h5>
          <Button variant="outline-dark" size="sm" onClick={onBack}>Quay lại</Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu hiện tại</Form.Label>
              <Form.Control type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100 fw-bold">Xác nhận đổi mật khẩu</Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Body className="text-white">Đổi mật khẩu thành công!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
