import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-4">404</h1>

      <p>
        {t('notFound.title')}
      </p>

      <Link to="/">
        {t('notFound.link')}
      </Link>
    </Container>
  );
};

export default NotFoundPage;
