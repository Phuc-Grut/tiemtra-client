export interface IBrand {
  brandId: number;
  brandName: string;
  description?: string;
  logoUrl?: string;
  creatorName?: string;
  updaterName?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IAddBrandRequest {
  brandName: string;
  description?: string;
  logoUrl?: string;
}

export interface IUpdateBrandRequest {
  brandName: string;
  description?: string;
  logoUrl?: string;
}

export interface IBrandFilterRequest {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
}

export interface IBrandResponse {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: IBrand[];
}

export interface ICheckDeleteBrandsResponse {
  canDeleteAll: boolean;
  cannotDeleteCount: number;
  blockers: {
    $id: string;
    $values: {
      brandId: number;
      message: string;
    }[];
  };
}