import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [process, setProcess] = useState('waiting');

  const request = useCallback(async url => {
    setProcess('loading');

    try {
      const response = await fetch(url);
      console.log(response);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      setProcess('error');
      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setProcess('loading');
  }, []);

  return { request, clearError, process, setProcess };
};
