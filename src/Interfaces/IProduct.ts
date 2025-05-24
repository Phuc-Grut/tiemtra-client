export interface CreateProductRequest {
  productCode: string;
  productName: string;
  privewImageUrl: string;
  price?: number | null;
  stock?: number | null;
  origin?: string;
  hasVariations?: boolean;
  description?: string;
  categoryId?: number;
  brandId?: number | null;
  productImageUrls: string[];
  productAttributes?: ProductAttribute[];
  productVariations?: ProductVariation[];
  note?: string
  totalSold?: number | null
  productStatus?: ProductStatus
}

export interface ProductAttribute {
  attributeId: number;
  value: string;
}

export interface ProductVariation {
  typeName: string;
  price: number | null;
  stock: number | null;
}

export interface Brand {
  id?: number | null;
  name: string;
}

export interface IProduct {
  productId: string;
  productCode: string;
  productName: string;
  privewImageUrl: string;
  price?: number | null;
  stock?: number | null;
  totalSold?: number | null;
  origin?: string;
  description?: string;
  note?: string
  productStatus?: number
  brandName?: string;
  creatorName?: string;
  updaterName?: string;
  updatedAt: string;
  createdAt: string;
  productVariations?: ProductVariation
}

export interface IProductFilter {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  productCode?: string
  sortBy?: string;
  categoryId?: number;
  brandId?: number;
  status?: ProductStatus
}

export enum ProductStatus {
  Draft = 0, // nháp
  Active = 1, // đang bán
  Inactive = 2, // ẩn
  OutOfStock = 3, // hết hàng
}
