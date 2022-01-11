import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
} from 'react';

import Search from './Search';
import PlaylistInfo from './PlaylistInfo';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import Loading from './Loading';
import { StoredKeyContext } from '../../App';

const MainContext = createContext();

const init = (initialState) => {
  const isLoading = false;
  return initialState
    .map((state) => ({
      [state]: {
        data: null,
        error: null,
      },
    }))
    .reduce((prev, current) => ({ isLoading, ...prev, ...current }));
};

const dataReducer = (state, { type, payload }) => {
  const { playlist, channel, videos, playlistItems } = state;
  switch (type) {
    case 'RESET_STATE':
      const initialState = ['playlist', 'channel', 'videos', 'playlistItems'];
      return init(initialState);
    case 'SET_IS_LOADING':
      return { ...state, ...payload };
    case 'SET_PLAYLIST':
      return { ...state, playlist: { ...playlist, ...payload } };
    case 'SET_CHANNEL':
      return { ...state, channel: { ...channel, ...payload } };
    case 'SET_VIDEOS':
      const { data: videosData } = payload;

      if (videos.data) {
        const prevData = videos.data.items;
        return {
          ...state,
          videos: {
            ...videos,
            data: { ...videosData, items: [...prevData, ...videosData.items] },
          },
        };
      }
      return {
        ...state,
        videos: {
          ...videos,
          data: { ...videosData, items: [...videosData.items] },
        },
      };
    case 'SET_PLAYLIST_ITEMS':
      const { data: playlistItemsData } = payload;
      const { prevPageToken, items } = playlistItemsData;

      const filteredItems = items.filter(
        (item) => item.status.privacyStatus === 'public'
      );

      if (prevPageToken && playlistItems.data) {
        const prevData = playlistItems.data.items;
        return {
          ...state,
          playlistItems: {
            ...playlistItems,
            data: {
              ...playlistItemsData,
              items: [...prevData, ...filteredItems],
            },
          },
        };
      }
      return {
        ...state,
        playlistItems: {
          ...playlistItems,
          data: { ...playlistItemsData, items: [...filteredItems] },
        },
      };
    default:
      throw new Error("can't handle action type"); //eslint-disable-line
  }
};

function Main() {
  const { storedKey } = useContext(StoredKeyContext);

  const initialState = ['playlist', 'channel', 'videos', 'playlistItems'];
  const [dataState, dispatch] = useReducer(dataReducer, initialState, init);

  const getData = async (endpoint, action) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.error || !data.items.length) {
        dispatch({
          type: action,
          payload: {
            data: null,
            error: data.error || {
              message:
                'Playlist either not found or playlist visibility is not public',
            },
          },
        });
        throw new Error();
      } else {
        dispatch({
          type: action,
          payload: { data, error: null },
        });
      }

      return data;
    } catch (error) {
      dispatch({
        type: action,
        payload: {
          data: null,
          error: {
            message: 'Please check your input or your internet conection',
          },
        },
      });
      throw new Error();
    }
  };

  const componentToRender = useCallback(() => {
    const {
      isLoading,
      playlist: { data, error },
    } = dataState;

    if (!data) {
      if (isLoading) {
        return (
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <Loading />
          </div>
        );
      }

      if (error) {
        return (
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <h2 className="text-muted opacity-50 fw-normal text-center">
              {error.message}
            </h2>
          </div>
        );
      }

      return (
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <h2 className="text-muted opacity-50 fw-normal text-center">
            Input any youtube playlist link to start
          </h2>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <Loading />
        </div>
      );
    }

    return (
      <>
        <PlaylistInfo />
        <AdditionalInfo />
      </>
    );
  }, [dataState]);

  return (
    <MainContext.Provider
      value={{
        storedKey,
        dataState,
        dispatch,
        getData,
      }}
    >
      <main>
        <Search />
        {componentToRender()}
      </main>
    </MainContext.Provider>
  );
}

export { MainContext };
export default Main;
