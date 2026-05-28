import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function AppNavbar() {
    return (
        <Navbar bg="primary" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    React Blog
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Trang chủ
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/posts">
                            Bài viết
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/about">
                            Giới thiệu
                        </Nav.Link>
                        
                        {/* Nút dẫn đến trang Đăng ký */}
                        <Nav.Link as={NavLink} to="/register" className="register-btn ms-md-3 mt-2 mt-md-0">
                            Đăng ký
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;