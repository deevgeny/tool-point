import axios from "axios";
import Token from "../services/token";

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
    "Content-Type": "application/json",
  },
});

const axiosRefresh = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = Token.getLocalAccessToken();
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
    // Refresh access token if access token exists in local storage and refresh token is valid
    if (Token.getLocalAccessToken() && Token.isLocalRefreshTokenValid()) {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const data = JSON.stringify({ refresh: Token.getLocalRefreshToken() });
        const response = await axiosRefresh.post("/auth/token/refresh", data);
        prevRequest.headers["Authorization"] = `Bearer ${response?.data.access}`;
        Token.updateLocalAccessToken(response?.data.access);
        return axiosApi(prevRequest);
      }
    }
    return Promise.reject(error);
  });

export default axiosApi;