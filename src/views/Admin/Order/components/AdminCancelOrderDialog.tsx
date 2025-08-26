// AdminCancelOrderDialog.tsx
import { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from "@mui/material";
import orderApi from "src/services/api/Order";
import useToast from "src/components/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: string;
  onSuccess?: () => void; // optional: refetch sau khi hủy
}

const AdminCancelOrderDialog = ({ open, onClose, orderId, onSuccess }: Props) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  const handleCancel = async () => {
    if (!reason.trim()) return showError("Vui lòng nhập lý do hủy đơn");
    try {
      setLoading(true);
      const res = await orderApi.CANCEL_BY_ADMIN(orderId, reason.trim());
      const payload = (res as any)?.data ?? res;

      if (payload?.success) {
        showSuccess(payload?.message || "Hủy đơn thành công");
        onSuccess?.();
        onClose();
      } else {
        showError(payload?.message || "Hủy đơn thất bại");
      }
    } catch (error: any) {
      showError(error?.response?.data?.message || "Có lỗi xảy ra khi hủy đơn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3, p: 1, boxShadow: 12, width: { xs: "100%", sm: 560 } } }}
      sx={{ "& .MuiBackdrop-root": { backdropFilter: "blur(2px)", backgroundColor: "rgba(0,0,0,0.2)" } }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.25rem" }, pb: 1 }}>
        Hủy đơn hàng (Admin)
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <TextField
          autoFocus
          label="Lý do hủy"
          fullWidth
          multiline
          minRows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Ví dụ: Sai thông tin / Không đủ hàng / Nghi ngờ gian lận..."
          sx={{ mt: 1, "& .MuiInputBase-root": { fontSize: "1rem", alignItems: "start", p: 1.5 } }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, justifyContent: "space-between" }}>
        <Button onClick={onClose} disabled={loading}>Đóng</Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleCancel}
          disabled={!reason.trim() || loading}
          sx={{ fontWeight: 600 }}
        >
          {loading ? "Đang hủy..." : "Xác nhận hủy"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminCancelOrderDialog;
