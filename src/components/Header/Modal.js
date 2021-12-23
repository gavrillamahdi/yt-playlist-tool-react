import {
  Modal,
  Button,
  InputGroup,
  Form,
  FormControl,
  Alert,
} from 'react-bootstrap';

function ModalApi({ show, setShow }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title as="h5">Change Youtube API Key</Modal.Title>
      </Modal.Header>

      <form>
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
            <FormControl id="api-key" required />
          </InputGroup>

          <Alert variant="danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Warning:"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Invalid API key. Please insert a valid Youtube API key
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger">Cancel</Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default ModalApi;
