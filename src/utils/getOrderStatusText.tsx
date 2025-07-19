import { Chip } from "@mui/material";
import { OrderStatus } from "src/Interfaces/IOrder";

export const getOrderStatusText = (status: number) => {
  switch (status) {
    case OrderStatus.Pending:
      return (
        <Chip
          label="Chờ xác nhận"
          size="small"
          sx={{
            backgroundColor: "#e0e0e0", // xám nhạt
            color: "#555",
            fontWeight: "bold",
          }}
        />
      );
    case OrderStatus.Confirmed:
      return (
        <Chip
          label="Đã xác nhận"
          size="small"
          sx={{
            backgroundColor: "#4caf50", // xanh lá
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case OrderStatus.Shipped:
      return (
        <Chip
          label="Đang Giao"
          size="small"
          sx={{
            backgroundColor: "#ff9800", // cam
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case OrderStatus.Delivered:
      return (
        <Chip
          label="Giao hàng thành công"
          size="small"
          sx={{
            backgroundColor: " #2196f3",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );

    case OrderStatus.DeliveryFailed:
      return (
        <Chip
          label="Giao hàng thất bại"
          size="small"
          sx={{
            backgroundColor: " #f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );

    case OrderStatus.CancelledByShop:
      return (
        <Chip
          label="Đã hủy"
          size="small"
          sx={{
            backgroundColor: " #9e9e9e",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );

    case OrderStatus.CancelledByUser:
      return (
        <Chip
          label="Người mua hủy đơn"
          size="small"
          sx={{
            backgroundColor: " #b71c1c",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );

    case OrderStatus.Refunded:
      return (
        <Chip
          label="Đã hoàn tiền"
          size="small"
          sx={{
            backgroundColor: " #3f51b5",
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

export default getOrderStatusText;
