import { AxiosResponse } from "axios";
import requester from "src/services/extended/axiosInstance";
import {
  IVoucher,
  UpdateVoucherRequest,
  IVoucherFilter,
} from "src/Interfaces/IVoucher";
import { ADMIN_VOUCHER, STORE_VOUCHER } from "src/domain/constants";

const voucherApi = {
  // Tạo Voucher
  createVoucher: (data: {
    voucherName: string;
    description: string;
    quantity: number;
    discountPercentage: number;
    endDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  }): Promise<AxiosResponse<IVoucher>> =>
    requester.post(ADMIN_VOUCHER.URL_API.CREATE, data),

  // Liệt kê voucher
  getPagingVoucher: (params: IVoucherFilter) =>
    requester.get(ADMIN_VOUCHER.URL_API.GET_PAGING, { params }),

  // Call voucher bằng ID (chưa dùng)
  getVoucherById: (id: string): Promise<AxiosResponse<IVoucher>> =>
    requester.get(ADMIN_VOUCHER.URL_API.GET_BY_ID(id)),

  // Update Voucher Trạng thái
  updateVoucherStatus: (
    id: string,
    status: number
  ): Promise<AxiosResponse<any>> =>
    requester.put(ADMIN_VOUCHER.URL_API.UPDATE_STATUS(encodeURIComponent(id)), {
      status,
    }),

  // Update Voucher Info
  updateVoucher: (
    id: string,
    data: UpdateVoucherRequest
  ): Promise<AxiosResponse<IVoucher>> =>
    requester.put(ADMIN_VOUCHER.URL_API.UPDATE(id), data),

  // Tạo Code ngẫu nhiên cho voucher (không dùng)
  generateVoucherCode: (): Promise<AxiosResponse<{ code: string }>> =>
    requester.get(ADMIN_VOUCHER.URL_API.GENERATE_CODE),

  // List các Voucher Public
  getPublicVouchers: (): Promise<AxiosResponse<IVoucher[]>> =>
    requester.get(STORE_VOUCHER.URL_API.GET_PUBLIC, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  //Apply Voucher
  applyVoucher: (data: {
    voucherCode: string;
    orderTotal: number;
  }): Promise<
    AxiosResponse<{
      isValid: boolean;
      message: string;
      discountAmount: number;
      finalAmount: number;
      voucherCode: string;
      discountPercentage: number;
      voucherId: string;
    }>
  > => requester.post(STORE_VOUCHER.URL_API.APPLY, data),

   deleteVoucher: (ids: string[]) =>
    requester.post(ADMIN_VOUCHER.URL_API.DELETE_VOUCHER_BY_IDS, { ids }),
};

export default voucherApi;
