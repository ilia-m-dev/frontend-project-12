import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="shadow-sm navbar navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('appName')}
        </Navbar.Brand>

        {auth.user && (
          <Button onClick={handleLogout}>
            {t('auth.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;