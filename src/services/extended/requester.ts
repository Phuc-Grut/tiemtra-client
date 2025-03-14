import axios, { AxiosInstance, AxiosResponse } from "axios"
import qs from "qs"
import { getToken } from "./axiosInstance"

const responseBody = (response: AxiosResponse) => response.data;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://localhost:7021/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { indices: false })
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

export const requester = {
  get: (url: string, params = {}, config = {}) => axiosInstance.get(url, { params, ...config }).then(responseBody),

  post: (url: string, data = {}, config = {}) => axiosInstance.post(url, data, config).then(responseBody),

  put: (url: string, data = {}, config = {}) => axiosInstance.put(url, data, config).then(responseBody),

  delete: (url: string, params = {}, config = {}) => axiosInstance.delete(url, { params, ...config }).then(responseBody),

//   postForm: (url: string, data = {}, config = {}) =>
//     axiosInstance.postForm(url, data, {
//       headers: { "Content-Type": "multipart/form-data" },
//       ...config
//     }).then(responseBody)
}

export default requester
