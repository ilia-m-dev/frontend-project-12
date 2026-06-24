import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../store/slices/modalSlice.js';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveChannelModal = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const channelId = useSelector((state) => state.modal.channelId);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    setIsSubmitting(true);

    try {
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });

      dispatch(closeModal());
      toast.success(t('toasts.channelRemoved'));
    } catch (error) {
      if (!error.response) {
        toast.error(t('errors.network'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.body')}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {t('modals.removeChannel.cancel')}
        </Button>

        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={isSubmitting}
        >
          {t('modals.removeChannel.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
