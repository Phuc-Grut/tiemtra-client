export interface IBrand {
  brandId: number;
  brandName: string;
  description?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
  creatorName?: string;
  updaterName?: string;
}

export interface IAddBrandRequest {
  brandName: string;
  description?: string;
  logo?: string;
}

export interface IBrandFilterRequest {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
}