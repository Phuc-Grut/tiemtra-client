import***REMOVED***{***REMOVED***AxiosResponse***REMOVED***}***REMOVED***from***REMOVED***"axios";
import***REMOVED***{***REMOVED***ATTRIBUTE***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants";
import***REMOVED***{***REMOVED***IAddAttributeRequest***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/IAttribute";
import***REMOVED***requester***REMOVED***from***REMOVED***"src/services/extended/axiosInstance";

interface***REMOVED***IAttributesRequest***REMOVED***{
***REMOVED******REMOVED***keyword?:***REMOVED***string;
***REMOVED******REMOVED***pageNumber?:***REMOVED***number;
***REMOVED******REMOVED***pageSize?:***REMOVED***number;
}

const***REMOVED***attributeApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***getPagingApi:***REMOVED***(params:***REMOVED***IAttributesRequest)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.get(ATTRIBUTE.URL_API.GET_ALL_API,***REMOVED***{***REMOVED***params***REMOVED***}),

***REMOVED******REMOVED***addAttributeApi:***REMOVED***(data:***REMOVED***IAddAttributeRequest):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.post(ATTRIBUTE.URL_API.CREATE_API,***REMOVED***data),

***REMOVED******REMOVED***updateAttributeApi:***REMOVED***(id:***REMOVED***number,***REMOVED***data:***REMOVED***IAddAttributeRequest)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.put(ATTRIBUTE.URL_API.UPDATE_API(id),***REMOVED***data),

***REMOVED******REMOVED***deleteAttributeApi:***REMOVED***(ids:***REMOVED***number[])***REMOVED***:***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.delete(ATTRIBUTE.URL_API.DELETE_API,***REMOVED***{data:***REMOVED***ids})
};

export***REMOVED***default***REMOVED***attributeApi;
