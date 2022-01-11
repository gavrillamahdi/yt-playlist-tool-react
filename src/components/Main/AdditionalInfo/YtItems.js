import React, { useContext } from 'react';
import Item from './Item';

import { MainContext } from '../Main';

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
          snippet: { title, description },
        } = item;

        const {
          contentDetails: { duration },
          player: { embedHtml },
          statistics: { viewCount },
        } = videoItems[index];

        const videoItem = videoItems[index];

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
          <Item
            key={videoId}
            data={{ item, videoItem, data }}
            handler={clickHandler}
            index={index}
          />
        );
      })}
    </>
  );
}

export default YtItem;
