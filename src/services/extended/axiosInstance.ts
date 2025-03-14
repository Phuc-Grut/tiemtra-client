import axios from "axios"

const API_URL = "https://localhost:7021/api"

export const getToken = (): string | null => {
  let accessToken = localStorage.getItem("access_token");
  
  if (!accessToken) {
    try {
      const userData = localStorage.getItem("userData");
      accessToken = userData ? JSON.parse(userData)?.id_token : null;
    } catch (error) {
      console.error("Lỗi khi parse userData:", error);
      accessToken = null;
    }
  }

  return accessToken;
}

const requester = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

requester.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default requester
