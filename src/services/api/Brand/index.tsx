import { AxiosResponse } from "axios";
import { BRAND } from "src/domain/constants";
import {
  IBrand,
  IBrandFilterRequest,
  IAddBrandRequest,
} from "src/Interfaces/IBrand";
import requester from "src/services/extended/axiosInstance";

interface BrandIdRequest {
  id: number;
}

const brandApi = {
  getPagingApi: (params: IBrandFilterRequest) =>
    requester.get(BRAND.URL_API.GET_ALL_API, { params }),

  getByIdApi: (params: BrandIdRequest) =>
    requester.get(BRAND.URL_API.GET_BY_ID_API, { params }),

  addBrandApi: (data: IAddBrandRequest): Promise<AxiosResponse<any>> =>
    requester.post(BRAND.URL_API.CREATE_API, data),

  updateBrandApi: (id: number, data: IAddBrandRequest) =>
    requester.put(BRAND.URL_API.UPDATE_API(id), data),

  checkCanDeleteManyBrands: (ids: number[]): Promise<AxiosResponse<any>> =>
    requester.post(BRAND.URL_API.CHECK_DELETE_BY_IDS, ids),

  deleteManyBrands: (ids: number[]): Promise<AxiosResponse<any>> =>
    requester.delete(BRAND.URL_API.DELETE_API_BY_IDS, { data: ids }),
};

export default brandApi;