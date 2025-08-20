import { ADMIN_CUSTOMER } from "src/domain/constants";
import { ICustomerFilter } from "src/Interfaces/ICustomer";
import requester from "src/services/extended/axiosInstance";

const customerApi = {
  getPagingCustomer: (params: ICustomerFilter) =>
    requester.get(ADMIN_CUSTOMER.URL_API.GET_PAGING, { params }),
};

export default customerApi;
