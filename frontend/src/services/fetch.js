import Token from './token';


const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
const baseUrl = `${API_URL}${API_PREFIX}${API_VERSION}`;


class MyFetch {
  // fetch() wrapper
  #baseUrl;
  #headers;
  
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
    this.#headers = {'Content-Type': 'application/json'};
  }

  #updateHeadersAuthorization() {
    // Update access token in headers.Authorization from local storage
    const token = Token.getLocalAccessToken();
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
        method: conf?.method || 'GET',
        headers: { ...this.#headers },
        body: conf?.body
      }
    );
      return request;
  }

  async #refreshAccessToken() {
    // Send request and refresh access token
    if (Token.isLocalRefreshTokenValid()) {
      const headers = { ...this.#headers };
      delete headers.Authorization;
      const request = new Request(`${this.#baseUrl}/auth/token/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh: Token.getLocalRefreshToken() })
      });
      try {
        const response = await fetch(request);
        if (response.ok) {
          const data = await response.json();
          Token.updateLocalAccessToken(data.access);
        } else {
          // Handle non 200's responses
        }
      } catch (error) {
        // Handle fetch error
      }
    } else {
      Token.clear();
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
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async sendRequest(url, conf={}) {
    // Main entrypoint to send request or create API function calls
    const request = this.#createRequest(url, conf);
    return this.#handleRequest(request);
  }
}

const myFetch = new MyFetch(baseUrl);
export default myFetch;
