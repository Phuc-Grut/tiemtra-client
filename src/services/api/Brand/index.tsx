import { AxiosResponse } from "axios";
import { BRAND } from "src/domain/constants";
import {
  IAddBrandRequest,
  IBrand,
  IBrandFilterRequest,
} from "src/Interfaces/IBrand";
import requester from "src/services/extended/axiosInstance";

const brandApi = {
  getPagingApi: (params: IBrandFilterRequest) =>
    requester.get(BRAND.URL_API.GET_ALL_API, { params }),

  getByIdApi: (id: number): Promise<AxiosResponse<IBrand>> =>
    requester.get(`${BRAND.URL_API.GET_BY_ID_API}/${id}`),

  createBrand: (data: IAddBrandRequest): Promise<AxiosResponse<any>> =>
    requester.post(BRAND.URL_API.CREATE_API, data),

  updateBrand: (id: number, data: IAddBrandRequest): Promise<AxiosResponse<any>> =>
    requester.put(BRAND.URL_API.UPDATE_API(id), data),

  checkCanDeleteManyBrands: (ids: number[]): Promise<AxiosResponse<any>> =>
    requester.post(BRAND.URL_API.CHECK_DELETE_BY_IDS, ids),

  deleteManyBrands: (ids: number[]): Promise<AxiosResponse<any>> =>
    requester.delete(BRAND.URL_API.DELETE_API_BY_IDS, { data: ids }),

  uploadBrandImage: (formData: FormData): Promise<AxiosResponse<any>> =>
    requester.post(BRAND.URL_API.UPLOAD_IMAGE, formData),
};

export default brandApi;