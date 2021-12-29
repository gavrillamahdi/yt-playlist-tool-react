import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

export const useIframeProps = (value) => {
  const [ytIframe, setYtIframe] = useState({});

  useEffect(() => {
    if (value) {
      const props = parse(value).props;
      const { src } = props;
      const newSrc = src.replace(/([\S]+youtube)?([\S])/, '$1-nocookie$2');
      setYtIframe({ ...props, src: newSrc });
    }
  }, [value]);

  return ytIframe;
};
