import { useState, useEffect } from 'react';
import axiosApi from '../api/axiosApi';
import useError from './useError';

export const API = {
  currentUserInfo: { method: 'get', url: '/users/me' },
  login: { method: 'post', url: '/auth/token/obtain' },
  register: { method: 'post', url: '/users' },
  editUserInfo: { method: 'patch', url: '/users/me' },
  changePassword: { method: 'patch', url: '/users/change-password' },
};

function useAxiosApiFunction() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();
  const { setError } = useError();

  async function axiosFetch(fetchConfig, options={ data: {}, skip: [] }) {

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
      if (options?.skip?.includes(error?.response?.status)) {
        setResponse(error.response);
      } else if (error?.response) {
        // Server error to ErrorContext
        // ADD FEATURE:  Error handler for different `detail` structure
        setError({status: error?.response.status, message: error?.response?.data?.detail});
      } else {
        // Fetch error to ErrorContext
        // ADD FEATURE:  Error handler for Axios Error
        setError({ status: 500, message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return { response, loading, axiosFetch };
}

export default useAxiosApiFunction;