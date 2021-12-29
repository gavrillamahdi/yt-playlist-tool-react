import React, { useContext } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

import { useIframeProps } from '../../hooks/useIframeProps';
import { MainContext } from './Main';
import { repairDuration } from '../../lib/repairDuration';

const countDuration = (items) => {
  let totalSeconds = 0;

  items.forEach((item) => {
    const {
      contentDetails: { duration },
    } = item;
    const arr = repairDuration(duration)
      .split(':')
      .map((item) => Number(item));

    for (let i = 0; i <= arr.length; i++) {
      totalSeconds += arr.pop() * 60 ** i;
    }
  });

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const totalDuration = [hours, minutes, seconds].map((item) => {
    return new Intl.NumberFormat('id-ID', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }).format(item);
  });

  return totalDuration.join(':');
};

function PlaylistInfo() {
  const { dataState } = useContext(MainContext);

  // get all data that will be used
  const {
    playlist: {
      data: {
        items: [
          {
            id,
            player: { embedHtml },
            snippet: { title, publishedAt },
            contentDetails: { itemCount },
          },
        ],
      },
    },
    playlistItems: {
      data: { items: playlistItems },
    },
    videos: {
      data: { items: videoItems },
    },
  } = dataState;

  const {
    contentDetails: { videoPublishedAt: lastVideoAdded },
  } = playlistItems[playlistItems.length - 1];

  const ytIframe = useIframeProps(embedHtml);

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
                    <h3 className="mb-0">{title}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Playlist ID
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> {id}
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Published date
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b>{' '}
                      {new Date(publishedAt).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Published time
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b>{' '}
                      {new Date(publishedAt).toLocaleTimeString()}
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Last video added
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b>{' '}
                      {new Date(lastVideoAdded).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      at {new Date(lastVideoAdded).toLocaleTimeString()}
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Total duration
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> {countDuration(videoItems)}
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="row d-flex">
                    <Col sm={4} xs={12} className="fw-bold">
                      Total videos
                    </Col>
                    <Col sm={true} xs={true}>
                      <b className="colon">:</b> {itemCount}{' '}
                      {itemCount === playlistItems.length
                        ? ''
                        : `(${
                            itemCount - playlistItems.length
                          } unavailable video${
                            itemCount - playlistItems.length === 1 ? '' : 's'
                          })`}
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
