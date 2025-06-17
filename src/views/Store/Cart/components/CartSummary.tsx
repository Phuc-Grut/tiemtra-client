import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";

const CartSummary = ({ subtotal }: { subtotal: number }) => {
  const shipping = 30000;
  const total = subtotal + shipping;

  return (
    <Box borderLeft="1px solid #ddd" pl={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        CART TOTALS
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography>Subtotal</Typography>
        <Typography fontWeight="bold" color="green">
          {subtotal.toLocaleString()}₫
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Đồng giá:</Typography>
        <Typography fontWeight="bold" color="gray">
          {shipping.toLocaleString()}₫
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold" color="green">
          {total.toLocaleString()}₫
        </Typography>
      </Box>
      <Box mt={3}>
        <Button fullWidth variant="contained" color="success">
          PROCEED TO CHECKOUT
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;
