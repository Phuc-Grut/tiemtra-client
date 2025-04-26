// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, fetchCategories } from "../store";

// export const useFetchCategories = (params: { pageNumber: number; pageSize: number }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { categories, loading, error } = useSelector((state: any) => state.category || {});
//     console.log("🚀 ~ useFetchCategories ~ categories:", categories)
  
//     useEffect(() => {
//       dispatch(fetchCategories(params));
//     }, [dispatch, params]);
//     console.log("🚀 ~ Redux Store categories:", categories);
  
//     return { categories: categories || [], loading, error };
//   };
export {}