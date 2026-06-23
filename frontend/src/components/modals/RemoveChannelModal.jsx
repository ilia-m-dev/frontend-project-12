import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../../store/slices/modalSlice.js';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.js';

const RemoveChannelModal = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const channelId = useSelector((state) => state.modal.channelId);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Отменить
        </Button>

        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={isSubmitting}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;