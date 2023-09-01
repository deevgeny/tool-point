import * as jose from 'jose';

class Token {
  getAccessToken() {
    return localStorage.getItem('access');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh');
  }

  updateAccessToken(token) {
    localStorage.setItem('access', token);
  }
  
  updateRefreshToken(token) {
    localStorage.setItem('refresh', token);
  }
  
  removeAccessToken() {
    localStorage.removeItem('access');
  }
  
  removeRefreshToken() {
    localStorage.removeItem('refresh');
  }

  isAccessTokenValid() {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = jose.decodeJwt(token);
      const currentTimeStamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimeStamp;
    }
    return false;

  }

  isRefreshTokenValid() {
    const token = this.getRefreshToken();
    if (token) {
      const decodedToken = jose.decodeJwt(token);
      const currentTimeStamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimeStamp;
    }
    return false;
  }
}

const TokenService = new Token();

export default TokenService;