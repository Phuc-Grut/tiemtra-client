import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import authApi from "src/services/api/Authentication";

interface UserType {
  userId: string;
  email: string;
  fullName: string;
  avatar?: string | null;
  [key: string]: any;
}

const initialState: {
  user: UserType | null;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: false,
  error: null,
};

// export const register = createAsyncThunk (
//   "auth/register",
//   async (userData) => {
//     const res = await authApi.register(userData)
//     return res.data
//   }
// )

export const loginApi = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authApi.login(params);
      const data = response.data;

      if (!data?.success || !data?.token) {
        return thunkAPI.rejectWithValue(
          data.message || "Sai tài khoản hoặc mật khẩu!"
        );
      }

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken || "");
      localStorage.setItem("user", JSON.stringify(data.data));

      localStorage.removeItem("cart");

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

export const registerApi = createAsyncThunk(
  "auth/register",
  async (
    params: {
      fullName: string;
      email: string;
      password: string;
      phoneNumber: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await authApi.register(params);
      const data = response.data;

      if (!data?.success) {
        return thunkAPI.rejectWithValue(data.message || "Đăng ký thất bại");
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi khi đăng ký"
      );
    }
  }
);

export const verifyOtpApi = createAsyncThunk(
  "auth/verifyOtp",
  async (params: { email: string; otp: string }, thunkAPI) => {
    try {
      const response = await authApi.verifyOtp(params);
      const data = response.data;

      if (!data?.success || !data.token) {
        return thunkAPI.rejectWithValue(data.message || "Mã OTP không đúng");
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const forgotPasswordApi = createAsyncThunk(
  "auth/forgotPassword",
  async (params: { email: string }, thunkAPI) => {
    try {
      const response = await authApi.forgotPassword(params);
      const data = response.data;
      // backend trả message trung lập, chỉ cần return
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Không gửi được OTP"
      );
    }
  }
);

export const resetPasswordApi = createAsyncThunk(
  "auth/resetPassword",
  async (
    params: { email: string; otp: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const response = await authApi.resetPassword(params);
      const data = response.data;

      if (!data?.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Đặt lại mật khẩu thất bại"
        );
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi khi đặt lại mật khẩu"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // đăng ký
      .addCase(registerApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // xác thực otp
      .addCase(verifyOtpApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyOtpApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(forgotPasswordApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // reset password
      .addCase(resetPasswordApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { logout } = authSlice.actions;
