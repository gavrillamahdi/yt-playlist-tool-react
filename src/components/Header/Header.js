import { useState, useEffect, useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import ModalApi from './Modal';
import { ReactComponent as Icon } from './icon.svg';
import { StoredKeyContext } from '../../App';

function Header() {
  const [show, setShow] = useState(false);
  const { storedKey } = useContext(StoredKeyContext);
  useEffect(() => {
    if (!storedKey) setShow(true);
  }, [storedKey]);

  return (
    <>
      <header className="sticky-top shadow-sm" style={{ zIndex: 1030 }}>
        <Navbar variant="light" bg="danger" expand={false}>
          <Container fluid>
            {
              // eslint-disable-next-line
              <a className="text-decoration-none" href="#">
                <Navbar.Brand as="h1" className="mb-0 text-light mx-md-4">
                  <Icon /> Youtube Playlist Tools
                </Navbar.Brand>
              </a>
            }
            <Button
              variant="outline-light"
              className="mx-md-4"
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
