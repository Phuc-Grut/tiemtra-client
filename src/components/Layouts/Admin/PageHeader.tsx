import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BreadcrumbNavigation, { BreadcrumbItem } from "src/components/BreadcrumbNavigation";

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  showAddButton?: boolean;
  onAddClick?: () => void;
  pageTitle: string
  pageUrl: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  showAddButton = true,
  onAddClick,
  pageTitle,
  pageUrl
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "8px",
        height: "30px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        marginBottom: "0",
        marginTop: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "35px",
      }}
    >
      <BreadcrumbNavigation items={breadcrumbs} pageTitle={pageTitle} pageUrl={pageUrl} />

      {showAddButton && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{ textTransform: "none", maxHeight: "28px" }}
        >
          Thêm
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
