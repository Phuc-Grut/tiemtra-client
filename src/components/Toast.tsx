// src/components/Toast.tsx
import { VariantType, useSnackbar } from "notistack";
import { useCallback } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Typography } from "@mui/material";

const getIcon = (variant: VariantType) => {
  switch (variant) {
    case "success":
      return <CheckCircleIcon sx={{ color: "green", mr: 1, fontSize: 22 }} />;
    case "error":
      return <ErrorIcon sx={{ color: "red", mr: 1, fontSize: 22 }} />;
    case "info":
      return <InfoIcon sx={{ color: "blue", mr: 1, fontSize: 22 }} />;
    case "warning":
      return <WarningIcon sx={{ color: "orange", mr: 1, fontSize: 22 }} />;
    default:
      return null;
  }
};

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = useCallback(
    (message: string, variant: VariantType = "default") => {
      enqueueSnackbar(message, {
        variant,
        content: (key, message) => (
          <Box
            id={key.toString()}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#fff"
            borderRadius={1.5}
            boxShadow={2}
            px={2}
            py={1}
            sx={{
              minWidth: 180,
              whiteSpace: "normal",
            }}
          >
            {getIcon(variant)}
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ flexGrow: 1 }}
            >
              {message}
            </Typography>
          </Box>
        ),
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 2000,
      });
    },
    [enqueueSnackbar]
  );

  return {
    showSuccess: (msg: string) => showToast(msg, "success"),
    showError: (msg: string) => showToast(msg, "error"),
    showInfo: (msg: string) => showToast(msg, "info"),
    showWarning: (msg: string) => showToast(msg, "warning"),
  };
};

export default useToast;
