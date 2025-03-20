import { CATEGORY } from "src/domain/constants"
import { ICategoryRequest } from "src/Interfaces/ICategory"
import requester from "src/services/extended/axiosInstance"

const categoryApi = {
    getPagingApi: (params: ICategoryRequest) => requester.get(CATEGORY.URL_API.GET_ALL_API, {params}),
}

export default categoryApi