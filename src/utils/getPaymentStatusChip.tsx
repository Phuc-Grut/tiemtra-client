import { Chip } from "@mui/material";
import { PaymentStatus } from "src/Interfaces/IOrder";

export const getPaymentStatusChip = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Unpaid:
      return (
        <Chip
          label="Chưa thanh toán"
          size="small"
          sx={{
            backgroundColor: "#e0e0e0", // xám nhạt
            color: "#555",
            fontWeight: "bold",
          }}
        />
      );
    case PaymentStatus.Paid:
      return (
        <Chip
          label="Đã thanh toán"
          size="small"
          sx={{
            backgroundColor: "#4caf50", // xanh lá
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case PaymentStatus.RefundRequested:
      return (
        <Chip
          label="Yêu cầu hoàn tiền"
          size="small"
          sx={{
            backgroundColor: "#ff9800", // cam
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case PaymentStatus.Refunded:
      return (
        <Chip
          label="Đã hoàn tiền"
          size="small"
          sx={{
            backgroundColor: "#3f51b5", // xanh tím
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    default:
      return (
        <Chip
          label="Không xác định"
          size="small"
          sx={{
            backgroundColor: "#9e9e9e",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
  }
};
