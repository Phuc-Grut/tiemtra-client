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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import cartApi from "src/services/api/Cart";
import { ICart, ICartItem } from "src/Interfaces/ICart";
import useToast from "src/components/Toast";
import { useCurrentUser } from "src/hook/useCurrentUser";
import { ICreateOrder, PaymentMethod } from "src/Interfaces/IOrder";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import CustomerInfoForm from "./components/CustomerInfoForm";
import orderApi from "src/services/api/Order";
import { AxiosError } from "axios";

const CartPage = () => {
  const user = useCurrentUser();
  const { showError, showSuccess } = useToast();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cart, setCart] = useState<ICart | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  );

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "", // thay vì note?: string
  });

  // 1. Lấy giỏ từ local nếu chưa đăng nhập
  const raw = localStorage.getItem("cart");
  const localCart = raw
    ? JSON.parse(raw)
    : { items: [], totalQuantity: 0, totalPrice: 0 };

  // 2. Gọi API nếu đã login
  const {
    data: serverCart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.viewCart().then((res) => res.data),
    enabled: !!user,
  });

  useEffect(() => {
    if (serverCart) {
      setCart(serverCart);
      setCartItems(serverCart.items ?? []);
    } else if (!user) {
      setCart(localCart);
      setCartItems(localCart.items ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverCart, user]);

  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    const fetchOrderCode = async () => {
      try {
        const res = await orderApi.generateOrderCode();
        setOrderCode(res.data);
      } catch (err) {
        // showError("Không thể tạo mã đơn hàng");
      }
    };

    fetchOrderCode();
  }, []);

  const handleQuantityChange = async (cartItemId: string, delta: number) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    setLoading(true);

    if (!user) {
      try {
        const raw = localStorage.getItem("cart");
        const cart = raw ? JSON.parse(raw) : null;

        if (!cart) return;

        const updatedItems = cart.items.map((i: any) =>
          i.cartItemId === cartItemId ? { ...i, quantity: newQuantity } : i
        );

        cart.items = updatedItems;
        cart.totalQuantity = updatedItems.reduce(
          (sum: number, i: any) => sum + i.quantity,
          0
        );
        cart.totalPrice = updatedItems.reduce(
          (sum: number, i: any) => sum + i.quantity * i.price,
          0
        );

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems(updatedItems);
        setCart(cart);
        window.dispatchEvent(new Event("local-cart-updated"));
        showSuccess("Cập nhật số lượng thành công");
      } catch {
        showError("Lỗi cập nhật số lượng ");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      await cartApi.updateQuantity({
        productId: item.productId,
        productVariationId: item.productVariationId,
        quantity: newQuantity,
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-total-quantity"] });
      showSuccess("Cập nhật số lượng thành công");
    } catch (err) {
      showError("Cập nhật số lượng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCartItem = async (cartItemId: string) => {
    if (!user) {
      try {
        const raw = localStorage.getItem("cart");
        const cart = raw ? JSON.parse(raw) : null;

        if (!cart) return;

        const updatedItems = cart.items.filter(
          (i: any) => i.cartItemId !== cartItemId
        );
        cart.items = updatedItems;
        cart.totalQuantity = updatedItems.reduce(
          (sum: number, i: any) => sum + i.quantity,
          0
        );
        cart.totalPrice = updatedItems.reduce(
          (sum: number, i: any) => sum + i.quantity * i.price,
          0
        );

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems(updatedItems);
        setCart(cart);
        window.dispatchEvent(new Event("local-cart-updated"));
        showSuccess("Đã xóa sản phẩm khỏi giỏ hàng!");
      } catch {
        showError("Lỗi khi xóa sản phẩm");
      }
      return;
    }

    try {
      await cartApi.removeCartItem(cartItemId);
      setCartItems((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId)
      );
      queryClient.invalidateQueries({ queryKey: ["cart-total-quantity"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      showSuccess("Đã xóa sản phẩm khỏi giỏ hàng!");
    } catch (err: any) {
      showError(err.response?.data ?? "Xóa sản phẩm thất bại");
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
        textAlign="center"
      >
        <Typography fontSize={18} fontWeight="medium" mb={2}>
          Giỏ hàng của bạn đang trống.
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => (window.location.href = "/san-pham")}
        >
          ← TIẾP TỤC MUA SẮM
        </Button>
      </Box>
    );
  }

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

  const createOrderPayload = (): ICreateOrder => {
    return {
      orderCode: orderCode,
      note: customerInfo.note,
      shippingFee: 30000,
      recipientName: customerInfo.fullName,
      recipientAddress: customerInfo.address,
      recipientPhone: customerInfo.phone,
      paymentMethod: paymentMethod,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        productVariationId: item.productVariationId,
        quantity: item.quantity,
      })),
    };
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const payload = createOrderPayload();
      const res = await orderApi.createOrder(payload);

      if (!res.data.success) {
        showError(res.data.message || "Đặt hàng thất bại");
        return;
      }

      if (!user) {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("local-cart-updated"));
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-total-quantity"] });

      showSuccess("Đặt hàng thành công");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      const message =
        axiosError.response?.data?.message || "Có lỗi xảy ra khi đặt hàng";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, md: 4, backgroundColor: "#fff" } }}
    >
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(255,255,255,0.6)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}

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
              onRemove={() => {
                handleRemoveCartItem(item.cartItemId);
              }}
            />
          ))}
          <Box mt={3}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => (window.location.href = "/san-pham")}
            >
              ← TIẾP TỤC MUA SẮM
            </Button>
          </Box>

          {/* Form thông tin khách hàng */}
          <Grid item xs={12}>
            <CustomerInfoForm
              value={customerInfo}
              onChange={setCustomerInfo}
              paymentMethod={paymentMethod}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary subtotal={cart?.totalPrice} />
          <PaymentMethodSelector
            value={paymentMethod}
            onChange={setPaymentMethod}
            totalPrice={cart?.totalPrice }
            orderCode={orderCode}
          />

          <Box mt={3} paddingLeft={0}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              color="success"
              onClick={() => {
                handlePlaceOrder();
              }}
            >
              MUA HÀNG
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
