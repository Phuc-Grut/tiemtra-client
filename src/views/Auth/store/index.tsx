import***REMOVED***{***REMOVED***configureStore,***REMOVED***createSlice,***REMOVED***createAsyncThunk***REMOVED***}***REMOVED***from***REMOVED***"@reduxjs/toolkit"
import***REMOVED***authApi***REMOVED***from***REMOVED***"src/services/api/Authentication"
const***REMOVED***initialState:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***user:***REMOVED***string***REMOVED***|***REMOVED***null
***REMOVED******REMOVED******REMOVED******REMOVED***loading:***REMOVED***boolean
***REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***string***REMOVED***|***REMOVED***null
***REMOVED******REMOVED***}***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***user:***REMOVED***null,
***REMOVED******REMOVED******REMOVED******REMOVED***loading:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***null,
***REMOVED******REMOVED***}

export***REMOVED***const***REMOVED***loginApi***REMOVED***=***REMOVED***createAsyncThunk(
***REMOVED******REMOVED***"auth/login",
***REMOVED******REMOVED***async***REMOVED***(params:***REMOVED***{***REMOVED***email:***REMOVED***string;***REMOVED***password:***REMOVED***string***REMOVED***},***REMOVED***thunkAPI)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***response***REMOVED***=***REMOVED***await***REMOVED***authApi.login(params)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***data***REMOVED***=***REMOVED***response.data;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***data:",***REMOVED***data)

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!data?.success***REMOVED***||***REMOVED***!data?.token)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***thunkAPI.rejectWithValue(data.message***REMOVED***||***REMOVED***"Sai***REMOVED***tài***REMOVED***khoản***REMOVED***hoặc***REMOVED***mật***REMOVED***khẩu!")
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***localStorage.setItem("access_token",***REMOVED***data.Token)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data;
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error:***REMOVED***any)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***thunkAPI.rejectWithValue(error.response?.data?.message***REMOVED***||***REMOVED***"Đăng***REMOVED***nhập***REMOVED***thất***REMOVED***bại")
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***}
)

const***REMOVED***authSlice***REMOVED***=***REMOVED***createSlice({
***REMOVED******REMOVED***name:***REMOVED***"auth",
***REMOVED******REMOVED***initialState,
***REMOVED******REMOVED***reducers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***logout:***REMOVED***(state)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.user***REMOVED***=***REMOVED***null;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***localStorage.removeItem("access_token");
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***},
***REMOVED******REMOVED***extraReducers:***REMOVED***(builder)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***builder
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.addCase(loginApi.pending,***REMOVED***(state)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.loading***REMOVED***=***REMOVED***true;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.error***REMOVED***=***REMOVED***null;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.addCase(loginApi.fulfilled,***REMOVED***(state,***REMOVED***action)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.loading***REMOVED***=***REMOVED***false;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.user***REMOVED***=***REMOVED***action.payload;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.addCase(loginApi.rejected,***REMOVED***(state,***REMOVED***action)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.loading***REMOVED***=***REMOVED***false;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.error***REMOVED***=***REMOVED***action.payload***REMOVED***as***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED***}
})

export***REMOVED***const***REMOVED***store***REMOVED***=***REMOVED***configureStore({
***REMOVED******REMOVED***reducer:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***auth:***REMOVED***authSlice.reducer,
***REMOVED******REMOVED***}
})

export***REMOVED***type***REMOVED***RootState***REMOVED***=***REMOVED***ReturnType<typeof***REMOVED***store.getState>
export***REMOVED***type***REMOVED***AppDispatch***REMOVED***=***REMOVED***typeof***REMOVED***store.dispatch

export***REMOVED***const***REMOVED***{***REMOVED***logout***REMOVED***}***REMOVED***=***REMOVED***authSlice.actions
