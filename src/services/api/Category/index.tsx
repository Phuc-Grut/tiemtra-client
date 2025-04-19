import***REMOVED***{***REMOVED***AxiosResponse***REMOVED***}***REMOVED***from***REMOVED***"axios";
import***REMOVED***{***REMOVED***CATEGORY***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants";
import***REMOVED***{
***REMOVED******REMOVED***IAddCategoryRequest,
***REMOVED******REMOVED***ICategoryRequest,
}***REMOVED***from***REMOVED***"src/Interfaces/ICategory";
import***REMOVED***requester***REMOVED***from***REMOVED***"src/services/extended/axiosInstance";

interface***REMOVED***CategoryIdRequest***REMOVED***{
***REMOVED******REMOVED***categoryId:***REMOVED***number;
***REMOVED******REMOVED***pageNumber:***REMOVED***number;
***REMOVED******REMOVED***pageSize:***REMOVED***number;
}

const***REMOVED***categoryApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***getPagingApi:***REMOVED***(params:***REMOVED***ICategoryRequest)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.get(CATEGORY.URL_API.GET_ALL_API,***REMOVED***{***REMOVED***params***REMOVED***}),

***REMOVED******REMOVED***getByIdApi:***REMOVED***(data:***REMOVED***CategoryIdRequest)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.post(CATEGORY.URL_API.GET_BY_ID_API,***REMOVED***data),

***REMOVED******REMOVED***addCategoryApi:***REMOVED***(data:***REMOVED***IAddCategoryRequest):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.post(CATEGORY.URL_API.CREATE_API,***REMOVED***data),

***REMOVED******REMOVED***updateCategoryApi:***REMOVED***(id:***REMOVED***number,***REMOVED***data:***REMOVED***IAddCategoryRequest)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.put(CATEGORY.URL_API.UPDATE_API(id),***REMOVED***data),

***REMOVED******REMOVED***checkCanDeleteManyCategories:***REMOVED***(ids:***REMOVED***number[]):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.post(CATEGORY.URL_API.CHECK_DELETE_BY_IDS,***REMOVED***ids),

***REMOVED******REMOVED***deleteManyCategories:***REMOVED***(ids:***REMOVED***number[]):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.delete(CATEGORY.URL_API.DELETE_API_BY_IDS,***REMOVED***{***REMOVED***data:***REMOVED***ids***REMOVED***}),

***REMOVED******REMOVED***getAttributeById:***REMOVED***(id:***REMOVED***number)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.get(CATEGORY.URL_API.ATTRIBUTE_BY_ID(id)),
***REMOVED******REMOVED***
***REMOVED******REMOVED***setAttributesForCategory:***REMOVED***(data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***categoryId:***REMOVED***number;
***REMOVED******REMOVED******REMOVED******REMOVED***attributeIds:***REMOVED***number[];
***REMOVED******REMOVED***}):***REMOVED***Promise<AxiosResponse<any>>***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***requester.post(CATEGORY.URL_API.SET_ATTRIBUTES_API,***REMOVED***data),
};

export***REMOVED***default***REMOVED***categoryApi;
