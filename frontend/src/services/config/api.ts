import axios from "axios";

const baseURL = "";
export const localURL = "http://localhost:3000";

const api = axios.create({
  baseURL: localURL,
  timeout: 25000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tokenRedeSocial");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("tokenRedeSocial");
    }
    return Promise.reject(error);
  }
);

export { api };
