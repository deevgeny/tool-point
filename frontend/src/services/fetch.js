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
    // Update access token in headers.Authorization from local storage
    const token = TokenService.getAccessToken();
    if (token) {
      this.#headers.Authorization = `Bearer ${token}`;
    } else {
      delete this.#headers.Authorization
    }
  }

  #addHeadersAuthorization() {
    // Add access token to headers.Authorization
    if (!this.#headers?.Authorization) {
      this.#updateHeadersAuthorization();
    }
  }

  #createRequest(url, conf) {
    // Create request object
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

  async #refreshAccessToken() {
    // Send request and refresh access token
    if (TokenService.isRefreshTokenValid()) {
      const headers = { ...this.#headers };
      delete headers.Authorization;
      const request = new Request(`${this.#baseUrl}/auth/token/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh: TokenService.getRefreshToken() })
      });
      try {
        const response = await fetch(request);
        if (response.ok) {
          const data = await response.json();
          TokenService.updateAccessToken(data.access);
        } else {
          // Handle non 200's responses
        }
      } catch (error) {
        // Handle fetch error
      }
    } else {
      TokenService.clear();
    }
  }
  
  async #handleRequest(request, refreshed=false) {
    // Handle main request
    try {
      const response = await fetch(request);
      if (response?.status === 401 && !refreshed) {
        this.#refreshAccessToken();
        this.#updateHeadersAuthorization();
        const newRequest = new Request(request, {
          headers: { ...this.#headers }
        });
        return this.#handleRequest(newRequest, true);
      } else if (response?.status === 401 && refreshed) {
        TokenService.clear();
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
