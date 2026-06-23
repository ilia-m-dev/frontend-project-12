import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice.js';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.js';

const RenameChannelModal = () => {
	const auth = useAuth();
	const dispatch = useDispatch();
	const inputRef = useRef(null);

	const channelId = useSelector((state) => state.modal.channelId);
	const channels = useSelector((state) => state.channels.items);
	const currentChannel = channels.find(({ id }) => id === channelId);

	useEffect(() => {
		inputRef.current?.focus();
		inputRef.current?.select();
	}, []);

	const channelNames = channels
		.filter(({ id }) => id !== channelId)
		.map(({ name }) => name);

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
				<Modal.Title>Переименовать канал</Modal.Title>
			</Modal.Header>

			<Formik
				initialValues={{ name: currentChannel?.name ?? '' }}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						await axios.patch(`/api/v1/channels/${channelId}`, {
							name: values.name.trim(),
						}, {
							headers: {
								Authorization: `Bearer ${auth.user.token}`,
							},
						});

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

export default RenameChannelModal;