import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ModalConfirmProps {
  open: boolean;
  title?: string;
  message: string | string[];
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  showConfirmButton?: boolean;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  open,
  title = "Xác nhận",
  message,
  onClose,
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  showConfirmButton,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        {title}
      </DialogTitle>
      <DialogContent sx={{ maxHeight: 300, overflowY: "auto" }}>
        {Array.isArray(message) ? (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {message[0]}
            </Typography>
            <ul style={{ paddingLeft: "1.2em" }}>
              {message.slice(1).map((msg, index) => (
                <li key={index}>
                  <Typography variant="body2">{msg}</Typography>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Typography variant="body2">{message}</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          color={showConfirmButton ? "error" : "inherit"}
          disabled={!showConfirmButton}
          onClick={onConfirm}
          sx={!showConfirmButton ? { opacity: 0.6, cursor: "not-allowed" } : {}}
        >
          {confirmText}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirm;
