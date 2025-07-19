import { useEffect } from "react";

export const useCartLocalInit = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    const existingCart = localStorage.getItem("cart");

    if (!user && !existingCart) {
      const emptyCart = {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };

      localStorage.setItem("cart", JSON.stringify(emptyCart));
      // console.log("[LocalCart] Đã tạo giỏ hàng local rỗng");
    }
  }, []);
};
