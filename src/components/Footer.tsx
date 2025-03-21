import***REMOVED***React***REMOVED***from***REMOVED***"react";
import***REMOVED***{***REMOVED***Box,***REMOVED***Typography***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";

const***REMOVED***Footer:***REMOVED***React.FC***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Box
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***width:***REMOVED***"100%",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***backgroundColor:***REMOVED***"#fff",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***padding:***REMOVED***"16px",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***textAlign:***REMOVED***"center",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***boxShadow:***REMOVED***"0px***REMOVED***-2px***REMOVED***5px***REMOVED***rgba(0,***REMOVED***0,***REMOVED***0,***REMOVED***0.1)",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Typography***REMOVED***variant="body2"***REMOVED***color="textSecondary">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***©***REMOVED***{new***REMOVED***Date().getFullYear()}***REMOVED***GStore.***REMOVED***All***REMOVED***rights***REMOVED***reserved.
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Typography>
***REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***Footer;
