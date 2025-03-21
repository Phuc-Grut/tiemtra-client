import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Dashboard,
  People,
  Settings,
  CategoryOutlined,
  AlignHorizontalLeft,
  AlignHorizontalRight,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={expanded}
      onClose={() => setExpanded(false)}
      sx={{
        width: expanded ? 240 : 80,
        height: "100vh",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: expanded ? 240 : 80,
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        },
      }}
    >
      {/* Danh sách menu (VẪN Ở TRÊN) */}
      <List sx={{ width: "100%" }}>
        <Tooltip
          title="Dashboard"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/dashboard"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            {expanded && <ListItemText primary="Dashboard" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="category"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/category"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            {expanded && <ListItemText primary="Danh Mục" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="Users"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/users"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            {expanded && <ListItemText primary="Users" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="Settings"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/settings"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            {expanded && <ListItemText primary="Settings" />}
          </ListItem>
        </Tooltip>
      </List>

      <IconButton
        onClick={() => setExpanded(!expanded)}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "-15px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#0B29F4",
            color: "white",
            transform: "translateY(-50%) scale(1.1)",
          },
        }}
      >
        {expanded ? (
          <ChevronLeft fontSize="large" />
        ) : (
          <ChevronRight fontSize="large" />
        )}
      </IconButton>
    </Drawer>
  );
};

export default Sidebar;
