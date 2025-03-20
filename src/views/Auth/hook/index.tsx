import***REMOVED***{***REMOVED***useDispatch,***REMOVED***useSelector***REMOVED***}***REMOVED***from***REMOVED***"react-redux";
import***REMOVED***{***REMOVED***RootState,***REMOVED***AppDispatch,***REMOVED***loginApi,***REMOVED***logout***REMOVED***}***REMOVED***from***REMOVED***"../store";

export***REMOVED***const***REMOVED***useAuth***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***dispatch***REMOVED***=***REMOVED***useDispatch<AppDispatch>();
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***loading,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***useSelector((state:***REMOVED***RootState)***REMOVED***=>***REMOVED***state.auth);

***REMOVED******REMOVED***const***REMOVED***login***REMOVED***=***REMOVED***async***REMOVED***(params:***REMOVED***{***REMOVED***email:***REMOVED***string;***REMOVED***password:***REMOVED***string***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***result***REMOVED***=***REMOVED***await***REMOVED***dispatch(loginApi(params)).unwrap()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***login***REMOVED***~***REMOVED***result:",***REMOVED***result)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***result
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error("Lỗi***REMOVED***đăng***REMOVED***nhậppp:",***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***login***REMOVED***~***REMOVED***error:",***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED***}

***REMOVED******REMOVED***const***REMOVED***logoutUser***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***dispatch(logout())

***REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***user,
***REMOVED******REMOVED******REMOVED******REMOVED***loading,
***REMOVED******REMOVED******REMOVED******REMOVED***error,
***REMOVED******REMOVED******REMOVED******REMOVED***login,
***REMOVED******REMOVED******REMOVED******REMOVED***logout:***REMOVED***logoutUser
***REMOVED******REMOVED***}
}
