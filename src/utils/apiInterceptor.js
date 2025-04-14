import axios from "axios";
const baseURL = "https://polymer-nodejs.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
