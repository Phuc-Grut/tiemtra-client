import { OrderStatus } from "src/Interfaces/IOrder";


export const getStatusDisplayName = (status: OrderStatus): string => {
  switch (status) {
    case 10: return "Chờ xác nhận";
    case 1: return "Đã xác nhận";
    case 2: return "Đang giao hàng";
    case 3: return "Đã giao hàng";
    case 4: return "Giao thất bại";
    default: return "Không xác định";
  }
};
