import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import orderApi from "src/services/api/Order";
import useToast from "src/components/Toast";

// CancelOrderButton.tsx
export default function CancelOrderButton({
  orderId,
  disabled,
  onSuccess,
}: {
  orderId: string;
  disabled?: boolean;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleCancel = async () => {
    if (!reason.trim()) return showError("Vui lòng nhập lý do hủy đơn");
    try {
      setLoading(true);
      const res = await orderApi.CANCEL_BY_CUSTOMER(orderId, reason.trim());

      if (res.data?.success) {
        showSuccess(res.data.message || "Hủy đơn thành công");
        onSuccess?.();
        setOpen(false);
        setReason("");
      } else {
        showError(res.data?.message || "Hủy đơn thất bại");
      }
    } catch (error: any) {
      showError(error?.response?.data?.message || "Có lỗi xảy ra khi hủy đơn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title={disabled ? "Đơn không thể hủy" : "Hủy đơn"}>
        <span>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            Hủy đơn
          </Button>
        </span>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm" // "xs" | "sm" | "md" | ...
        // mobile: fullScreen cho gọn
        fullScreen={false}
        PaperProps={{
          sx: {
            borderRadius: 3, // bo góc to
            p: 1, // padding nhẹ quanh content
            boxShadow: 12, // bóng đậm hơn
            width: { xs: "100%", sm: 560 }, // rộng hơn mặc định
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(2px)", // mờ nền
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            pb: 1,
          }}
        >
          Hủy đơn hàng
        </DialogTitle>

        <DialogContent
          sx={{
            pt: 1,
            "& .MuiFormControl-root": { width: "100%" },
          }}
        >
          <TextField
            autoFocus
            label="Lý do hủy"
            fullWidth
            multiline
            minRows={4} // ô nhập cao hơn
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ví dụ: Đặt nhầm sản phẩm / Đổi ý / Muốn thay địa chỉ..."
            sx={{
              mt: 1,
              "& .MuiInputBase-root": {
                fontSize: "1rem",
                alignItems: "start",
                p: 1.5, // ô nhập rộng rãi
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            pt: 1,
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => setOpen(false)}>Đóng</Button>
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
    </>
  );
}
