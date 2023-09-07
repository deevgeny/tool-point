import { useState, useEffect } from 'react';
import axiosApi from '../api/axiosApi';

export const API = {
  currentUserInfo: { method: 'get', url: '/users/me' },
  login: { method: 'post', url: '/jwt/create' },
  register: { method: 'post', url: '/users' },
};

function useAxiosApiFunction() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  async function axiosFetch(fetchConfig, options={ data: {}, skip: [] }) {
/*     const {
      // axiosApi,
      method,
      url,
      requestConfig = {}
    } = fetchConfig; */
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosApi({
        ...fetchConfig,
        data: options.data,
        signal: ctrl.signal
      });
      setResponse(res);
    } catch (error) {
      // Return requested errors to component
      if (options.skip.includes(error?.response?.status)) {
        setError(error.response);
      } else {
        // Run error handler
        //setError(error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return { response, error, loading, axiosFetch };
}

export default useAxiosApiFunction;