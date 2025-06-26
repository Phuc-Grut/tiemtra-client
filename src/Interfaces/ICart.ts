export interface ICartItem {
  cartItemId: string;
  productId: string;
  productName?: string;
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
