
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
    brand?: Brand
}

export interface ProductImage{
    imageFile: File | null
}

export interface ProductAttribute {
    
}

export interface ProductVariation{

}

export interface Brand {
    id?: number | null;
    name: string;
  }