import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.jpg';
import useAuth from '../hooks/useAuth.js';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

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
                    alt="Войти"
                    className="rounded-circle"
                  />
                </Col>

                <Col md={6} className="mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>

                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      setAuthFailed(false);

                      try {
                        const response = await axios.post('/api/v1/login', values);

                        auth.logIn(response.data);
                        navigate('/', { replace: true });
                      } catch {
                        setAuthFailed(true);
                        setSubmitting(false);
                      }
                    }}
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
                            name="username"
                            type="text"
                            placeholder="Ваш ник"
                            value={values.username}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                            isInvalid={authFailed}
                          />
                          <Form.Label>Ваш ник</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            value={values.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            isInvalid={authFailed}
                          />
                          <Form.Label>Пароль</Form.Label>

                          <Form.Control.Feedback type="invalid">
                            Неверные имя пользователя или пароль
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="w-100 mb-3"
                          disabled={isSubmitting}
                        >
                          Войти
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;