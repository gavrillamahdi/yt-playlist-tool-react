import React from 'react';
import { Card, Row, Table } from 'react-bootstrap';
import parse from 'html-react-parser';

import ChannelInfo from './ChannelInfo';
import { useIframeProps } from '../../../hooks/useIframeProps';
import { repairDuration } from '../../../lib/repairDuration';

const descriptionMarkUp = (desc) => {
  const regNewLine = /\n/g;
  const regLink =
    /(\bhttps?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,\.;]*[-A-Za-z0-9+&@#/%=~_|])/g; //eslint-disable-line no-useless-escape
  const regHashtag = /\B#([a-zA-Z_]+[0-9a-zA-Z_]*)/g;

  const stringHtml = desc
    .replace(regNewLine, '<br/>')
    .replace(
      regLink,
      '<a href="$1" target="_blank" class="link-break" rel="noopener noreferrer">$1</a>'
    )
    .replace(
      regHashtag,
      '<a href="https://www.youtube.com/hashtag/$1" target="_blank" rel="noopener noreferrer">#$1</a>'
    );

  return parse(stringHtml);
};

function ItemDetails({ data }) {
  // get all data that will be used
  const {
    videoTitle,
    videoPublishedAt,
    duration,
    description,
    embedHtml,
    viewCount,
  } = data;

  const ytIframe = useIframeProps(embedHtml);

  return (
    <Card
      border={false}
      className="shadow overflow-auto sticky-top w-100"
      style={{ maxHeight: '100vh' }}
    >
      <div className="yt-embed-container">
        <Card.Img variant="top" as="iframe" {...ytIframe} />
      </div>
      <Card.Body>
        <h5>{videoTitle}</h5>
        <Row className="g-0 align-items-center my-1 mt-3">
          <ChannelInfo xsCol={4} />
        </Row>

        <Table borderless className="mt-3">
          <tbody>
            <tr>
              <th>Total viewers</th>
              <td>{new Intl.NumberFormat().format(viewCount)}</td>
            </tr>
            <tr>
              <th>Published date</th>
              <td>
                {new Date(videoPublishedAt).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </td>
            </tr>
            <tr>
              <th>Published time</th>
              <td>{new Date(videoPublishedAt).toLocaleTimeString()}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{repairDuration(duration)}</td>
            </tr>
            <tr>
              <th colSpan={2}>Description</th>
            </tr>
            <tr>
              <td colSpan={2} className="description">
                {descriptionMarkUp(description)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ItemDetails;
