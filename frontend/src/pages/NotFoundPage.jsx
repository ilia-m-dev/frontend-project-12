import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFoundPage = () => (
  <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
    <h1 className="mb-4">404</h1>

    <p>
      Страница не найдена.
    </p>

    <Link to="/">
      На главную
    </Link>
  </Container>
);

export default NotFoundPage;