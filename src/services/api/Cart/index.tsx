import { STORE_CART } from "src/domain/constants";
import requester from "src/services/extended/axiosInstance";

const cartApi = {
    viewCart: () => requester.get(STORE_CART.URL_API.VIEW_CART)
}

export default cartApi