import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Notifications,
  Menu as MenuIcon,
  Call,
  NetworkWifi3Bar,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "src/hook/useCurrentUser";

type TopBarProps = {
  setExpanded: (value: boolean) => void;
};

const TopBar = ({ setExpanded }: TopBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user = useCurrentUser();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.dispatchEvent(new Event("userChanged"));
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        ml: isMobile ? 0 : "240px",
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        height: "56px",
        justifyContent: "center",
      }}
    >
      <Toolbar>
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
        ></Typography>

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

        <IconButton onClick={handleMenuOpen}>
          <Avatar
            alt="User Avatar"
            src={user?.avatar || "https://source.unsplash.com/random/50x50"}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {!user ? (
            <MenuItem onClick={() => navigate("/login")}>Đăng nhập</MenuItem>
          ) : (
            <>
              <MenuItem disabled>{user.fullName}</MenuItem>
              <MenuItem onClick={() => alert("Xem thông tin tài khoản")}>
                Thông tin tài khoản
              </MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </>
          )}
        </Menu>

        {user && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Xin chào, {user.fullName.split(" ").pop()}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
