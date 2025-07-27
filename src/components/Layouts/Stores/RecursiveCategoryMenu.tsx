// RecursiveCategoryMenu.tsx

import {
  Box,
  Button,
  MenuItem,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "src/services/api/Category";
import MobileCategoryMenu from "./MobileMenuDrawer";
import { slugify } from "src/utils/slugify";

interface CategoryNode {
  categoryId: number;
  categoryName: string;
  children?: CategoryNode[];
}

interface SubMenu {
  items: CategoryNode[];
  anchorEl: HTMLElement;
  level: number;
  position: { top: number; left: number };
}

export const RecursiveCategoryMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: categoryTree = [] } = useQuery({
    queryKey: ["category-tree"],
    queryFn: () => categoryApi.getAllTree().then((res) => res.data),
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [subMenus, setSubMenus] = useState<SubMenu[]>([]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterButton = (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(timeoutRef.current!);
    setAnchorEl(event.currentTarget);
    setSubMenus([]);
    setMenuVisible(true);
  };

  const handleMouseLeaveAll = () => {
    timeoutRef.current = setTimeout(() => {
      setMenuVisible(false);
      setSubMenus([]);
    }, 300);
  };

  const cancelClose = () => {
    clearTimeout(timeoutRef.current!);
  };

  const handleClickRoot = () => {
    navigate("/san-pham");
    setMenuVisible(false);
    setSubMenus([]);
  };

  const handleHoverItem = (
    e: React.MouseEvent<HTMLElement>,
    children: CategoryNode[] = [],
    level: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = {
      top: rect.top,
      left: rect.right,
    };

    const newSubMenus = subMenus.filter((m) => m.level < level);
    if (children.length > 0) {
      newSubMenus.push({
        items: children,
        anchorEl: e.currentTarget,
        level,
        position: pos,
      });
    }
    setSubMenus(newSubMenus);
  };

  const renderMenuItems = (items: CategoryNode[], level: number) =>
    items.map((item) => (
      <MenuItem
        key={item.categoryId}
        onMouseEnter={(e) => handleHoverItem(e, item.children || [], level)}
        onClick={() => {
          navigate(
            `/san-pham/danh-muc-san-pham/${slugify(item.categoryName)}`,
            {
              state: { categoryId: item.categoryId },
            }
          );
          setMenuVisible(false);
          setSubMenus([]);
        }}
        sx={{
          fontSize: 14,
          px: 2,
          py: 1.2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f5f5f5",
          "&:hover": {
            backgroundColor: "#f9f9f9",
            color: "#2e7d32",
          },
          "& svg": {
            color: "#aaa",
          },
        }}
      >
        <span>{item.categoryName}</span>

        {Array.isArray(item.children) && item.children.length > 0 && (
          <ChevronRightIcon fontSize="small" />
        )}
      </MenuItem>
    ));

  if (isMobile) {
    return (
      <>
        <Button
          size="small"
          onClick={() => setMobileOpen(true)}
          endIcon={<ExpandMoreIcon fontSize="small" />}
        >
          Sản phẩm
        </Button>
        <MobileCategoryMenu
          data={categoryTree}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </>
    );
  }

  return (
    <Box
      sx={{ position: "relative", display: "inline-block" }}
      onMouseEnter={cancelClose}
      onMouseLeave={handleMouseLeaveAll}
    >
      <Button
        size="small"
        onMouseEnter={handleMouseEnterButton}
        onClick={handleClickRoot}
        endIcon={<ExpandMoreIcon fontSize="small" />}
      >
        Sản phẩm
      </Button>

      {/* Menu cấp 0 */}
      {menuVisible && anchorEl && (
        <Paper
          sx={{
            position: "absolute",
            top: anchorEl.offsetHeight + 2,
            left: 0,
            zIndex: 1300,
            minWidth: 200,
            backgroundColor: "#fff",
            borderRadius: "4px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            border: "1px solid #eee",
            overflow: "hidden",
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={handleMouseLeaveAll}
        >
          {renderMenuItems(categoryTree, 0)}
        </Paper>
      )}

      {/* Submenus */}
      {subMenus.map((submenu) => (
        <Paper
          key={submenu.level}
          sx={{
            position: "fixed",
            top: submenu.position.top,
            left: submenu.position.left,
            zIndex: 1300 + submenu.level,
            minWidth: 200,
            backgroundColor: "#fff",
            borderRadius: "4px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            border: "1px solid #eee",
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={handleMouseLeaveAll}
        >
          {renderMenuItems(submenu.items, submenu.level + 1)}
        </Paper>
      ))}
    </Box>
  );
};
