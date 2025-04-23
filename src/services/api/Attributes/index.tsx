import { AxiosResponse } from "axios";
import { ATTRIBUTE } from "src/domain/constants";
import { IAddAttributeRequest } from "src/Interfaces/IAttribute";
import requester from "src/services/extended/axiosInstance";

interface IAttributesRequest {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
}

const attributeApi = {
  getPagingApi: (params: IAttributesRequest) =>
    requester.get(ATTRIBUTE.URL_API.GET_ALL_API, { params }),

  addAttributeApi: (data: IAddAttributeRequest): Promise<AxiosResponse<any>> =>
    requester.post(ATTRIBUTE.URL_API.CREATE_API, data),

  updateAttributeApi: (id: number, data: IAddAttributeRequest) =>
    requester.put(ATTRIBUTE.URL_API.UPDATE_API(id), data),

  deleteAttributeApi: (ids: number[]) : Promise<AxiosResponse<any>> =>
    requester.delete(ATTRIBUTE.URL_API.DELETE_API, {data: ids})
};

export default attributeApi;
