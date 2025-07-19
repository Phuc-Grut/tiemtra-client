import { OrderStatus } from "src/Interfaces/IOrder";

const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
  0: [1, 5, 6], // Pending → Confirmed, CancelledByShop, CancelledByUser
  1: [2, 5],    // Confirmed → Shipped, CancelledByShop
  2: [3, 4],    // Shipped → Delivered, DeliveryFailed
  3: [7],       // Delivered → Refunded
  4: [2, 5],    // DeliveryFailed → Shipped, CancelledByShop
  5: [],
  6: [],
  7: [],
};

export const getValidTransitions = (current: OrderStatus): OrderStatus[] =>
  statusTransitions[current] || [];
