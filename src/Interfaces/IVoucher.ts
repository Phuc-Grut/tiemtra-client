export interface IVoucher {
  id: string;
  voucherId: string;
  voucherCode: string;
  voucherName: string;
  description: string;
  quantity: number;
  usedQuantity: number;
  discountPercentage: number;
  endDate: string;
  status: VoucherStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Create New Voucher
export interface CreateVoucherRequest {
  voucherName: string;
  description: string;
  quantity: number;
  discountPercentage: number;
  endDate: string;
}

// List Voucher
export interface VoucherPagingResponse {
  items: IVoucher[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Update Voucher
export interface UpdateVoucherRequest extends CreateVoucherRequest {}

//Apply Voucher
export interface ApplyVoucherRequest {
  voucherCode: string;
  orderTotal: number;
}

export interface ApplyVoucherResponse {
  isValid: boolean;
  message: string;
  discountAmount: number;
  finalAmount: number;
  voucherCode: string;
  discountPercentage: number;
  voucherId: string;
}

export interface IVoucherFilter {
  pageNumber: number;
  pageSize: number;
  status?: VoucherStatus;
  keyword?: string;
}


export enum VoucherStatus {
  Pending = 0,   // Chờ áp dụng
  Publish = 1,    // Đang hoạt động
  OutDate = 3,
  OutStock = 4
}
