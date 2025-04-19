import axios from "axios";
import type { AxiosError } from "axios";

const request = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default request;
