import***REMOVED***{***REMOVED***Routes,***REMOVED***Route***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom"
import***REMOVED***Register***REMOVED***from***REMOVED***"../views/Auth/pages/Register"
import***REMOVED***Login***REMOVED***from***REMOVED***"../views/Auth/pages/Login"
import***REMOVED***Dashboard***REMOVED***from***REMOVED***"../views/Dashboard"
const***REMOVED***AppRoutes***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Routes>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/register"***REMOVED***element={<Register***REMOVED***/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/login"***REMOVED***element={<Login/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/dashboard"***REMOVED***element={<Dashboard/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Routes>
***REMOVED******REMOVED***)
}

export***REMOVED***default***REMOVED***AppRoutes
