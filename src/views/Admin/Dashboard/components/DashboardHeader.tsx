// src/views/Admin/Dashboard/components/DashboardHeader.tsx
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DashboardHeader({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <Box sx={{ mt: 6, display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="h5" fontWeight={800}>{title}</Typography>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}
