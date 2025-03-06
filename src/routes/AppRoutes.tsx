import***REMOVED***{***REMOVED***BrowserRouter,***REMOVED***Routes,***REMOVED***Route***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom"
import***REMOVED***Register***REMOVED***from***REMOVED***"../views/Register"

const***REMOVED***AppRoutes***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Routes>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/register"***REMOVED***element={<Register***REMOVED***/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Routes>
***REMOVED******REMOVED******REMOVED******REMOVED***</BrowserRouter>
***REMOVED******REMOVED***)
}

export***REMOVED***default***REMOVED***AppRoutes
