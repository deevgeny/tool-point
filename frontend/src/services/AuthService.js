import ApiService from './ApiService';
import TokenService from './TokenService';
import { redirectDocument } from 'react-router-dom';

class Auth {

  async login({ email, password }) {
    const response = await ApiService.createToken({ email, password });
    if (response.status === 200) {
      const data = await response.json();
      TokenService.updateAccessToken(data.access);
      TokenService.updateRefreshToken(data.refresh);
      window.location.reload();
    }
    return response;
  }

  logout() {
    TokenService.removeAccessToken();
    TokenService.removeRefreshToken();
    window.location.reload();
  }
  
  async resolve() {
    if (!TokenService.isRefreshTokenValid()) {
      window.location.href = '/login';
    }
    const response = await ApiService.refreshToken();
    if (response.status === 200) {
      const data = await response.json();
      TokenService.updateAccessToken(data.access);
    } else if (response.status === 401) {
      window.location.href = '/login';
    }
    return response;
  }
}

const AuthService = new Auth();

export default AuthService;