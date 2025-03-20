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

// ✅ Hàm lấy Refresh Token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
}

// ✅ Hàm lưu token mới
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

// ✅ Tạo Axios instance
const requester = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// ✅ Interceptor để tự động gửi Access Token với mọi request
requester.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

//  Interceptor để tự động Refresh Token nếu Access Token hết hạn
requester.interceptors.response.use(
  (response) => response, // ✅ Nếu response thành công, trả về bình thường
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và chưa thử refresh token, thì thử làm mới token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("Không tìm thấy Refresh Token");
        }

        //  Gọi API refresh token
        const response = await authApi.refreshToken({ refreshToken });

        //  Lưu token mới vào localStorage
        setTokens(response.data.token, response.data.refreshToken);

        // ✅Gán token mới vào headers của request cũ và gửi lại
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token thất bại:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
      }
    }

    return Promise.reject(error);
  }
);

export default requester;
