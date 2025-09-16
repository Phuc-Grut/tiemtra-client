import { AxiosResponse } from "axios";
import requester from "src/services/extended/axiosInstance";
import {
  Voucher,
  CreateVoucherRequest,
  UpdateVoucherRequest,
  VoucherPagingResponse,
} from "src/Interfaces/IVoucher";

const ADMIN_VOUCHER = {
  CREATE: "admin/voucher/create",
  GET_PAGING: "admin/voucher/get-paging",
  GET_BY_ID: (id: string) => `admin/voucher/get-by-id/${id}`,
  UPDATE_STATUS: (id: string) => `admin/voucher/update-status/${id}`,
  UPDATE: (id: string) => `admin/voucher/update/${id}`,
  GENERATE_CODE: "admin/voucher/generate-code",
};

const STORE_VOUCHER = {
  GET_PUBLIC: "store/voucher/public",
  APPLY: "store/voucher/apply",
};

const VoucherApi = {
  // Tạo Voucher
  createVoucher: (data: {
    voucherName: string;
    description: string;
    quantity: number;
    discountPercentage: number;
    endDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  }): Promise<AxiosResponse<Voucher>> =>
    requester.post(ADMIN_VOUCHER.CREATE, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }),

  // Liệt kê voucher
  getPagingVoucher: (params: {
    pageNumber: number;
    pageSize: number;
    status?: number;
    keyword?: string;
  }): Promise<AxiosResponse<VoucherPagingResponse>> =>
    requester.get(ADMIN_VOUCHER.GET_PAGING, {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        status: params.status ?? undefined,
        keyword: params.keyword ?? undefined,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // lấy token admin
      },
    }),

  // Call voucher bằng ID (chưa dùng)
  getVoucherById: (id: string): Promise<AxiosResponse<Voucher>> =>
    requester.get(ADMIN_VOUCHER.GET_BY_ID(id)),

  // Update Voucher Trạng thái
  updateVoucherStatus: (
    id: string,
    status: number
  ): Promise<AxiosResponse<any>> =>
    requester.put(
      ADMIN_VOUCHER.UPDATE_STATUS(encodeURIComponent(id)),
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    ),

  // Update Voucher Info
  updateVoucher: (
    id: string,
    data: UpdateVoucherRequest
  ): Promise<AxiosResponse<Voucher>> =>
    requester.put(ADMIN_VOUCHER.UPDATE(id), data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }),

  // Tạo Code ngẫu nhiên cho voucher (không dùng)
  generateVoucherCode: (): Promise<AxiosResponse<{ code: string }>> =>
    requester.get(ADMIN_VOUCHER.GENERATE_CODE),

  // List các Voucher Public
  getPublicVouchers: (): Promise<AxiosResponse<Voucher[]>> =>
  requester.get("store/voucher/public", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),

  //Apply Voucher
  applyVoucher: (data: {
    voucherCode: string;
    orderTotal: number;
  }): Promise<AxiosResponse<{
    isValid: boolean;
    message: string;
    discountAmount: number;
    finalAmount: number;
    voucherCode: string;
    discountPercentage: number;
    voucherId: string;
  }>> =>
    requester.post(STORE_VOUCHER.APPLY, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }),
};

export default VoucherApi;
