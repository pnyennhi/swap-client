import axios from "axios";
import { deleteUser } from "./redux/actions/user";

const Instance = axios.create({
  baseURL: "http://localhost:3001",
});

Instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("TOKEN_AUTH");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear();
      deleteUser();
      window.location.assign("/login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default Instance;
