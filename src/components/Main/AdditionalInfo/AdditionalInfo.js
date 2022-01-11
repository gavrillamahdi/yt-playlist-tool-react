import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ChannelInfo from './ChannelInfo';
import YtItems from './YtItems';
import ItemDetails from './ItemDetails';

function AdditionalInfo() {
  const [videoData, setVideoData] = useState({});

  return (
    <section className="border-top additional-info">
      <Container fluid>
        <Row>
          <Col md={7} lg={8} className="p-2">
            <Container fluid>
              <Row className="g-0 align-items-center mt-2 mb-4">
                <ChannelInfo />
              </Row>
              <Row className="g-1 g-md-2">
                <YtItems data={videoData} setVideoData={setVideoData} />
              </Row>
            </Container>
          </Col>
          <Col md lg className="p-3">
            {Object.keys(videoData).length ? (
              <ItemDetails data={videoData} />
            ) : (
              <div
                className="d-flex align-items-center sticky-top"
                style={{ maxHeight: '100vh', minHeight: '50vh' }}
              >
                <h3 className="text-muted fw-normal text-center">
                  Click any item to see details
                </h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AdditionalInfo;
