export interface ICategory {
    categoryId: number
    parentId: number
    categoryName: string
    creator?: ICreator
    createAt: Date | string
    updatedAt: string
}

export interface ICategoryResponse {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
    data: {
      $id: string
      $values: ICategory[]
    }
  }
  

export interface ICategoryRequest {
    pageNumber?: number
    pageSize?: number
    keyword?: string
}

export interface ICreator {
    fullName?: string
}