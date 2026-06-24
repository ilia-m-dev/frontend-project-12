import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="shadow-sm navbar navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>

        {auth.user && (
          <Button onClick={handleLogout}>
            Выйти
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;