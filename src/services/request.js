import axios from "axios";
import { baseURL } from "../config/api";
import { ACCESS_TOKEN_KEY } from "../pages/Todo";
import customStorage from "../utils/customStorage";

// basic setting
const axiosRequest = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRequest.interceptors.request.use(
  (config) => {
    const storageToken = customStorage.getItem(ACCESS_TOKEN_KEY, null);

    try {
      if (storageToken) {
        config.headers.Authorization = `Bearer ${storageToken}`;
      }
      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosRequest;
