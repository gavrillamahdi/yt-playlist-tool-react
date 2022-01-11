import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Image, Badge, Placeholder } from 'react-bootstrap';

import { repairDuration } from '../../../lib/repairDuration';

function Item({
  data: { item, videoItem, data },
  handler: clickHandler,
  index,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    contentDetails: { videoId, videoPublishedAt },
    snippet: {
      videoOwnerChannelTitle,
      title,
      thumbnails: {
        medium: { url },
      },
    },
  } = item;

  const {
    contentDetails: { duration },
  } = videoItem;

  useEffect(() => {
    setIsImageLoaded(false);
  }, [url]);

  return (
    <>
      <Col md={12} sm={4} xs={6} onClick={clickHandler}>
        <Card
          className={`mb-3 px-2 shadow-sm border-0 item ${
            videoId === data.id ? 'active' : ''
          }`}
        >
          <Row className="g-0 align-items-center">
            <Col md={1}>
              <h3 className="small text-muted text-center">{index + 1}</h3>
            </Col>
            <Col
              md={4}
              className={`my-2 mx-md-0 mx-auto img-figure rounded ${
                isImageLoaded ? '' : 'placeholder-glow'
              }`}
              style={{ maxWidth: '180px', aspectRatio: '16 / 9' }}
            >
              {isImageLoaded || <Placeholder className="w-100 h-100 rounded" />}

              <Image
                fluid
                rounded
                src={url}
                alt={title}
                onLoad={() => setIsImageLoaded(true)}
                hidden={!isImageLoaded}
              />
              <Badge bg="dark">{repairDuration(duration)}</Badge>
              <span className="visually-hidden">video duration</span>
            </Col>
            <Col md>
              <Card.Body className="p-2">
                <Card.Title as="h6">{title}</Card.Title>
                <Card.Text className="m-0">
                  <small className="text-muted">{videoOwnerChannelTitle}</small>
                </Card.Text>
                <Card.Text className="m-0">
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Published at{' '}
                    {new Date(videoPublishedAt).toLocaleDateString('id-ID')}
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

export default Item;
