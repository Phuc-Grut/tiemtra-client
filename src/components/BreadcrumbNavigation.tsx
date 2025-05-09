import React from "react";
import {
  Breadcrumbs,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";

export interface BreadcrumbItem {
  categoryId?: number;
  categoryName?: string;
}

interface BreadcrumbNavigationProps {
  items?: BreadcrumbItem[];
  pageTitle: string;
  pageUrl: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items = [],
  pageTitle,
  pageUrl,
}) => {
  const validCrumbs = items.filter((b) => b.categoryId !== -1);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightIcon fontSize="small" sx={{ mx: -1 }} />}
    >
      {/* Trang chủ */}
      <MuiLink
        component={RouterLink}
        to="/admin/dashboard"
        color="inherit"
        underline="hover"
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        <HomeIcon fontSize="small" />
        Trang chủ
      </MuiLink>

      {/* Tên trang hiện tại và clickable nếu có breadcrumbs con */}
      {validCrumbs.length > 0 ? (
        <MuiLink
          component={RouterLink}
          to={pageUrl}
          color="inherit"
          underline="hover"
        >
          {pageTitle}
        </MuiLink>
      ) : (
        <Typography color="text.primary">{pageTitle}</Typography>
      )}

      {/* Breadcrumb động: Danh mục con */}
      {validCrumbs.length > 0 &&
        validCrumbs.map((item, index) => {
          const isLast = index === validCrumbs.length - 1;
          const path =
            "/admin/category/" +
            validCrumbs
              .slice(0, index + 1)
              .map((i) => i.categoryId)
              .join("/");

          return isLast ? (
            <Typography key={item.categoryId} color="text.primary">
              {item.categoryName}
            </Typography>
          ) : (
            <MuiLink
              key={item.categoryId}
              component={RouterLink}
              to={path}
              underline="hover"
              color="inherit"
            >
              {item.categoryName}
            </MuiLink>
          );
        })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
