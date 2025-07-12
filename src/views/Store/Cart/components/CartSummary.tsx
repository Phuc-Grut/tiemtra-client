import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const CartSummary = ({ subtotal }: { subtotal?: number }) => {
  const shipping = 30000;
  const total = (subtotal || 0) + shipping;
  return (
    <Box borderLeft="1px solid #ddd" pl={3} borderBottom={"1px solid #ddd"}>
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
      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography fontWeight="bold" fontSize={18}>Tổng Tiền</Typography>
        <Typography fontWeight="bold" fontSize={18} color="green">
          {total.toLocaleString()}₫
        </Typography>
      </Box>
      {/* <Box mt={3}>
        <Button fullWidth variant="contained" color="success" onClick={() => navigate("/thanh-toan")}>
          THANH TOÁN
        </Button>
      </Box> */}
    </Box>
  );
};

export default CartSummary;
