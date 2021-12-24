import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!isLoading) {
        setIsLoading(true);
      }
      try {
        const response = await fetch(url);
        const item = await response.json();

        setData(item);
        setIsLoading(false);
      } catch (error) {
        // throw new Error(error.message)
        console.log(error);
      }
    };

    getData();
  }, [url, isLoading]);

  return [isLoading, data];
};
