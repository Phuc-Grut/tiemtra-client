import { ADMIN_ORDER } from "src/domain/constants";
import { IOrderFilter } from "src/Interfaces/IOrder";
import requester from "src/services/extended/axiosInstance";

const orderApi = {
    getPagingOrder: (params : IOrderFilter) => requester.get(ADMIN_ORDER.URL_API.GET_PAGING, {params})
}

export default orderApi