import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import loginImage from '../assets/login.jpg';

const LoginPage = () => (
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
                  onSubmit={() => {}}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
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
                        />
                        <Form.Label>Ваш ник</Form.Label>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4">
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Пароль"
                          value={values.password}
                          onChange={handleChange}
                          autoComplete="current-password"
                          required
                        />
                        <Form.Label>Пароль</Form.Label>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100"
                      >
                        Войти
                      </Button>

                      <div className="text-center mt-3">
                        <span>Нет аккаунта? </span>

                        <Link to="/signup">
                            Регистрация
                        </Link>
                        </div>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;