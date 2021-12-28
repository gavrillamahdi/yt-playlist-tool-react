import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';

function ChannelInfo() {
  return (
    <>
      <Col
        md={4}
        xs={6}
        className="my-auto"
        style={{ width: '5vw', maxWidth: '80px', minWidth: '50px' }}
      >
        <Image
          fluid
          roundedCircle
          src={
            'https://yt3.ggpht.com/Zv2uW6HRszX6QhU7N-IRq7R7ZPAgINwBmbc36C-kmhFGckbRlWODC17juSPI9CCAOPY0ho8ld-I=s240-c-k-c0x00ffffff-no-rj'
          }
          alt={'GabeSweats'}
        />
      </Col>
      <Col md xs>
        <Card.Body className="p-2">
          <Card.Title as="h6" className="m-0">
            GabeSweats
          </Card.Title>
          <p className="small h6 text-muted">1.06M subscribers</p>
        </Card.Body>
      </Col>
    </>
  );
}

export default ChannelInfo;
