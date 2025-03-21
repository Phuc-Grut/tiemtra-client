import***REMOVED***React***REMOVED***from***REMOVED***"react";
import***REMOVED***{***REMOVED***AppBar,***REMOVED***Toolbar,***REMOVED***IconButton,***REMOVED***Typography,***REMOVED***Badge,***REMOVED***Avatar***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***{***REMOVED***Notifications,***REMOVED***Menu,***REMOVED***Call,***REMOVED***NetworkWifi3Bar***REMOVED***}***REMOVED***from***REMOVED***"@mui/icons-material";

const***REMOVED***TopBar***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<AppBar
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED******REMOVED******REMOVED***position="fixed"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***width:***REMOVED***"calc(100%***REMOVED***-***REMOVED***240px)",***REMOVED***//***REMOVED***Để***REMOVED***tránh***REMOVED***chồng***REMOVED***lên***REMOVED***sidebar***REMOVED***(nếu***REMOVED***có)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ml:***REMOVED***"240px",***REMOVED***//***REMOVED***Khoảng***REMOVED***cách***REMOVED***với***REMOVED***sidebar
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***backgroundColor:***REMOVED***"#fff",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***color:***REMOVED***"#333",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***boxShadow:***REMOVED***"0px***REMOVED***2px***REMOVED***5px***REMOVED***rgba(0,***REMOVED***0,***REMOVED***0,***REMOVED***0.1)",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Toolbar>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Icon***REMOVED***Menu***REMOVED***(Nếu***REMOVED***cần)***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<IconButton***REMOVED***edge="start"***REMOVED***sx={{***REMOVED***display:***REMOVED***{***REMOVED***sm:***REMOVED***"none"***REMOVED***}***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Menu***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</IconButton>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Typography***REMOVED***variant="h6"***REMOVED***sx={{***REMOVED***flexGrow:***REMOVED***1,***REMOVED***color:***REMOVED***"#333",***REMOVED***fontWeight:***REMOVED***"bold"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Typography>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<IconButton***REMOVED***sx={{***REMOVED***marginRight:***REMOVED***2,***REMOVED******REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Badge***REMOVED***badgeContent={3}***REMOVED***color="error">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Notifications***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Badge>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</IconButton>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<IconButton***REMOVED***sx={{***REMOVED***marginRight:***REMOVED***2,***REMOVED******REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Call***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</IconButton>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<IconButton***REMOVED***sx={{***REMOVED***marginRight:***REMOVED***2,***REMOVED******REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<NetworkWifi3Bar***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</IconButton>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Typography***REMOVED***variant="body1"***REMOVED***sx={{***REMOVED***marginRight:***REMOVED***2,***REMOVED***fontWeight:***REMOVED***"bold"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***PhucNh
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Typography>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Avatar***REMOVED***alt="User***REMOVED***Avatar"***REMOVED***src="https://source.unsplash.com/random/50x50"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Toolbar>
***REMOVED******REMOVED******REMOVED******REMOVED***</AppBar>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***TopBar;
