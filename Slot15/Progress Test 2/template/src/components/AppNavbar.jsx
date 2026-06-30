import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={about.logo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt={about.appName}
          />
          {about.appName}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {user && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/add">Add Restaurant</Nav.Link>
                <Nav.Link as={Link} to="/categories">Manage Categories</Nav.Link>
              </Nav>
              <Nav className="align-items-center">
                <Navbar.Text className="me-3 text-white fw-bold">
                  {user.fullName} <Badge bg="secondary" className="ms-1">{user.role}</Badge>
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
