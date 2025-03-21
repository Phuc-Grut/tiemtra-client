import***REMOVED***React***REMOVED***from***REMOVED***"react";
import***REMOVED***{***REMOVED***Box***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***Sidebar***REMOVED***from***REMOVED***"../components/Sidebar";
import***REMOVED***{***REMOVED***Outlet***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom";
import***REMOVED***TopBar***REMOVED***from***REMOVED***"src/components/Topbar";
import***REMOVED***Footer***REMOVED***from***REMOVED***"src/components/Footer";

const***REMOVED***MainLayout:***REMOVED***React.FC***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***display:***REMOVED***"flex",***REMOVED***flexDirection:***REMOVED***"column",***REMOVED***minHeight:***REMOVED***"100vh",***REMOVED***backgroundColor:***REMOVED***"#EEEEEE",***REMOVED***overflowX:***REMOVED***"hidden"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***✅***REMOVED***TopBar***REMOVED***nằm***REMOVED***trên***REMOVED***cùng***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TopBar***REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***✅***REMOVED***Khu***REMOVED***vực***REMOVED***Sidebar***REMOVED***+***REMOVED***Nội***REMOVED***dung***REMOVED***chính***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***display:***REMOVED***"flex",***REMOVED***flexGrow:***REMOVED***1***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Sidebar***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Sidebar***REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Nội***REMOVED***dung***REMOVED***chính***REMOVED***+***REMOVED***Footer***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***flexGrow:***REMOVED***1,***REMOVED***display:***REMOVED***"flex",***REMOVED***flexDirection:***REMOVED***"column"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***✅***REMOVED***Nội***REMOVED***dung***REMOVED***sẽ***REMOVED***mở***REMOVED***rộng***REMOVED***và***REMOVED***đẩy***REMOVED***Footer***REMOVED***xuống***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***flexGrow:***REMOVED***1,***REMOVED***padding:***REMOVED***"10px",***REMOVED***display:***REMOVED***"flex",***REMOVED***flexDirection:***REMOVED***"column"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Outlet***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***✅***REMOVED***Footer***REMOVED***luôn***REMOVED***ở***REMOVED***dưới***REMOVED***cùng***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Footer***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***MainLayout;
