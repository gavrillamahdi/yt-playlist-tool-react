import { useState } from 'react';

export const useFetch = (url, [value, setValue]) => {
  const data = Object.keys(value).pop();
  setValue({ ...value, isLoading: true });
  const callback = async () => {
    try {
      const response = await fetch(url);
      const resJson = await response.json();

      if (resJson.error) {
        setValue({ ...value, isLoading: false, error: resJson.error });
      }

      setValue({ ...value, isLoading: false, [data]: resJson, error: null });
    } catch (error) {
      console.log(error);
    }

    return callback;
  };
};

// export const useFetch = (url) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await fetch(url);
//         const item = await response.json();

//         setData(item);
//         setIsLoading(false);
//       } catch (error) {
//         // throw new Error(error.message)
//         console.log(error);
//       }
//     };

//     getData();
//   }, [url]);

//   return [isLoading, data];
// };
