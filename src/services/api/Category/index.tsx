import***REMOVED***{***REMOVED***CATEGORY***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants"
import***REMOVED***{***REMOVED***ICategoryRequest***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/ICategory"
import***REMOVED***requester***REMOVED***from***REMOVED***"src/services/extended/axiosInstance"

const***REMOVED***categoryApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***getPagingApi:***REMOVED***(params:***REMOVED***ICategoryRequest)***REMOVED***=>***REMOVED***requester.get(CATEGORY.URL_API.GET_ALL_API,***REMOVED***{params}),
}

export***REMOVED***default***REMOVED***categoryApi