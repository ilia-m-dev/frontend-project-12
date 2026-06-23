import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice.js';
import axios from 'axios';
import { setCurrentChannelId } from '../../store/slices/channelsSlice.js';
import useAuth from '../../hooks/useAuth.js';

const AddChannelModal = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channels.items);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const channelNames = channels.map(({ name }) => name);

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('/api/v1/channels', {
              name: values.name.trim(),
            }, {
              headers: {
                Authorization: `Bearer ${auth.user.token}`,
              },
            });

            dispatch(setCurrentChannelId(response.data.id));
            dispatch(closeModal());
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
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  ref={inputRef}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                  disabled={isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Отменить
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                Отправить
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;