import { OrderStatus } from "src/Interfaces/IOrder";

const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
  10: [1], // Pending → Confirmed, CancelledByShop, CancelledByUser
  1: [2],    // Confirmed → Shipped, CancelledByShop
  2: [3, 4],    // Shipped → Delivered, DeliveryFailed
  3: [],       // Delivered → Refunded
  4: [2],    // DeliveryFailed → Shipped, CancelledByShop
  5: [],
  6: [],
};

export const getValidTransitions = (current: OrderStatus): OrderStatus[] =>
  statusTransitions[current] || [];
