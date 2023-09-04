import * as jose from 'jose';

class TokenService {
  getLocalAccessToken() {
    return localStorage.getItem('access');
  }

  getLocalRefreshToken() {
    return localStorage.getItem('refresh');
  }

  updateLocalAccessToken(token) {
    localStorage.setItem('access', token);
  }
  
  updateLocalRefreshToken(token) {
    localStorage.setItem('refresh', token);
  }
  
  clear() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
  }

  isLocalAccessTokenValid() {
    const token = this.getLocalAccessToken();
    if (token) {
      const decodedToken = jose.decodeJwt(token);
      const currentTimeStamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimeStamp;
    }
    return false;

  }

  isLocalRefreshTokenValid() {
    const token = this.getLocalRefreshToken();
    if (token) {
      const decodedToken = jose.decodeJwt(token);
      const currentTimeStamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimeStamp;
    }
    return false;
  }

  getLocalAuthContext() {
    if (this.isLocalAccessTokenValid() || this.isLocalRefreshTokenValid()) {
      return {
        access: this.getLocalAccessToken(),
        refresh: this.getLocalRefreshToken(),
        role: jose.decodeJwt(this.getLocalAccessToken()).role
      };
    }
    return {};
  }
}

const Token = new TokenService();

export default Token;