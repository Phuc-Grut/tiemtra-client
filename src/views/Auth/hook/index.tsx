import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  loginApi,
  logout,
  registerApi,
  verifyOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // đăng nhập
  const login = async (params: { email: string; password: string }) => {
    try {
      const result = await dispatch(loginApi(params)).unwrap();
      return result;
    } catch (error) {
      return null;
    }
  };

  // đăng ký
  const register = async (params: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    try {
      const result = await dispatch(registerApi(params)).unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || error || "Đăng ký thất bại!",
      };
    }
  };

  // xác thực otp
  const verifyOtp = async (params: { email: string; otp: string }) => {
    try {
      const result = await dispatch(verifyOtpApi(params)).unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      const message =
        typeof error === "string"
          ? error
          : error?.response?.data?.message || "Xác minh OTP thất bại";

      return {
        success: false,
        message,
      };
    }
  };

  // quên mật khẩu (gửi OTP)
  const forgotPassword = async (params: { email: string }) => {
    try {
      const result = await dispatch(forgotPasswordApi(params)).unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || error || "Không gửi được OTP!",
      };
    }
  };

  // đặt lại mật khẩu với OTP
  const resetPassword = async (params: {
    email: string;
    otp: string;
    newPassword: string;
  }) => {
    try {
      const result = await dispatch(resetPasswordApi(params)).unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || error || "Đặt lại mật khẩu thất bại!",
      };
    }
  };

  const logoutUser = () => dispatch(logout());

  return {
    user,
    loading,
    error,
    login,
    register,
    verifyOtp,
    forgotPassword,
    resetPassword,
    logout: logoutUser,
  };
};
