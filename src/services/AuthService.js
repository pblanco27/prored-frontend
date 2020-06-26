import axios from "axios";
import { API } from "./env";

const TOKEN_NAME = "token";
class AuthService {
  async authenticate(user) {
    try {
      const res = await axios.post(`${API}/user/authenticate`, user);
      this.setToken(res.data.token);
      return res.data.token;
    } catch (error) {
      console.log(error);
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
