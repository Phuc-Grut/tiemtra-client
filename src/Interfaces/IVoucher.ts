export interface Voucher {
  id: string;
  voucherId: string;
  voucherCode: string;
  voucherName: string;
  description: string;
  quantity: number;
  usedquantity: number;
  discountPercentage: number;
  endDate: string;
  status: number;
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
  items: Voucher[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Update Voucher
export interface UpdateVoucherRequest extends CreateVoucherRequest {}
