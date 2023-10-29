import FetchService from './fetch';
import TokenService from './token';


class Api {

  constructor(FetchService) {
    this.fetch = FetchService;
  }

  login(conf) {
    return this.fetch.post('/auth/token/obtain', conf);
  }
  
  logout(conf) {
    TokenService.clear();
  }

  register(conf) {
    return this.fetch.post('/users', conf);
  }

  getPersonalData(conf) {
    return this.fetch.get('/users/me', conf);
  }

  editPersonalData(conf) {
    return this.fetch.patch('/users/me', conf);
  }

  changePassword(conf) {
    return this.fetch.patch('/users/change-password', conf);
  }

  getLineProblems(conf) {
    return this.fetch.get('/line-problems', conf);
  }
}

const ApiService = new Api(FetchService);
export default ApiService;
