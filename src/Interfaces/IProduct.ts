export interface CreateProductRequest {
  productCode: string;
  productName: string;
  categoryName?: string;
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
  creatorName?: string;
  updaterName?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface ProductAttribute {
  attributeId: number;
  value: string;
  attributeName?: string;
}

export interface ProductVariation {
  productVariationId?: string
  typeName: string;
  price: number | null;
  stock: number | null;
  status: ProductVariationStatus
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
  productVariations?: ProductVariation[]
  productImageUrls: string[];
  productAttributes?: ProductAttribute[]
  hasVariations?: boolean
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
  Inactive = 2, // Ngừng bán
  OutOfStock = 3, // hết hàng
}


export enum ProductVariationStatus {
  Active = 1, // đang bán
  Inactive = 2, // Ngừng bán
  OutOfStock = 3, // hết hàng
}
