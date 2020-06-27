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

export function axiosHeaderFile() {
  const config = {
    headers: {
      token: authService.getToken(),
    },
    validateStatus: () => true,
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        this.setState({ uploadPercentage: percent });
      }
    }
  };
  return config;
}