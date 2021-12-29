import {
  Modal,
  Button,
  InputGroup,
  Form,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { useState, useReducer, useContext } from 'react';
import { StoredKeyContext } from '../../App';

function validReducer(state, action) {
  switch (action.type) {
    case 'SET_IS_VALID':
      return { ...state, isValid: true, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isValid: false };
    default:
      throw new Error("can't handle action type");
  }
}

function ModalApi({ show, setShow }) {
  const { storedKey, setStoredKey } = useContext(StoredKeyContext);
  const [key, setKey] = useState(storedKey);
  const [isLoading, setIsLoading] = useState(false);
  const [validState, dispatch] = useReducer(validReducer, {
    isValid: true,
    error: null,
  });

  const testKey = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?&key=${key}&part=status&id=dQw4w9WgXcQ`
      );
      const data = await response.json();

      if (data.error) {
        dispatch({ type: 'SET_ERROR', payload: data.error.message });
        setKey('');
        document.querySelector('.modal.fade.show').click();
      } else {
        setShow(false);
        setTimeout(() => {
          dispatch({ type: 'SET_IS_VALID' });
          setStoredKey(key);
        }, 500);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      setKey('');
    }
    setIsLoading(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await testKey();
  };

  const onShowHandler = () => {
    setKey(storedKey);
    dispatch({ type: 'SET_IS_VALID' });
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      onShow={onShowHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={storedKey ? true : false}>
        <Modal.Title as="h5">
          {storedKey ? 'Change' : 'Provide'} Youtube API Key
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <p>
            Right now you should provide a youtube API key to use this tool. If
            you don't know how to get it, you can click{' '}
            <a
              href="https://developers.google.com/youtube/v3/getting-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{' '}
            to get your own youtube API key.
          </p>
          <p className="mb-5">
            We're sorry for this inconvenience, we still keep trying to improve
            this tool for better experience in the future.
          </p>
          <Form.Label htmlFor="api-key">
            {' '}
            <b>Insert Youtube API key</b>{' '}
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              required
              onChange={(e) => setKey(e.target.value)}
              value={key}
              id="api-key"
            />
          </InputGroup>
          {validState.isValid || (
            <Alert variant="danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                viewBox="0 0 16 16"
                role="img"
                aria-label="Warning:"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {validState.error}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          {storedKey && (
            <Button variant="danger" onClick={() => setShow(false)}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary">
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Submit'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalApi;
