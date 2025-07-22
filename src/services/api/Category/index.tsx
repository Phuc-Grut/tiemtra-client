import { AxiosResponse } from "axios";
import { CATEGORY, STORE_CATEGORY } from "src/domain/constants";
import {
  IAddCategoryRequest,
  ICategory,
  ICategoryRequest,
  ICategoryTreeDto,
} from "src/Interfaces/ICategory";
import requester from "src/services/extended/axiosInstance";

interface CategoryIdRequest {
  categoryId: number;
  pageNumber?: number;
  pageSize?: number;
}

const categoryApi = {
  getPagingApi: (params: ICategoryRequest) =>
    requester.get(CATEGORY.URL_API.GET_ALL_API, { params }),

  getByIdApi: (params: CategoryIdRequest) =>
    requester.get(CATEGORY.URL_API.GET_BY_ID_API, { params }),

  addCategoryApi: (data: IAddCategoryRequest): Promise<AxiosResponse<any>> =>
    requester.post(CATEGORY.URL_API.CREATE_API, data),

  updateCategoryApi: (id: number, data: IAddCategoryRequest) =>
    requester.put(CATEGORY.URL_API.UPDATE_API(id), data),

  checkCanDeleteManyCategories: (ids: number[]): Promise<AxiosResponse<any>> =>
    requester.post(CATEGORY.URL_API.CHECK_DELETE_BY_IDS, ids),

  deleteManyCategories: (ids: number[]): Promise<AxiosResponse<any>> =>
    requester.delete(CATEGORY.URL_API.DELETE_API_BY_IDS, { data: ids }),

  getAttributeById: (id: number) =>
    requester.get(CATEGORY.URL_API.ATTRIBUTE_BY_ID(id)),

  setAttributesForCategory: (data: {
    categoryId: number;
    attributeIds: number[];
  }): Promise<AxiosResponse<any>> =>
    requester.post(CATEGORY.URL_API.SET_ATTRIBUTES_API, data),

  getLeafCategories: (): Promise<AxiosResponse<ICategory[]>> =>
    requester.get(CATEGORY.URL_API.GET_LEAF_CATEGORY),

  getAllTree: (): Promise<AxiosResponse<ICategoryTreeDto[]>> =>
    requester.get(STORE_CATEGORY.URL_API.GET_ALL),
};

export default categoryApi;
