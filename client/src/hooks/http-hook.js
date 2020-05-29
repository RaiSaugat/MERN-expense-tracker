import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      try {
        const response = await axios({
          url,
          method,
          timeout: 4000,
          data,
          headers,
        });
        const responseData = await response.data;

        // if (response.statusText !== 'Ok' && response.statusText !== 'Created') {
        //   throw new Error(responseData.message);
        // }

        return responseData;
      } catch (err) {
        setError(err.response.data.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { error, sendRequest, clearError };
};
