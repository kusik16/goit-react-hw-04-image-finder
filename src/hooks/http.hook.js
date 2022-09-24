import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [process, setProcess] = useState('idle');

  const request = useCallback(async url => {
    setProcess('loading');

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();
      setProcess('ok');
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
