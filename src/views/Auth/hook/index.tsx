import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, loginApi, logout } from "../store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const login = async (params: { email: string; password: string }) => {
    try {
      const result = await dispatch(loginApi(params)).unwrap(); // ✅ Bắt lỗi đúng cách
      return result; // ✅ Trả về kết quả nếu thành công
    } catch (error) {
      console.error("Lỗi đăng nhậppp:", error);
      return null; // ❌ Nếu thất bại, trả về `null`
    }
  };

  const logoutUser = () => dispatch(logout());

  return {
    user,
    loading,
    error,
    login,
    logout: logoutUser,
  };
};
