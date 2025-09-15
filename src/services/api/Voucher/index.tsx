import { AxiosResponse } from "axios";
import requester from "src/services/extended/axiosInstance";
import {
  IVoucher,
  UpdateVoucherRequest,
  IVoucherFilter,
} from "src/Interfaces/IVoucher";
import { ADMIN_VOUCHER } from "src/domain/constants";

const voucherApi = {
  // Tạo Voucher
  createVoucher: (data: {
    voucherName: string;
    description: string;
    quantity: number;
    discountPercentage: number;
    endDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  }): Promise<AxiosResponse<IVoucher>> =>
    requester.post(ADMIN_VOUCHER.URL_API.CREATE, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }),
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
    requester.put(
      ADMIN_VOUCHER.URL_API.UPDATE_STATUS(encodeURIComponent(id)),
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
  ): Promise<AxiosResponse<IVoucher>> =>
    requester.put(ADMIN_VOUCHER.URL_API.UPDATE(id), data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }),

  // Tạo Code ngẫu nhiên cho voucher (không dùng)
  generateVoucherCode: (): Promise<AxiosResponse<{ code: string }>> =>
    requester.get(ADMIN_VOUCHER.URL_API.GENERATE_CODE),

  // List các Voucher Public
  getPublicVouchers: (): Promise<AxiosResponse<IVoucher[]>> =>
    requester.get("store/voucher/public", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

export default voucherApi;
