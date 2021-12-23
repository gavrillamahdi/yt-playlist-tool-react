import { useState } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import ModalApi from './Modal';

function Header() {
  const [show, setShow] = useState(false);

  return (
    <>
      <header>
        <Navbar variant="light" bg="danger" className="shadow-sm">
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
