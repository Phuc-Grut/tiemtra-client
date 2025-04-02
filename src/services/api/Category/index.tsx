import***REMOVED***{***REMOVED***AxiosResponse***REMOVED***}***REMOVED***from***REMOVED***"axios";
import***REMOVED***{***REMOVED***CATEGORY***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants"
import***REMOVED***{***REMOVED***IAddCategoryRequest,***REMOVED***ICategoryRequest***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/ICategory"
import***REMOVED***requester***REMOVED***from***REMOVED***"src/services/extended/axiosInstance"

interface***REMOVED***CategoryIdRequest***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***categoryId:***REMOVED***number;
***REMOVED******REMOVED******REMOVED******REMOVED***pageNumber:***REMOVED***number;
***REMOVED******REMOVED******REMOVED******REMOVED***pageSize:***REMOVED***number;
***REMOVED******REMOVED***}
const***REMOVED***categoryApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***getPagingApi:***REMOVED***(params:***REMOVED***ICategoryRequest)***REMOVED***=>***REMOVED***requester.get(CATEGORY.URL_API.GET_ALL_API,***REMOVED***{params}),
***REMOVED******REMOVED******REMOVED******REMOVED***getByIdApi:***REMOVED***(data:***REMOVED***CategoryIdRequest)***REMOVED***=>***REMOVED******REMOVED***requester.post(CATEGORY.URL_API.GET_BY_ID_API,***REMOVED***data),
***REMOVED******REMOVED******REMOVED******REMOVED***addCategoryApi:***REMOVED***(data:***REMOVED***IAddCategoryRequest):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>***REMOVED***requester.post(CATEGORY.URL_API.CREATE_API,***REMOVED***data),
***REMOVED******REMOVED******REMOVED******REMOVED***updateCategoryApi:***REMOVED***(id:***REMOVED***number,***REMOVED***data:***REMOVED***IAddCategoryRequest)***REMOVED***=>***REMOVED******REMOVED***requester.put(CATEGORY.URL_API.UPDATE_API(id),***REMOVED***data),
***REMOVED******REMOVED******REMOVED******REMOVED***checkCanDeleteManyCategories:***REMOVED***(ids:***REMOVED***number[]):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>***REMOVED***requester.post(CATEGORY.URL_API.CHECK_DELETE_BY_IDS,***REMOVED***ids),
***REMOVED******REMOVED******REMOVED******REMOVED***deleteManyCategories:***REMOVED***(ids:***REMOVED***number[]):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>***REMOVED***requester.delete(CATEGORY.URL_API.DELETE_API_BY_IDS,***REMOVED***{***REMOVED***data:***REMOVED***ids***REMOVED***}),
}

export***REMOVED***default***REMOVED***categoryApi