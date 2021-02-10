import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig
} from "axios";

class HttpMethod {
  axios: AxiosInstance;
  interceptors: any;
  constructor() {
    this.axios = axios;
    this.interceptors = null;
  }

  attachTokenToHeader(token: string) {
    this.interceptors = this.axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: any, config: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  put(url: string, data: any, config: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }
}

export default new HttpMethod();
