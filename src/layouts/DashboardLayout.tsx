import***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***Box***REMOVED***}***REMOVED***from***REMOVED***"@mui/material"
import***REMOVED***Sidebar***REMOVED***from***REMOVED***"../components/Sidebar"
import***REMOVED***{***REMOVED***Outlet***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom"

const***REMOVED***MainLayout:***REMOVED***React.FC***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***display:***REMOVED***"flex"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Sidebar***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***component="main"***REMOVED***sx={{***REMOVED***flexGrow:***REMOVED***1,***REMOVED***p:***REMOVED***3***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Outlet***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED***)
}

export***REMOVED***default***REMOVED***MainLayout
