import { STORE_CART } from "src/domain/constants";
import { AddProductToCart } from "src/Interfaces/ICart";
import requester from "src/services/extended/axiosInstance";

const cartApi = {
  viewCart: () => requester.get(STORE_CART.URL_API.VIEW_CART),
  addProductToCart: (data: AddProductToCart) =>
    requester.post(STORE_CART.URL_API.ADD_PRODUCT_TO_CART, data),
  updateQuantity: (data: AddProductToCart) =>
    requester.put(STORE_CART.URL_API.UPDATE_QUANTITY, data),

  removeCartItem: (cartItemId: string) =>
    requester.delete(STORE_CART.URL_API.REMOVE_CART_ITEM, {
      params: {
        cartItemId,
      },
    }),

  getTotalQuantity: () => requester.get(STORE_CART.URL_API.GET_TOTAL_QUANTITY),
};

export default cartApi;
