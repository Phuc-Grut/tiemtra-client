import { AxiosResponse } from "axios";
import { ADMIN_ORDER, STORE_ORDER } from "src/domain/constants";
import { ICreateOrder, IOrderFilter, OrderStatus } from "src/Interfaces/IOrder";
import requester from "src/services/extended/axiosInstance";

const orderApi = {
  getPagingOrder: (params: IOrderFilter) =>
    requester.get(ADMIN_ORDER.URL_API.GET_PAGING, { params }),

  createOrder: (data: ICreateOrder) =>
    requester.post(STORE_ORDER.URL_API.CREATE_ORDER, data),

  generateOrderCode: (): Promise<AxiosResponse<string>> =>
    requester.get(STORE_ORDER.URL_API.GENERATE_ORDER_CODE),

  comfirmOrder: (orderId: string) =>
    requester.post(ADMIN_ORDER.URL_API.COMFIRM_ORDER(orderId)),

  changeOrderStatus: (orderId: string, orderStatus: OrderStatus) =>
    requester.put(ADMIN_ORDER.URL_API.CHANGE_ORDER_STATUS(orderId), {
      newStatus: orderStatus,
    }),

  getById: (orderId: string) =>
    requester.get(ADMIN_ORDER.URL_API.GET_BY_ID(orderId)),
};

export default orderApi;
