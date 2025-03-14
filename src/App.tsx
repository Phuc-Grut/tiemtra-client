import***REMOVED***{***REMOVED***Provider***REMOVED***}***REMOVED***from***REMOVED***"react-redux"
import***REMOVED***{***REMOVED***BrowserRouter***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom"
import***REMOVED***AppRoutes***REMOVED***from***REMOVED***"./routes/AppRoutes"
import***REMOVED***{***REMOVED***store***REMOVED***}***REMOVED***from***REMOVED***"./views/Auth/store"

const***REMOVED***App:***REMOVED***React.FC***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Provider***REMOVED***store={store}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AppRoutes***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED***</Provider>
***REMOVED******REMOVED***)
}

export***REMOVED***default***REMOVED***App
