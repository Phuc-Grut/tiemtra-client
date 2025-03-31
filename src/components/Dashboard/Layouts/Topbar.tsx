import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from "@mui/material";
import { Notifications, Menu, Call, NetworkWifi3Bar } from "@mui/icons-material";

const TopBar = () => {
  return (
    <AppBar
    //   position="fixed"
      sx={{
        // width: "calc(100% - 240px)", // Để tránh chồng lên sidebar (nếu có)
        ml: "240px", // Khoảng cách với sidebar
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        {/* Icon Menu (Nếu cần) */}
        <IconButton edge="start" sx={{ display: { sm: "none" } }}>
          <Menu />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, color: "#333", fontWeight: "bold" }}>
          
        </Typography>

        <IconButton sx={{ marginRight: 2,  }}>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton sx={{ marginRight: 2,  }}>
            <Call />
        </IconButton>

        <IconButton sx={{ marginRight: 2,  }}>
            <NetworkWifi3Bar />
        </IconButton>

        <Typography variant="body1" sx={{ marginRight: 2, fontWeight: "bold" }}>
          PhucNh
        </Typography>
        <Avatar alt="User Avatar" src="https://source.unsplash.com/random/50x50" />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
