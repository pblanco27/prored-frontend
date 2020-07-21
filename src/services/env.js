import authService from "./AuthService";
export const API = "http://localhost:4000";

export function axiosHeader() {
  const config = {
    headers: {
      token: authService.getToken(),
    },
    validateStatus: () => true
  };
  return config;
}
