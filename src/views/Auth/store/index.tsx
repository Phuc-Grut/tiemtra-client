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

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
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
        state.user = action.payload.data; // <-- chính xác
      })
      .addCase(loginApi.rejected, (state, action) => {
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
