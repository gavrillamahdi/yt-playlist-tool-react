import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AdditionalInfo() {
  return (
    <section className="border-top additional-info">
      <Container fluid>
        <Row>
          <Col md={7} lg={8} className="p-2">
            <Container fluid>
              <Row className="g-0 align-items-center mt-2 mb-4"></Row>
            </Container>
            <Row className="g-1 g-md-2"></Row>
          </Col>

          <Col md className="p-3"></Col>
        </Row>
      </Container>
    </section>
  );
}

export default AdditionalInfo;
