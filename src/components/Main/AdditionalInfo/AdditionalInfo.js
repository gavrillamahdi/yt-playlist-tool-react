import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ChannelInfo from './ChannelInfo';
import YtItem from './YtItem';
import ItemDetails from './ItemDetails';

function AdditionalInfo() {
  return (
    <section className="border-top additional-info">
      <Container fluid>
        <Row>
          <Col md={7} lg={8} className="p-2">
            <Container fluid>
              <Row className="g-0 align-items-center mt-2 mb-4">
                <ChannelInfo></ChannelInfo>
              </Row>
              <Row className="g-1 g-md-2">
                <YtItem>tes</YtItem>
              </Row>
            </Container>
          </Col>

          <Col md={true} className="p-3">
            <ItemDetails></ItemDetails>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AdditionalInfo;
