import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Form,
    Button,
    Card,
    Row,
    Col
} from 'react-bootstrap';
import MyModal from './MyModal';

function RegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        // Xóa thông báo lỗi của field tương ứng khi người dùng bắt đầu gõ lại
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // 1. Validate Username
        if (!formData.username.trim()) {
            newErrors.username = 'Username không được để trống!';
        }

        // 2. Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống!';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email không đúng định dạng!';
        }

        // 3. Validate Password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!formData.password) {
            newErrors.password = 'Password không được để trống!';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải từ 6 kí tự, có chữ hoa, thường, số và kí tự đặc biệt!';
        }

        // 4. Validate Confirm Password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password và Confirm Password không khớp!';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); 
        } else {
            setShowModal(true); 
        }
    };

    const handleCancel = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setErrors({});
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Chuyển hướng tới trang PostList sau khi báo thành công
        navigate('/posts');
    };

    return (
        <Container className="py-5" style={{ maxWidth: 650 }}>
            <Card className="shadow-sm registration-card">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4">User Registration</h2>

                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex gap-2 mt-4">
                            <Button type="submit" variant="primary" className="w-100">
                                Register
                            </Button>
                            <Button type="button" variant="outline-secondary" className="w-100" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* Sử dụng MyModal đã tạo */}
            <MyModal 
                show={showModal} 
                onHide={handleCloseModal} 
                title="Đăng ký thành công" 
                content={<p className="mb-0">🎉 Chúc mừng bạn đã đăng ký tài khoản thành công!</p>}
            />
        </Container>
    );
}

export default RegistrationForm;