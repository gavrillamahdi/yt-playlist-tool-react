import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import parse from 'html-react-parser';

import { MainContext } from './Main';

function PlaylistInfo() {
  const { dataState } = useContext(MainContext);

  const [ytIframe, setYtIframe] = useState({});
  useEffect(() => {
    if (dataState.playlist.data)
      setYtIframe(
        parse(dataState.playlist.data.items[0].player.embedHtml).props
      );
  }, [dataState]);
  return (
    <section className="mb-5 playlist-info">
      <Container fluid>
        <Row>
          <Col md={6} className="mx-auto">
            <Card className="shadow">
              <Card.Img variant="top" as="iframe" {...ytIframe} />

              <Card.Body>
                <ListGroup as="ul" className="px-3">
                  <ListGroup.Item
                    as="li"
                    className="row d-flex"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                  >
                    <h3 className="mb-0">ReactJS Tutorial for Beginners</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Playlist ID
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b>{' '}
                      PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Published date
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> 29 Oktober 2018
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Published time
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> 7:01:47 PM
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Last video uploaded
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> 14 Maret 2021 at 6:00:16 PM
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Total duration
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> 14:34:42
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Total videos
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> 118 (2 unavailable videos)
                    </Col>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PlaylistInfo;
