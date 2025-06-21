import { Dispatch, SetStateAction } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Dashboard,
  People,
  Settings,
  CategoryOutlined,
  ChevronLeft,
  ChevronRight,
  TuneOutlined,
  Inventory2,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <Dashboard /> },
  { to: "/admin/product", label: "Sản phẩm", icon: <Inventory2 /> },
  { to: "/admin/category", label: "Danh Mục", icon: <CategoryOutlined /> },
  { to: "/admin/attribute", label: "Thuộc tính", icon: <TuneOutlined /> },
  { to: "/admin/users", label: "Users", icon: <People /> },
  { to: "/admin/settings", label: "Settings", icon: <Settings /> },
];

type SidebarProps = {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={expanded}
      onClose={() => setExpanded(false)}
      sx={{
        width: expanded ? 240 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: expanded ? 240 : 80,
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          px: 2,
        }}
      >
        <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={expanded ? "/image/logo/fullLogo.png" : "/image/logo/LogoIcon.png"}
            alt="Rookie Coders"
            style={{
              height: expanded ? 50 : 40,
              maxWidth: expanded ? 180 : 40,
              objectFit: "contain",
              transition: "all 0.3s ease",
            }}
          />
        </Link>
      </Box>

      {/* Menu */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname.startsWith(to);
          return (
            <Tooltip
              title={label}
              placement="right"
              disableHoverListener={expanded}
              key={label}
            >
              <ListItem
                component={Link}
                to={to}
                sx={{
                  cursor: "pointer",
                  justifyContent: expanded ? "flex-start" : "center",
                  backgroundColor: isActive ? "#e3f2fd" : "inherit",
                  borderLeft: isActive ? "4px solid #1976d2" : "4px solid transparent",
                  px: 2,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    pr: expanded ? 2 : 0,
                    color: isActive ? "#1976d2" : "inherit",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "#1976d2" : "inherit",
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      {/* Toggle Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: expanded ? "flex-end" : "center",
          px: 1,
          pb: 2,
        }}
      >
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#0B29F4",
              color: "white",
              transform: "scale(1.1)",
            },
          }}
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
