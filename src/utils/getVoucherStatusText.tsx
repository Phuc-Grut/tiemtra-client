import { Chip } from "@mui/material";
import { VoucherStatus } from "src/Interfaces/IVoucher";

export const getVoucherStatusText = (status: number) => {
  switch (status) {
    case VoucherStatus.Pending:
      return (
        <Chip
          label="Chờ áp dụng"
          size="small"
          sx={{
            backgroundColor: "#e0e0e0", // xám nhạt
            color: "#555",
            fontWeight: "bold",
          }}
        />
      );

    case VoucherStatus.Publish:
      return (
        <Chip
          label="Đang hoạt động"
          size="small"
          sx={{
            backgroundColor: "#4caf50", // xanh lá
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
            backgroundColor: "#9e9e9e", // xám
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
  }
};

export default getVoucherStatusText;
