//***REMOVED***import***REMOVED***{***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***"react";
//***REMOVED***import***REMOVED***{***REMOVED***useDispatch,***REMOVED***useSelector***REMOVED***}***REMOVED***from***REMOVED***"react-redux";
//***REMOVED***import***REMOVED***{***REMOVED***AppDispatch,***REMOVED***fetchCategories***REMOVED***}***REMOVED***from***REMOVED***"../store";

//***REMOVED***export***REMOVED***const***REMOVED***useFetchCategories***REMOVED***=***REMOVED***(params:***REMOVED***{***REMOVED***pageNumber:***REMOVED***number;***REMOVED***pageSize:***REMOVED***number***REMOVED***})***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***dispatch***REMOVED***=***REMOVED***useDispatch<AppDispatch>();
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***categories,***REMOVED***loading,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***useSelector((state:***REMOVED***any)***REMOVED***=>***REMOVED***state.category***REMOVED***||***REMOVED***{});
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***useFetchCategories***REMOVED***~***REMOVED***categories:",***REMOVED***categories)
***REMOVED******REMOVED***
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***dispatch(fetchCategories(params));
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***[dispatch,***REMOVED***params]);
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***Redux***REMOVED***Store***REMOVED***categories:",***REMOVED***categories);
***REMOVED******REMOVED***
//***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{***REMOVED***categories:***REMOVED***categories***REMOVED***||***REMOVED***[],***REMOVED***loading,***REMOVED***error***REMOVED***};
//***REMOVED******REMOVED******REMOVED***};
export***REMOVED***{}