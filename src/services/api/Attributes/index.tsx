import***REMOVED***{***REMOVED***AxiosResponse***REMOVED***}***REMOVED***from***REMOVED***"axios";
import***REMOVED***{***REMOVED***ATTRIBUTE***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants"
import***REMOVED***{***REMOVED***IAddAttributeRequest***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/IAttribute";
import***REMOVED***requester***REMOVED***from***REMOVED***"src/services/extended/axiosInstance"

interface***REMOVED***IAttributesRequest***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***keyword?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***pageNumber?:***REMOVED***number;
***REMOVED******REMOVED******REMOVED******REMOVED***pageSize?:***REMOVED***number;
}

const***REMOVED***attributeApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***getPagingApi:(params:***REMOVED***IAttributesRequest)***REMOVED***=>***REMOVED***requester.get(ATTRIBUTE.URL_API.GET_ALL_API,***REMOVED***{params}),
***REMOVED******REMOVED******REMOVED******REMOVED***addAttributeApi:***REMOVED***(data:***REMOVED***IAddAttributeRequest)***REMOVED***:***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>***REMOVED***requester.post(ATTRIBUTE.URL_API.CREATE_API,***REMOVED***data),
}

export***REMOVED***default***REMOVED***attributeApi