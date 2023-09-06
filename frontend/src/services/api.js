import axios from "axios";
import Token from "./token";

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
  (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      console.log("inside interceptor response")
      const data = JSON.stringify({ refresh: Token.getLocalRefreshToken() });
      const response = axiosRefresh.post("/jwt/refresh", data);
      prevRequest.headers["Authorization"] = `Bearer ${response?.data.access}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  });

async function handleFetch(url, body, skip = [], options = {}) {
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
    } else if (skip.includes(error.response.status)) {
      // Return skipped errors to component
      return error.response
    }
    // Raise error
    return error.response;
  }
}

const ApiService = {
  get: async (url, body, skip, options) => {
    return handleFetch(url, body, skip, {...options, method: "get"});
  },
  post: async (url, body, skip, options) => {
    return handleFetch(url, body, skip, {...options, method: "post"});
  },
  put: async (url, body, skip, options) => {
    return handleFetch(url, body, skip, {...options, method: "put"});
  },
  patch: async (url, body, skip, options) => {
    return handleFetch(url, body, skip, {...options, method: "patch"});
  },
  delete: async (url, body, skip, options) => {
    return handleFetch(url, body, skip, {...options, method: "delete"});
  },
}

const Api = {
  login: (body, skip) => ApiService.post("/jwt/create", body, skip),
  register: (body, skip) => ApiService.post("/users", body, skip),
  getUserInfo: (body, skip) => ApiService.get("/users/me", body, skip)
}

export default Api;
