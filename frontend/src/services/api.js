import axios from 'axios';
import Token from './token';

const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
const baseUrl = API_URL + API_PREFIX + API_VERSION;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosRefresh = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = Token.getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      console.log('inside interceptor response')
      const data = JSON.stringify({ refresh: Token.getLocalRefreshToken() });
      const response = axiosRefresh.post('/jwt/refresh', data);
      prevRequest.headers['Authorization'] = `Bearer ${response?.data.access}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  });

async function handleFetch(url, body, options = {}) {
  try {
    const response = await axiosInstance(
      url,
      {
        ...options,
        data: JSON.stringify(body)
      }
    );
    return response;
  } catch (error) {
    if (!error?.response) {
      // Fetch error
      return error;
    }
    // Http error
    return error.response;
  }
}

async function pureFetch(url, body, options = {}) {
  try {
    const response = await axiosInstance(
      url,
      {
        ...options,
        data: JSON.stringify(body)
      }
    );
    return response;
  } catch (error) {
    if (!error?.response) {
      // Fetch error
      return error;
    }
    // Http error
    return error.response;
  }
}

const ApiService = {
  // Handled
  get: async (url, body, options) => {
    return handleFetch(url, body, {...options, method: 'get'});
  },
  post: async (url, body, options) => {
    return handleFetch(url, body, {...options, method: 'post'});
  },
  put: async (url, body, options) => {
    return handleFetch(url, body, {...options, method: 'put'});
  },
  patch: async (url, body, options) => {
    return handleFetch(url, body, {...options, method: 'patch'});
  },
  delete: async (url, body, options) => {
    return handleFetch(url, body, {...options, method: 'delete'});
  },
  // Pure
  getPure: async (url, body, options) => {
    return pureFetch(url, body, {...options, method: 'get'});
  },
  postPure: async (url, body, options) => {
    return pureFetch(url, body, {...options, method: 'post'});
  },
  putPure: async (url, body, options) => {
    return pureFetch(url, body, {...options, method: 'put'});
  },
  patchPure: async (url, body, options) => {
    return pureFetch(url, body, {...options, method: 'patch'});
  },
  deletePure: async (url, body, options) => {
    return pureFetch(url, body, {...options, method: 'delete'});
  },
}

const Api = {
  login: (body) => ApiService.postPure('/jwt/create', body),
  register: (body) => ApiService.postPure('/users', body)
}

export default Api;
