import TokenService from './token';


const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
const baseUrl = `${API_URL}${API_PREFIX}${API_VERSION}`;


class Fetch {
  // fetch() wrapper
  #baseUrl;
  #headers;
  
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
    this.#headers = {'Content-Type': 'application/json'};
  }

  #updateHeadersAuthorization() {
    const token = TokenService.getAccessToken();
    if (token) {
      this.#headers.Authorization = `Bearer ${token}`;
    } else {
      delete this.#headers.Authorization
    }
  }

  #addHeadersAuthorization() {
    if (!this.#headers?.Authorization) {
      this.#updateHeadersAuthorization();
    }
  }

  #createRequest(url, conf) {
    this.#addHeadersAuthorization();
    const request = new Request(
      `${this.#baseUrl}${url}`,
      {
        method: conf?.method,
        headers: { ...this.#headers },
        body: JSON.stringify(conf?.body),
        signal: conf?.signal
      }
    );
      return request;
  }

  async #handleRequest(request) {
    try {
      let response = await fetch(request);
      // If access token is not valid
      if (response?.status === 401 && !TokenService.isAccessTokenValid()) {
        // If refresh token is valid (try to refresh access token)
        if (TokenService.isRefreshTokenValid()) {
          // Prepare refresh token request
          const headers = { ...this.#headers };
          delete headers.Authorization;
          const req = new Request(`${this.#baseUrl}/auth/token/refresh`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ refresh: TokenService.getRefreshToken() })
          });
          // Send refresh token request
          const refreshRequest = await fetch(req);
          const data = await refreshRequest.json();
          // Update access token in local storage and update headers
          TokenService.updateAccessToken(data.access);
          this.#updateHeadersAuthorization();
          // Update original request with new headers and resend it
          const newRequest = new Request(request, {
            headers: { ...this.#headers }
          });
          response = await fetch(newRequest);
        } else {
          TokenService.clear();
        }
      }
      return response;
    } catch (error) {
      return error;
    }
  }
  
  get(url, conf = {}) {
    // Main entrypoint to send request or create API function calls
    const request = this.#createRequest(url, { method: 'GET', ...conf });
    return this.#handleRequest(request);
  }

  post(url, conf={}) {
    // Main entrypoint to send request or create API function calls
    const request = this.#createRequest(url, { method: 'POST', ...conf });
    return this.#handleRequest(request);
  }
  
  put(url, conf = {}) {
    // Main entrypoint to send request or create API function calls
    const request = this.#createRequest(url, { method: 'PUT', ...conf });
    return this.#handleRequest(request);
  }
  
  patch(url, conf = {}) {
    // Main entrypoint to send request or create API function calls
    const request = this.#createRequest(url, { method: 'PATCH', ...conf });
    return this.#handleRequest(request);
  }
  
  delete(url, conf = {}) {
    // Main entrypoint to send request or create API function calls
    const request = this.#createRequest(url, { method: 'DELETE', ...conf });
    return this.#handleRequest(request);
  }
}

const FetchService = new Fetch(baseUrl);
export default FetchService;
