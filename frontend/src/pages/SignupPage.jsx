import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signupFailed, setSignupFailed] = useState(false);
  const { t } = useTranslation();

  const validationSchema = yup.object({
    username: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.nameLength'))
      .max(20, t('validation.nameLength')),
    password: yup
      .string()
      .required(t('validation.required'))
      .min(6, t('validation.passwordLength')),
    confirmPassword: yup
      .string()
      .required(t('validation.required'))
      .oneOf([yup.ref('password')], t('validation.passwordsMustMatch')),
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">{t('auth.signup')}</h1>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSignupFailed(false);

                  try {
                    const response = await axios.post('/api/v1/signup', {
                      username: values.username.trim(),
                      password: values.password,
                    });

                    auth.logIn(response.data);
                    navigate('/', { replace: true });
                  } catch (error) {
                    if (error.response?.status === 409) {
                      setSignupFailed(true);
                    }
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        type="text"
                        placeholder={t('auth.usernameSignup')}
                        value={values.username}
                        onChange={(event) => {
                          setSignupFailed(false);
                          handleChange(event);
                        }}
                        isInvalid={
                          (touched.username && errors.username)
                          || signupFailed
                        }
                        autoComplete="username"
                        required
                      />
                      <Form.Label>{t('auth.usernameSignup')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {signupFailed ? t('auth.userExists') : errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder={t('auth.password')}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && errors.password}
                        autoComplete="new-password"
                        required
                      />
                      <Form.Label>{t('auth.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder={t('auth.confirmPassword')}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        autoComplete="new-password"
                        required
                      />
                      <Form.Label>{t('auth.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {t('auth.signupSubmit')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('auth.hasAccount')} </span>
                <Link to="/login">{t('auth.login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
