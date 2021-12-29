import React, { useContext } from 'react';
import { Col, Card, Image } from 'react-bootstrap';

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

  return (
    <>
      <Col
        md={4}
        xs={xsCol}
        className="my-auto"
        style={{ width: '5vw', maxWidth: '80px', minWidth: '50px' }}
      >
        <Image fluid roundedCircle src={url} alt={title} />
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
