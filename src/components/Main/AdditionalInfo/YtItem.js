import React, { useContext } from 'react';
import { Row, Col, Card, Image, Badge } from 'react-bootstrap';

import { MainContext } from '../Main';
import { repairDuration } from '../../../lib/repairDuration';

function YtItem({ data, setVideoData }) {
  const { dataState } = useContext(MainContext);

  // get all data that will be used
  const {
    playlistItems: {
      data: { items: playlistItems },
    },
    videos: {
      data: { items: videoItems },
    },
  } = dataState;

  return (
    <>
      {playlistItems.map((item, index) => {
        const {
          contentDetails: { videoId, videoPublishedAt },
          snippet: {
            videoOwnerChannelTitle,
            title,
            description,
            thumbnails: {
              medium: { url },
            },
          },
        } = item;

        const {
          contentDetails: { duration },
          player: { embedHtml },
          statistics: { viewCount },
        } = videoItems[index];

        const clickHandler = () => {
          setVideoData({
            id: videoId,
            videoTitle: title,
            videoPublishedAt,
            duration,
            description,
            embedHtml,
            viewCount,
          });
        };

        return (
          <Col md={12} sm={4} xs={6} key={videoId} onClick={clickHandler}>
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
                  className="my-2 mx-md-0 mx-auto img-figure"
                  style={{ maxWidth: '180px' }}
                >
                  <Image fluid rounded src={url} alt={title} />
                  <Badge bg="dark">{repairDuration(duration)}</Badge>
                  <span className="visually-hidden">video duration</span>
                </Col>
                <Col md>
                  <Card.Body className="p-2">
                    <Card.Title as="h6">{title}</Card.Title>
                    <Card.Text className="m-0">
                      <small className="text-muted">
                        {videoOwnerChannelTitle}
                      </small>
                    </Card.Text>
                    <Card.Text className="m-0">
                      <small
                        className="text-muted"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Published at{' '}
                        {new Date(videoPublishedAt).toLocaleDateString('id-ID')}
                      </small>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default YtItem;
