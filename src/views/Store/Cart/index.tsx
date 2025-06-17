import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

const fakeCart = [
  {
    id: "sp01-15",
    name: "Trà Dưỡng Nhan An Nhiên",
    variation: "Hộp 15 gói",
    price: 159000,
    quantity: 1,
    image:
      "https://www.tiemtraannhien.vn/wp-content/uploads/2023/03/duong-nhan-768x768.jpg",
  },

   {
    id: "sp01-15222",
    name: "Trà hahashashsadad",
    variation: "Hộp 159 gói",
    price: 15000,
    quantity: 10,
    image:
      "https://www.tiemtraannhien.vn/wp-content/uploads/2023/03/duong-nhan-768x768.jpg",
  },

];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(fakeCart);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
            />
          ))}
          <Box mt={3}>
            <Button variant="outlined" color="success">
              ← CONTINUE SHOPPING
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
