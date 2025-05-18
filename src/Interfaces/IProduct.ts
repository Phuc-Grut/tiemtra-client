export interface CreateProductRequest {
  productCode: string;
  productName: string;
  privewImageUrl: string
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
