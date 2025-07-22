export interface ICategory {
    categoryId: number
    parentId: number
    categoryName: string
    description: string
    createAt: Date | string
    updatedAt: string
    creatorName?: string
    updaterName?: string
}

export interface IAddCategoryRequest {
  categoryName: string;
  description: string;
  parentId?: number | null;
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

export interface ICategoryTreeDto {
  categoryId: number;
  categoryName: string;
  children: ICategoryTreeDto[];
}
