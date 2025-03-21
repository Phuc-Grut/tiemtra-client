import***REMOVED***React***REMOVED***from***REMOVED***"react";
import***REMOVED***{***REMOVED***Box***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***PageHeader***REMOVED***from***REMOVED***"src/components/PageHeader";
import***REMOVED***CategoryTable***REMOVED***from***REMOVED***"./components/CategoryTable";

const***REMOVED***Category:***REMOVED***React.FC***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Box
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***display:***REMOVED***"flex",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***flexDirection:***REMOVED***"column",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***flexGrow:***REMOVED***1,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***minHeight:***REMOVED***"calc(100vh***REMOVED***-***REMOVED***121px)",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***padding:***REMOVED***1,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***paddingTop:***REMOVED***5,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<PageHeader***REMOVED***title="Trang***REMOVED***Danh***REMOVED***Mục"***REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***flexGrow:***REMOVED***1,***REMOVED***marginTop:***REMOVED***1,***REMOVED***display:***REMOVED***"flex",***REMOVED***flexDirection:***REMOVED***"column"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CategoryTable***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***Category;
