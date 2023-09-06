import axios from "axios";
import Token from "../services/token";

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

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Token.getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const data = JSON.stringify({ refresh: Token.getLocalRefreshToken() });
      const response = await axiosRefresh.post("/jwt/refresh", data);
      prevRequest.headers["Authorization"] = `Bearer ${response?.data.access}`;
      Token.updateLocalAccessToken(response?.data.access);
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  });

export default axiosInstance;