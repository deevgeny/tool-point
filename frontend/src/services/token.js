import * as jose from 'jose';

class Token {
  // localStorage wrapper
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
  
  clear() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
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

  getAuthContext() {
    if (this.isRefreshTokenValid()) {
      return {
        access: this.getAccessToken(),
        refresh: this.getRefreshToken(),
        role: jose.decodeJwt(this.getAccessToken())?.role
      };
    }
    return {};
  }
}

const TokenService = new Token();

export default TokenService;