import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Notifications,
  Menu as MenuIcon,
  Call,
  NetworkWifi3Bar,
} from "@mui/icons-material";

type TopBarProps = {
  setExpanded: (value: boolean) => void;
};


const TopBar = ({ setExpanded } : TopBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{
        ml: isMobile ? 0 : "240px",
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        {/* Nút menu chỉ hiển thị ở mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={() => setExpanded(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: "#333", fontWeight: "bold" }}
        >
          {/* Có thể thêm tên app ở đây nếu muốn */}
        </Typography>

        <IconButton sx={{ marginRight: 2 }}>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton sx={{ marginRight: 2 }}>
          <Call />
        </IconButton>

        <IconButton sx={{ marginRight: 2 }}>
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
