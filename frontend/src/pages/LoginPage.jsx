import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.jpg';
import useAuth from '../hooks/useAuth.js';
import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async (values, { setSubmitting }) => {
    setAuthFailed(false);

    try {
      const response = await axios.post('/api/v1/login', values);

      auth.logIn(response.data);
      navigate('/', { replace: true });
    } catch {
      setAuthFailed(true);
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Row>
                <Col
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  <img
                    src={loginImage}
                    alt={t('auth.login')}
                    className="rounded-circle"
                  />
                </Col>

                <Col md={6} className="mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{t('auth.login')}</h1>

                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                    }}
                    onSubmit={handleLogin}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      isSubmitting,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            id="username"
                            name="username"
                            type="text"
                            placeholder={t('auth.username')}
                            value={values.username}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                            isInvalid={authFailed}
                          />
                          <Form.Label htmlFor="username">{t('auth.username')}</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            id="password"
                            name="password"
                            type="password"
                            placeholder={t('auth.password')}
                            value={values.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            isInvalid={authFailed}
                          />
                          <Form.Label htmlFor="password">{t('auth.password')}</Form.Label>

                          <Form.Control.Feedback type="invalid">
                            {t('auth.authFailed')}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="w-100 mb-3"
                          disabled={isSubmitting}
                        >
                          {t('auth.login')}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('auth.noAccount')} </span>
                <Link to="/signup">{t('auth.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
