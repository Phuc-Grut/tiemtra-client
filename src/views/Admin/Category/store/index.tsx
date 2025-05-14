// import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit"
// import { ICategory, ICategoryRequest } from "src/Interfaces/ICategory"
// import categoryApi from "src/services/api/Category"
// import categoryReducer from "src/views/Category/store/index"; 

// interface CategoryState {
//   categories: ICategory[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CategoryState = {
//   categories: [], //
//   loading: false,
//   error: null,
// };

// export const fetchCategories = createAsyncThunk<
//   ICategory[], // 
//   ICategoryRequest
// >(
//   "category/fetchCategories",
//   async (params: ICategoryRequest, thunkAPI) => {
//     try {
//       const response = await categoryApi.getPagingApi(params);

//       console.log("🚀 ~ response:", response.data.data.$values); // 

//       return response.data.data.$values; // 
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Lỗi khi tải danh mục");
//     }
//   }
// );

// // categorySlice
// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
      
//         console.log("🚀 ~ Fetched Categories from API:", action.payload); // 
      
//         if (Array.isArray(action.payload)) {
//           state.categories = action.payload; // u
//         } else {
//           state.categories = []; //
//         }
//       })
      
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         console.error("🚀 ~ Redux Fetch Categories Failed:", action.payload)
//       });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     category: categoryReducer, //
//   },
// });


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// // Xuất reducer 
// export default categorySlice.reducer
export {}