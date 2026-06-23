import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels, setCurrentChannelId } from '../store/slices/channelsSlice.js';
import { setMessages, addMessage } from '../store/slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [messageBody, setMessageBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  const channels = useSelector((state) => state.channels?.items ?? []);
  const currentChannelId = useSelector(
    (state) => state.channels?.currentChannelId ?? null,
  );

  const messages = useSelector((state) => state.messages?.items ?? []);

  const currentChannel = channels.find(
    ({ id }) => id === currentChannelId,
  );

  const currentMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${auth.user.token}`,
        };

        const [channelsResponse, messagesResponse] = await Promise.all([
          axios.get('/api/v1/channels', { headers }),
          axios.get('/api/v1/messages', { headers }),
        ]);

        dispatch(setChannels({
          channels: channelsResponse.data,
          currentChannelId: channelsResponse.data[0]?.id ?? null,
        }));

        dispatch(setMessages(messagesResponse.data));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [auth.user.token, dispatch]);

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </Container>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedBody = messageBody.trim();

    if (!trimmedBody) {
      return;
    }

    setIsSending(true);

    try {
      const headers = {
        Authorization: `Bearer ${auth.user.token}`,
      };

      await axios.post('/api/v1/messages', {
        body: trimmedBody,
        channelId: currentChannelId,
        username: auth.user.username,
      }, { headers });

      setMessageBody('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          xs={4}
          md={2}
          className="border-end px-0 bg-light flex-column h-100 d-flex"
        >
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>

            <Button
              type="button"
              variant="group-vertical"
              className="p-0 text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-square"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>

              <span className="visually-hidden">+</span>
            </Button>
          </div>

          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels.map((channel) => (
              <li key={channel.id} className="nav-item w-100">
                <Button
                  type="button"
                  variant={
                    channel.id === currentChannelId
                      ? 'secondary'
                      : ''
                  }
                  className="w-100 rounded-0 text-start"
                  onClick={() => {
                    dispatch(setCurrentChannelId(channel.id));
                  }}
                >
                  <span className="me-1">#</span>

                  {channel.name}
                </Button>
              </li>
            ))}
          </ul>
        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {currentChannel?.name}
                </b>
              </p>

              <span className="text-muted">
                {currentMessages.length}
                {' '}
                сообщений
              </span>
            </div>

            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5"
            >
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className="text-break mb-2"
                >
                  <b>{message.username}</b>
                  {': '}
                  {message.body}
                </div>
              ))}
            </div>

            <div className="mt-auto px-5 py-3">
              <Form
                noValidate
                className="py-1 border rounded-2"
                onSubmit={handleSubmit}
              >
                <Form.Group className="input-group has-validation">
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                    value={messageBody}
                    onChange={(event) => setMessageBody(event.target.value)}
                    disabled={isSending}
                  />

                  <Button
                    type="submit"
                    variant="group-vertical"
                    disabled={isSending || !messageBody.trim()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-right-square"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                      />
                    </svg>

                    <span className="visually-hidden">
                      Отправить
                    </span>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;