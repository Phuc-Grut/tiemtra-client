import axios from "axios"
import authApi from "src/services/api/Authentication"
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
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const requester = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

requester.interceptors.request.use(
  (config) => {
    const excludedPaths = ["/auth/login", "/auth/register", "/auth/verify-otp", "/auth/resend-otp"];
    const shouldExclude = excludedPaths.some((path) => config.url?.includes(path));

    if (!shouldExclude) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

requester.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("Không tìm thấy Refresh Token");
        }

        const response = await authApi.refreshToken({ refreshToken });
        setTokens(response.data.token, response.data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token thất bại:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default requester;
