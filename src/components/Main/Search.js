import React, { useContext, useState } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { MainContext } from './Main';

const makeEndpoint = (base, properties) => {
  let endpoint = `${base}?`;

  for (const [key, val] of Object.entries(properties)) {
    if (!val) {
      continue;
    }

    endpoint += `&${key}=${val}`;
  }

  return endpoint;
};

function Search() {
  const { storedKey: key, getData, dispatch } = useContext(MainContext);
  const [url, setUrl] = useState('');

  const getPlaylistId = (url) => {
    const regex = /list=([a-zA-Z0-9-_]+)/;
    return url.match(regex)[1];
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const playlistId = getPlaylistId(url);

      // reset data
      dispatch({ type: 'RESET_STATE' });

      // get playlist data
      dispatch({ type: 'SET_IS_LOADING', payload: { isLoading: true } });
      let endpoint = makeEndpoint(
        'https://www.googleapis.com/youtube/v3/playlists',
        {
          key,
          part: 'snippet,contentDetails,player',
          id: playlistId,
        }
      );

      const {
        items: [
          {
            snippet: { channelId },
          },
        ],
      } = await getData(endpoint, 'SET_PLAYLIST');

      // get channel data
      endpoint = makeEndpoint(
        'https://www.googleapis.com/youtube/v3/channels',
        {
          key,
          part: 'snippet,statistics',
          id: channelId,
        }
      );
      getData(endpoint, 'SET_CHANNEL');

      let nextPageToken;

      while (true) {
        // get playlist items data
        endpoint = makeEndpoint(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            key,
            part: 'snippet,status,contentDetails',
            playlistId,
            pageToken: nextPageToken || '',
            maxResults: 50,
          }
        );
        const playlistItems = await getData(endpoint, 'SET_PLAYLIST_ITEMS');

        // get next page token and videoId for next videos data request
        ({ nextPageToken } = playlistItems);
        const videoId = playlistItems.items
          .filter((item) => item.status.privacyStatus === 'public')
          .map((item) => item.contentDetails.videoId)
          .join();

        // get videos data
        endpoint = makeEndpoint(
          'https://www.googleapis.com/youtube/v3/videos',
          {
            key,
            part: 'contentDetails,player,statistics',
            id: videoId,
          }
        );
        await getData(endpoint, 'SET_VIDEOS');

        if (!nextPageToken) break;
      }
    } catch (error) {
      console.log(error.message); //eslint-disable-line
      dispatch({
        type: 'SET_PLAYLIST',
        payload: {
          data: null,
          error: {
            message: 'Please check your input or your internet connection',
          },
        },
      });
    }

    dispatch({ type: 'SET_IS_LOADING', payload: { isLoading: false } });
  };

  return (
    <section className="my-5 search-section">
      <Container fluid>
        <Row>
          <Col md={8} className="mx-auto">
            <h3>Insert Youtube Playlist Link</h3>
            <InputGroup as="form" className="mb-3" onSubmit={submitHandler}>
              <FormControl
                placeholder="Youtube link (e.g. https://www.youtube.com/playlist?list=PLlaN88a7y2_plecYoJxvRFTLHVbIVAOoc)"
                id="yt-link"
                aria-describedby="playlist-id"
                className="pl-id-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Search;
