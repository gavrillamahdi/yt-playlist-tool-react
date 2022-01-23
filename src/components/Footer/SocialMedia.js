import React, { useState, useEffect } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ReactComponent as Instagram } from './assets/instagram.svg';
import { ReactComponent as Email } from './assets/email.svg';
import { ReactComponent as Github } from './assets/github.svg';
import { ReactComponent as Copy } from './assets/copy.svg';

function SocialMedia() {
  const [show, setShow] = useState(false);
  return (
    <>
      <ul className="m-0 mt-2 p-0">
        <li>
          <a
            href="https://instagram.com/gavrillamahdi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
        </li>
        <li>
          <Email className="email" onClick={() => setShow(true)} />
        </li>
        <li>
          <a
            href="https://github.com/gavrillamahdi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </li>
      </ul>
      <MailModal show={show} setShow={setShow} />
    </>
  );
}

const CopyTooltip = React.forwardRef(({ popper, children, ...props }, ref) => {
  useEffect(() => {
    popper.scheduleUpdate();
  }, [popper, children]);
  return (
    <Tooltip id="copy-tooltip" ref={ref} {...props}>
      {children}
    </Tooltip>
  );
});

function MailModal({ show, setShow }) {
  const [copyMessage, setCopyMessage] = useState(<>copy email address</>);
  const clickHandler = () => {
    navigator.clipboard.writeText('gavrillamahdi@gmail.com');
    setCopyMessage(<>copied &#10004;&#65039;</>);
    setTimeout(() => {
      setCopyMessage(<>copy email address</>);
    }, 2000);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Email</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <h3 className="fw-normal d-inline-block">gavrillamahdi@gmail.com</h3>
        <OverlayTrigger
          placement="top"
          overlay={<CopyTooltip>{copyMessage}</CopyTooltip>}
        >
          <Copy className="copy ms-2" onClick={clickHandler} />
        </OverlayTrigger>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setShow(false)}>
          Close
        </Button>
        <a href="mailto:gavrillamahdi@gmail.com">
          <Button
            className="d-flex align-items-center"
            onClick={() => setShow(false)}
          >
            <Email className="me-2" style={{ fill: 'white' }} /> Email Me
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default SocialMedia;
