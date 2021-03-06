import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import parse from 'html-react-parser';
import _ from 'lodash';

// import ChannelInfo from './ChannelInfo';
import { useIframeProps } from '../../../hooks/useIframeProps';
import { repairDuration } from '../../../lib/repairDuration';

// make function to fix description link
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
  // console.log(parse(stringHtml));

  // truncate the long link
  return parse(stringHtml).map((item) => {
    if (item.type === 'a' && !item.props.children.includes('#')) {
      const { props } = item;
      const { children } = props;
      return {
        ...item,
        props: {
          ...props,
          children: _.truncate(children, { length: 40 }),
        },
      };
    }
    return item;
  });
};

const getHeaderHeight = () => {
  const header = document.querySelector('header');
  return window.getComputedStyle(header).height;
};

function ItemDetails({ data }) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(getHeaderHeight);

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

  useEffect(() => {
    setIsIframeLoaded(false);
  }, [ytIframe.src]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      setHeaderHeight(getHeaderHeight);
    };
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []); //eslint-disable-line

  return (
    <Card
      border={false}
      className="shadow overflow-auto sticky-top w-100"
      style={{ maxHeight: `calc(100vh - ${headerHeight})`, top: headerHeight }}
    >
      <div
        className={`yt-embed-container ${
          isIframeLoaded ? '' : 'placeholder-glow'
        }`}
      >
        <Card.Img
          className={isIframeLoaded || 'placeholder'}
          variant="top"
          as="iframe"
          {...ytIframe}
          onLoad={() => setIsIframeLoaded(true)}
        />
      </div>
      <Card.Body>
        <h5>{videoTitle}</h5>
        {/* <Row className="g-0 align-items-center my-1 mt-3">
          <ChannelInfo xsCol={4} />
        </Row> */}

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
