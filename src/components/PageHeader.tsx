import React from "react";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  sx?: SxProps<Theme>; 
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onAddClick, sx }) => {


  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "8px",
        height: "30px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        marginBottom: "0",
        marginTop: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight:'35px',
        ...sx
      }}
    >
      <Typography variant="body1" fontWeight="500">
        {title}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddIcon />}
        onClick={onAddClick}
        sx={{ textTransform: "none", justifyContent: "center", maxHeight: '27px'}}
      >
        Thêm
      </Button>
    </Box>
  );
};

export default PageHeader;
