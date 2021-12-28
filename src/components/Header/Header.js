import { useState, useEffect, useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import ModalApi from './Modal';
import { StoredKeyContext } from '../../App';

function Header() {
  const [show, setShow] = useState(false);
  const { storedKey } = useContext(StoredKeyContext);
  useEffect(() => {
    if (!storedKey) setShow(true);
  }, [storedKey]);

  return (
    <>
      <header>
        <Navbar
          variant="light"
          bg="danger"
          className="shadow-sm"
          expand={false}
        >
          <Container fluid>
            <Navbar.Brand as="h1" className="mb-0 text-light mx-4">
              Youtube Playlist Tools
            </Navbar.Brand>

            <Button
              variant="outline-light"
              className="mx-4"
              onClick={() => setShow(true)}
            >
              Change API key
            </Button>
          </Container>
        </Navbar>
      </header>
      <ModalApi show={show} setShow={setShow} />
    </>
  );
}

export default Header;
