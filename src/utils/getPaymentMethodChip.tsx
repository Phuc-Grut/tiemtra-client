import { Chip } from "@mui/material"; // sửa lại path theo project của bạn
import { PaymentMethod } from "src/Interfaces/IOrder";

export const getPaymentMethodChip = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.COD:
      return (
        <Chip
          label="Thanh toán COD"
          size="small"
          sx={{
            backgroundColor: "#f57c00", // cam đậm
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case PaymentMethod.BankTransfer:
      return (
        <Chip
          label="Chuyển khoản"
          size="small"
          sx={{
            backgroundColor: "#1976d2", // xanh dương
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    default:
      return (
        <Chip
          label="Không rõ"
          size="small"
          sx={{
            backgroundColor: "#9e9e9e", // xám
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
  }
};
