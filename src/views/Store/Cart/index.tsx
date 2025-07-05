import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import cartApi from "src/services/api/Cart";
import { ICartItem } from "src/Interfaces/ICart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.viewCart().then((res) => res.data),
  });

  useEffect(() => {
    if (data?.items) {
      setCartItems(data.items);
    }
  }, [data]);

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4}>
        <Typography color="error">Đã xảy ra lỗi khi tải giỏ hàng.</Typography>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box p={4}>
        <Typography>Giỏ hàng của bạn đang trống.</Typography>
      </Box>
    );
  }

  const handleQuantityChange = (cartItemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, md: 4, backgroundColor: "#fff" } }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {isMobile ? (
            <Box mb={1} px={1}>
              <Typography fontWeight="bold" fontSize="16px">
                Sản Phẩm
              </Typography>
            </Box>
          ) : (
            
            <Grid container alignItems="center" spacing={2} mb={1}>
              <Grid item xs={6}>
                <Typography fontWeight="bold" fontSize="18px" marginLeft={6}>
                  Sản Phẩm
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontSize="18px" fontWeight="bold">
                  Đơn Giá
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="bold" fontSize="18px">
                  Số Lượng
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontSize="18px" fontWeight="bold">
                  Tổng Tiền
                </Typography>
              </Grid>
            </Grid>
          )}

          {cartItems.map((item: ICartItem) => (
            <CartItem
              key={item.cartItemId}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={() => {}}
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
    </Container>
  );
};

export default CartPage;
