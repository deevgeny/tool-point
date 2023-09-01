import TokenService from './TokenService';

const {
  REACT_APP_API_URL: API_URL,
  REACT_APP_API_PREFIX: API_PREFIX,
  REACT_APP_API_VERSION: API_VERSION
} = process.env;
const baseUrl = API_URL + API_PREFIX + API_VERSION;
const defaultHeaders = { 'Content-Type': 'application/json' };

async function createToken({ email, password }) {
  const endpoint = '/jwt/create'
  const request = new Request(baseUrl + endpoint, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify({ email, password })
  });
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    // Hint: error.name error.message
    return { status: 500, statusText: error.message };
  }
}

function logout() {
  TokenService.removeAccessToken();
  TokenService.removeRefreshToken();
}

async function refreshToken() {
  const refresh = TokenService.getRefreshToken();
  const endpoint = '/jwt/refresh';
  const request = new Request(baseUrl + endpoint, {
    method: 'POST',
    headers: { ...defaultHeaders },
    body: JSON.stringify({ refresh })
  });
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    // Hint: error.name error.message
    return {status: 500, statusText: error.message };
  }
}

async function myAccount() {
  const endpoint = '/users/me';
  const request = new Request(baseUrl + endpoint, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      Authorization: 'Bearer ' + TokenService.getAccessToken()
    }
  });

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      return { ...data, status: response.status, statusText: response.statusText };
    }
    return { status: response.status, statusText: response.statusText };
  } catch (error) {
    // Hint: error.name error.message
    return {status: 500, statusText: error.message };
  }

}

const ApiService = {
  createToken,
  logout,
  refreshToken,
  myAccount
}

export default ApiService;
