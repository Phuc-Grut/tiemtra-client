
export interface CreateProductRequest {
    productCode : string
    productName: string
    privewImage?: File
    price?: number | null;
    stock?: number | null;
    origin?: string;
    hasVariations?: boolean;
    description?: string
    categoryId?: number;
    brandId?: number | null;
    productImages?: ProductImage[];
    productAttributes?: ProductAttribute[];
    productVariations?: ProductVariation[];
}

export interface ProductImage{
    imageFile: File;
}

export interface ProductAttribute {
    attributeId: number;
    value: string;
}

export interface ProductVariation{
    typeName: string;
    price: number;
    stock: number;
}

export interface Brand {
    id?: number | null;
    name: string;
  }