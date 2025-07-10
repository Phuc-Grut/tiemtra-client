import { Dispatch, SetStateAction } from "react";
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
  ChevronLeft,
  ChevronRight,
  TuneOutlined,
  Inventory2,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';

type SidebarProps = {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  // const [expanded, setExpanded] = useState(true);
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
      <div
        style={{
          width: "100%",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          paddingLeft: expanded ? "24px" : 0,
          paddingRight: expanded ? "16px" : 0,
          boxSizing: "border-box",
          marginTop: "0px",
        }}
      >
        <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              expanded ? "/image/logo/fullLogo.png" : "/image/logo/LogoIcon.png"
            }
            alt="Rookie Coders"
            style={{
              height: expanded ? 50 : 40,
              maxWidth: expanded ? 180 : 40,
              width: "auto",
              objectFit: "contain",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>

      <List sx={{ width: "100%" }}>
        <Tooltip
          title="Dashboard"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/dashboard"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <Dashboard />
            </ListItemIcon>
            {expanded && <ListItemText primary="Dashboard" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="Product"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/product"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <Inventory2  />
            </ListItemIcon>
            {expanded && <ListItemText primary="Sản phẩm" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="Order"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/order"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <LibraryBooks />
            </ListItemIcon>
            {expanded && <ListItemText primary="Đơn Bán Hàng" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="Customer"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/customer"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <InsertEmoticonRoundedIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Khách Hàng" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="category"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/category"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <CategoryOutlined />
            </ListItemIcon>
            {expanded && <ListItemText primary="Danh Mục" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="category"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/attribute"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <TuneOutlined  />
            </ListItemIcon>
            {expanded && <ListItemText primary="Thuộc tính" />}
          </ListItem>
        </Tooltip>

        <Tooltip
          title="Users"
          placement="right"
          disableHoverListener={expanded}
        >
          <ListItem
            component={Link}
            to="/admin/users"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
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
            to="/admin/settings"
            sx={{ cursor: "pointer", justifyContent: "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                paddingRight: expanded ? 1 : "auto",
                justifyContent: "center",
              }}
            >
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
