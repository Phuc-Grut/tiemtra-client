//***REMOVED***import***REMOVED***{***REMOVED***createSlice,***REMOVED***createAsyncThunk,***REMOVED***configureStore***REMOVED***}***REMOVED***from***REMOVED***"@reduxjs/toolkit"
//***REMOVED***import***REMOVED***{***REMOVED***ICategory,***REMOVED***ICategoryRequest***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/ICategory"
//***REMOVED***import***REMOVED***categoryApi***REMOVED***from***REMOVED***"src/services/api/Category"
//***REMOVED***import***REMOVED***categoryReducer***REMOVED***from***REMOVED***"src/views/Category/store/index";***REMOVED***

//***REMOVED***interface***REMOVED***CategoryState***REMOVED***{
//***REMOVED******REMOVED******REMOVED***categories:***REMOVED***ICategory[];***REMOVED***//***REMOVED***✅***REMOVED***Sửa***REMOVED***lại***REMOVED***thành***REMOVED***mảng***REMOVED***ICategory[]
//***REMOVED******REMOVED******REMOVED***loading:***REMOVED***boolean;
//***REMOVED******REMOVED******REMOVED***error:***REMOVED***string***REMOVED***|***REMOVED***null;
//***REMOVED***}

//***REMOVED***const***REMOVED***initialState:***REMOVED***CategoryState***REMOVED***=***REMOVED***{
//***REMOVED******REMOVED******REMOVED***categories:***REMOVED***[],***REMOVED***//***REMOVED***✅***REMOVED***Đảm***REMOVED***bảo***REMOVED***kiểu***REMOVED***là***REMOVED***mảng***REMOVED***[]
//***REMOVED******REMOVED******REMOVED***loading:***REMOVED***false,
//***REMOVED******REMOVED******REMOVED***error:***REMOVED***null,
//***REMOVED***};

//***REMOVED***export***REMOVED***const***REMOVED***fetchCategories***REMOVED***=***REMOVED***createAsyncThunk<
//***REMOVED******REMOVED******REMOVED***ICategory[],***REMOVED***//***REMOVED***✅***REMOVED***Chỉ***REMOVED***trả***REMOVED***về***REMOVED***danh***REMOVED***mục
//***REMOVED******REMOVED******REMOVED***ICategoryRequest
//***REMOVED***>(
//***REMOVED******REMOVED******REMOVED***"category/fetchCategories",
//***REMOVED******REMOVED******REMOVED***async***REMOVED***(params:***REMOVED***ICategoryRequest,***REMOVED***thunkAPI)***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***response***REMOVED***=***REMOVED***await***REMOVED***categoryApi.getPagingApi(params);

//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***response:",***REMOVED***response.data.data.$values);***REMOVED***//***REMOVED***✅***REMOVED***Kiểm***REMOVED***tra***REMOVED***API***REMOVED***trả***REMOVED***về***REMOVED***đúng***REMOVED***không

//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***response.data.data.$values;***REMOVED***//***REMOVED***✅***REMOVED***Trả***REMOVED***về***REMOVED***danh***REMOVED***mục***REMOVED***trực***REMOVED***tiếp
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error:***REMOVED***any)***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***thunkAPI.rejectWithValue(error.response?.data?.message***REMOVED***||***REMOVED***"Lỗi***REMOVED***khi***REMOVED***tải***REMOVED***danh***REMOVED***mục");
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
//***REMOVED******REMOVED******REMOVED***}
//***REMOVED***);

//***REMOVED***//***REMOVED***categorySlice
//***REMOVED***const***REMOVED***categorySlice***REMOVED***=***REMOVED***createSlice({
//***REMOVED******REMOVED******REMOVED***name:***REMOVED***"category",
//***REMOVED******REMOVED******REMOVED***initialState,
//***REMOVED******REMOVED******REMOVED***reducers:***REMOVED***{},
//***REMOVED******REMOVED******REMOVED***extraReducers:***REMOVED***(builder)***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***builder
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.addCase(fetchCategories.pending,***REMOVED***(state)***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.loading***REMOVED***=***REMOVED***true;
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.error***REMOVED***=***REMOVED***null;
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.addCase(fetchCategories.fulfilled,***REMOVED***(state,***REMOVED***action)***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.loading***REMOVED***=***REMOVED***false;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***Fetched***REMOVED***Categories***REMOVED***from***REMOVED***API:",***REMOVED***action.payload);***REMOVED***//***REMOVED***✅***REMOVED***Kiểm***REMOVED***tra***REMOVED***Redux***REMOVED***có***REMOVED***nhận***REMOVED***đúng***REMOVED***dữ***REMOVED***liệu***REMOVED***không
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(Array.isArray(action.payload))***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.categories***REMOVED***=***REMOVED***action.payload;***REMOVED***//***REMOVED***✅***REMOVED***Lưu***REMOVED***vào***REMOVED***Redux***REMOVED***Store***REMOVED***đúng***REMOVED***kiểu
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.categories***REMOVED***=***REMOVED***[];***REMOVED***//***REMOVED***✅***REMOVED***Nếu***REMOVED***không***REMOVED***có***REMOVED***dữ***REMOVED***liệu,***REMOVED***đặt***REMOVED***mảng***REMOVED***rỗng
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.addCase(fetchCategories.rejected,***REMOVED***(state,***REMOVED***action)***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.loading***REMOVED***=***REMOVED***false;
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.error***REMOVED***=***REMOVED***action.payload***REMOVED***as***REMOVED***string;
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error("🚀***REMOVED***~***REMOVED***Redux***REMOVED***Fetch***REMOVED***Categories***REMOVED***Failed:",***REMOVED***action.payload)
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
//***REMOVED******REMOVED******REMOVED***},
//***REMOVED***});

//***REMOVED***export***REMOVED***const***REMOVED***store***REMOVED***=***REMOVED***configureStore({
//***REMOVED******REMOVED******REMOVED***reducer:***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***category:***REMOVED***categoryReducer,***REMOVED***//***REMOVED***✅***REMOVED***Đảm***REMOVED***bảo***REMOVED***reducer***REMOVED***có***REMOVED***tên***REMOVED***đúng
//***REMOVED******REMOVED******REMOVED***},
//***REMOVED***});


//***REMOVED***export***REMOVED***type***REMOVED***RootState***REMOVED***=***REMOVED***ReturnType<typeof***REMOVED***store.getState>
//***REMOVED***export***REMOVED***type***REMOVED***AppDispatch***REMOVED***=***REMOVED***typeof***REMOVED***store.dispatch
//***REMOVED***//***REMOVED***Xuất***REMOVED***reducer***REMOVED***
//***REMOVED***export***REMOVED***default***REMOVED***categorySlice.reducer
export***REMOVED***{}