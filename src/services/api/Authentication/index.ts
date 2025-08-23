import { AUTHENTICATION } from "src/domain/constants";
import requester from "src/services/extended/axiosInstance";

export const register = (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  return requester.post("/auth/register", {
    fullName: name,
    email,
    password,
    phoneNumber: phone,
  });
};

const authApi = {
  login: (params: { email: string; password: string }) =>
    requester.post(AUTHENTICATION.URL_API.LOGIN_API, params),
  refreshToken: (params: { refreshToken: string }) =>
    requester.post(AUTHENTICATION.URL_API.REFRESH_TOKEN_API, params),
  register: (params: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => requester.post(AUTHENTICATION.URL_API.REGISTER_API, params),

  verifyOtp: (params: { email: string; otp: string }) =>
    requester.post(AUTHENTICATION.URL_API.VERIFY_OTP, params),

  forgotPassword: (params: { email: string }) =>
    requester.post(AUTHENTICATION.URL_API.FORGOT_PASSWORD_API, params),

  resetPassword: (params: {
    email: string;
    otp: string;
    newPassword: string;
  }) =>
    requester.post(
      AUTHENTICATION.URL_API.RESET_PASSWORD_API,
      params
    ),
};

export default authApi;
