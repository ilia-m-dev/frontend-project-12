import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice.js';
import axios from 'axios';
import { setCurrentChannelId } from '../../store/slices/channelsSlice.js';
import useAuth from '../../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cleanProfanity from '../../profanityFilter.js';


const AddChannelModal = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channels.items);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const channelNames = channels.map(({ name }) => name);

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.nameLength'))
      .max(20, t('validation.nameLength'))
      .notOneOf(channelNames, t('validation.uniqueChannel')),
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('/api/v1/channels', {
              name: cleanProfanity(values.name.trim()),
            }, {
              headers: {
                Authorization: `Bearer ${auth.user.token}`,
              },
            });

            dispatch(setCurrentChannelId(response.data.id));
            dispatch(closeModal());
            toast.success(t('toasts.channelCreated'));
          } catch (error) {
            if (!error.response) {
              toast.error(t('errors.network'));
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
                {t('modals.addChannel.cancel')}
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {t('modals.addChannel.submit')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
