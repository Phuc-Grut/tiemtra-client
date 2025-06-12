import { AUTHENTICATION } from "src/domain/constants"
import requester from "src/services/extended/axiosInstance"

export const register = (name: string, email: string, password: string, phone: string) => {
  return requester.post("/auth/register", {
    fullName: name,            
    email,
    password,
    phoneNumber: phone        
  });
};

const authApi = {
  login: (params: { email: string; password: string }) => requester.post(AUTHENTICATION.URL_API.LOGIN_API, params),
  refreshToken: (params: { refreshToken: string }) => requester.post(AUTHENTICATION.URL_API.REFRESH_TOKEN_API, params),
  register: (params: { fullName: string; email: string; password: string; phoneNumber: string }) =>
    requester.post(AUTHENTICATION.URL_API.REGISTER_API, params),
};
export const verifyOtp = (email: string, otp: string) => {
  return requester.post("/auth/verify-otp", {
    email,
    otp     
  });
};


export default authApi;