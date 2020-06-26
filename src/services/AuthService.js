import { post_request } from '../helpers/Request'

const TOKEN_NAME = "token";

class AuthService {
  async authenticate(user) {
    try {
      const res = await post_request(`user/authenticate`, user);
      if (res.status){
        this.setToken(res.data.token);
        return res.data.token;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_NAME, token);
    } else {
      localStorage.setItem(TOKEN_NAME, null);
    }
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  isLogged() {
    return this.getToken() ? true : false;
  }
}

const authService = new AuthService();

export default authService;
