import { CATEGORY } from "src/domain/constants"
import { ICategoryRequest } from "src/Interfaces/ICategory"
import requester from "src/services/extended/axiosInstance"

interface CategoryIdRequest {
    categoryId: number;
    pageNumber: number;
    pageSize: number;
  }
const categoryApi = {
    getPagingApi: (params: ICategoryRequest) => requester.get(CATEGORY.URL_API.GET_ALL_API, {params}),
    getByIdApi: (data: CategoryIdRequest) =>  requester.post(CATEGORY.URL_API.GET_BY_ID_API, data),
}

export default categoryApi