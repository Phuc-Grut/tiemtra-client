
import { IProduct } from './IProduct';
export interface ICartItem {
  cartItemId: string;
  productId: string;
  productVariationId: string;
  productCode: string
  productName: string;
  productVariationName?: string;
  previewImage?: string;
  price: number;
  quantity: number;
}

export interface ICart {
  cartItems: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface AddProductToCart {
  productId: string;
  productVariationId?: string | null;
  quantity: number;

  product?: IProduct
}
