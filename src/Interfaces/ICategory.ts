export***REMOVED***interface***REMOVED***ICategory***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***categoryId:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***parentId:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***categoryName:***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED***createAt:***REMOVED***Date***REMOVED***|***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED***updatedAt:***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED***creatorName?:***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED***updaterName?:***REMOVED***string
}

export***REMOVED***interface***REMOVED***IAddCategoryRequest***REMOVED***{
***REMOVED******REMOVED***categoryName:***REMOVED***string;
***REMOVED******REMOVED***description:***REMOVED***string;
***REMOVED******REMOVED***parentId?:***REMOVED***number***REMOVED***|***REMOVED***null;
}

export***REMOVED***interface***REMOVED***ICategoryResponse***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***currentPage:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***pageSize:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***totalItems:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***totalPages:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***$id:***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***$values:***REMOVED***ICategory[]
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***}
***REMOVED******REMOVED***

export***REMOVED***interface***REMOVED***ICategoryRequest***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***pageNumber?:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***pageSize?:***REMOVED***number
***REMOVED******REMOVED******REMOVED******REMOVED***keyword?:***REMOVED***string
}

export***REMOVED***interface***REMOVED***ICreator***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***fullName?:***REMOVED***string
}