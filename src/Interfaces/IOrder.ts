export interface IOrder {
  orderId: string;
  orderCode: string;
  customerName: string;
  customerCode: string;
  receivertName?: string;
  receiverAddress?: string;
  receiverPhone?: string;
  totalAmount?: number;
  note: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createAt: string | Date;
  updateAt: string | Date;
  orderItems: IOrderItem
  shippingFee?: number
  totalOrderItems?: number
}

export enum OrderStatus {
  Pending = 0, // Đang chờ xử lý
  Confirmed = 1, // Đã xác nhận
  Shipped = 2, // Đang giao hàng
  Delivered = 3, // Đã giao hàng thành công

  DeliveryFailed = 4, // Giao hàng ko thành công
  CancelledByShop = 5, // Đã hủy
  CancelledByUser = 6, // Người dùng hủy đơn hàng
  Refunded = 7, // Đã hoàn tiền
}

export enum PaymentMethod {
  COD = 0, // Thanh toán khi nhận hàng
  BankTransfer = 1, // Chuyển khoản ngân hàng
}

export enum PaymentStatus {
  Unpaid = 0, // Chưa thanh toán(COD)
  Paid = 1, // Đã thanh toán
  RefundRequested = 2, // Yêu cầu hoàn tiền (khách)
  Refunded = 3, // Đã hoàn tiền
}

export interface IOrderFilter {
  orderCode?: string;
  customerCode?: string;
  orderStatus?: OrderStatus;
  paymentMethod?: PaymentMethod;
  PaymentStatus?: PaymentStatus;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface ICreateOrder {
  orderCode: string;
  note?: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  orderItems: ICreateOrderItem[];
  paymentMethod: PaymentMethod;
  shippingFee : number
}

export interface IOrderItem {
  productId: string;
  productVariationId?: string;
  productCode: string;
  productName: string;
  previewImageUrl: string;
  variationName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ICreateOrderItem {
  productId: string;
  productVariationId?: string;
  quantity: number;
}



export interface IOrderDetail {
  orderId: string;
  orderCode: string;
  customerName: string;
  customerCode: string;
  receivertName?: string;
  receiverAddress?: string;
  receiverPhone?: string;
  totalAmount?: number;
  note: string;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  createAt: string;
  updateAt: string;
  confirmedAt?: string;
  shippingFee: number;
  totalOrderItems: number;
  orderItems: IOrderItem[];
}
