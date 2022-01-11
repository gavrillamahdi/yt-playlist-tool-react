import React, { useState, useEffect, useContext } from 'react';
import { Col, Card, Image, Placeholder } from 'react-bootstrap';

import { MainContext } from '../Main';

const subsCountPlaceholder = (subs) => {
  subs = Number(subs);
  const arrPlaceholder = ['T', 'B', 'M', 'K'];
  let placeholder = '';

  while (subs > 999) {
    subs /= 1000;
    placeholder = arrPlaceholder.pop();
  }
  return `${subs}${placeholder}`;
};

function ChannelInfo({ xsCol = 6 }) {
  const { dataState } = useContext(MainContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    channel: {
      data: {
        items: [
          {
            snippet: {
              title,
              thumbnails: {
                medium: { url },
              },
            },
            statistics: { subscriberCount, videoCount },
          },
        ],
      },
    },
  } = dataState;

  useEffect(() => {
    setIsImageLoaded(false);
  }, [url]);

  return (
    <>
      <Col
        md={4}
        xs={xsCol}
        className={`my-auto ${isImageLoaded ? '' : 'placeholder-glow'}`}
        style={{
          width: '5vw',
          maxWidth: '80px',
          minWidth: '50px',
          aspectRatio: '1 / 1',
        }}
      >
        {isImageLoaded || (
          <Placeholder className="w-100 h-100 rounded-circle" />
        )}
        <Image
          fluid
          roundedCircle
          src={url}
          alt={title}
          onLoad={() => setIsImageLoaded(true)}
          hidden={!isImageLoaded}
        />
      </Col>
      <Col md xs>
        <Card.Body className="p-2">
          <Card.Title as="h6" className="mb-1">
            {title}
          </Card.Title>
          <p className="small h6 text-muted m-0">
            {subsCountPlaceholder(subscriberCount)} subscriber
            {subscriberCount > 1 ? 's' : ''}
          </p>
          <p className="small h6 text-muted m-0">
            {videoCount} video{videoCount > 1 ? 's' : ''}
          </p>
        </Card.Body>
      </Col>
    </>
  );
}

export default ChannelInfo;
