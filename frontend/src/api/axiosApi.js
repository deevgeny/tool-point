import axios from 'axios';
import TokenService from '../services/token';

const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
const baseUrl = `${API_URL}${API_PREFIX}${API_VERSION}`;

const axiosApi = axios.create({
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

axiosApi.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  response => response,
  
  async (error) => {
    // Refresh access token if refresh token is valid
    if (TokenService.isRefreshTokenValid()) {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const data = JSON.stringify({ refresh: TokenService.getRefreshToken() });
        const response = await axiosRefresh.post('/auth/token/refresh', data);
        prevRequest.headers['Authorization'] = `Bearer ${response?.data.access}`;
        TokenService.updateAccessToken(response?.data.access);
        return axiosApi(prevRequest);
      }
    } else {
      // Remove tokens from storage when refresh token is expired
      TokenService.clear();
    }
    return Promise.reject(error);
  });

export default axiosApi;