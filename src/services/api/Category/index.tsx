import***REMOVED***{***REMOVED***CATEGORY***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants"
import***REMOVED***{***REMOVED***ICategoryRequest***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/ICategory"
import***REMOVED***requester***REMOVED***from***REMOVED***"src/services/extended/axiosInstance"

interface***REMOVED***CategoryIdRequest***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***categoryId:***REMOVED***number;
***REMOVED******REMOVED******REMOVED******REMOVED***pageNumber:***REMOVED***number;
***REMOVED******REMOVED******REMOVED******REMOVED***pageSize:***REMOVED***number;
***REMOVED******REMOVED***}
const***REMOVED***categoryApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***getPagingApi:***REMOVED***(params:***REMOVED***ICategoryRequest)***REMOVED***=>***REMOVED***requester.get(CATEGORY.URL_API.GET_ALL_API,***REMOVED***{params}),
***REMOVED******REMOVED******REMOVED******REMOVED***getByIdApi:***REMOVED***(data:***REMOVED***CategoryIdRequest)***REMOVED***=>***REMOVED******REMOVED***requester.post(CATEGORY.URL_API.GET_BY_ID_API,***REMOVED***data),
}

export***REMOVED***default***REMOVED***categoryApi