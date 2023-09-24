import FetchService from './fetch';
import Token from './token';


class Api {

  constructor(Service) {
    this.fetch = Service
  }

  login(conf) {
    return this.fetch.post('/auth/token/obtain', conf);
  }
  
  logout(conf) {
    Token.clear();
  }

  register(conf) {
    return this.fetch.post('/users', conf);
  }

  getUserInfo(conf) {
    return this.fetch.post('/users/me', conf);
  }

  editUserInfo(conf) {
    return this.fetch.patch('/users/me', conf);
  }

  changePassword(conf) {
    return this.fetch.patch('/users/change-password', conf);
  }
}

const ApiService = new Api(FetchService);
export default ApiService;
