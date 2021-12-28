import React from 'react';
import { Row, Col, Card, Image, Badge } from 'react-bootstrap';

function YtItem() {
  return (
    <>
      <Col md={12} sm={4} xs={6}>
        <Card className="mb-3 px-2 shadow-sm border-0 item">
          <Row className="g-0 align-items-center">
            <Col md={1}>
              <h3 className="small text-muted text-center">1</h3>
            </Col>
            <Col
              md={4}
              className="my-2 mx-md-0 mx-auto img-figure"
              style={{ maxWidth: '180px' }}
            >
              <Image
                fluid
                rounded
                src={`https://i.ytimg.com/vi/McwEDn7TFbw/mqdefault.jpg`}
                alt={`the smartest person ever`}
              />
              <Badge bg="dark">00:54</Badge>
              <span className="visually-hidden">video duration</span>
            </Col>
            <Col md>
              <Card.Body className="p-2">
                <Card.Title as="h6">the smartest person ever</Card.Title>
                <Card.Text className="m-0">
                  <small className="text-muted">GabeSweats</small>
                </Card.Text>
                <Card.Text className="m-0">
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Published at 12/9/2021
                  </small>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
}

export default YtItem;
