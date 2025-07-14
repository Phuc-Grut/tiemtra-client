import { OrderStatus } from "src/Interfaces/IOrder";


export const getStatusDisplayName = (status: OrderStatus): string => {
  switch (status) {
    case 0: return "Chờ xác nhận";
    case 1: return "Đã xác nhận";
    case 2: return "Đang giao hàng";
    case 3: return "Đã giao hàng";
    case 4: return "Giao thất bại";
    case 5: return "Shop đã hủy";
    case 6: return "Khách đã hủy";
    case 7: return "Đã hoàn tiền";
    default: return "Không xác định";
  }
};
