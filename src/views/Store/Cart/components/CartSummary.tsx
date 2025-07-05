import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";

const CartSummary = ({ subtotal }: { subtotal?: number }) => {
  const shipping = 30000;
  const total = subtotal || 0 + shipping;

  return (
    <Box borderLeft="1px solid #ddd" pl={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Tổng giỏ hàng
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography>Tiền hàng</Typography>
        <Typography fontWeight="bold" color="green">
          {subtotal?.toLocaleString()}₫
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Phí vận chuyển:</Typography>
        <Typography fontWeight="bold" color="gray">
          {shipping.toLocaleString()}₫
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Tổng Tiền</Typography>
        <Typography fontWeight="bold" color="green">
          {total.toLocaleString()}₫
        </Typography>
      </Box>
      <Box mt={3}>
        <Button fullWidth variant="contained" color="success">
          THANH TOÁN
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;
