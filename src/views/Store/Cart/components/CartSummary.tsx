import React from "react";
import { Box, Typography, Divider } from "@mui/material";

interface CartSummaryProps {
  subtotal?: number;
  discountAmount?: number;
  finalAmount?: number;
}

const CartSummary = ({ subtotal, discountAmount, finalAmount }: CartSummaryProps) => {
  const shipping = 30000;
  const originalTotal = (subtotal || 0) + shipping;
  const total = finalAmount || originalTotal;
  const hasDiscount = discountAmount && discountAmount > 0;

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
      
      {hasDiscount && (
        <>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography>Tạm tính:</Typography>
            <Typography fontWeight="bold" color="gray">
              {originalTotal.toLocaleString()}₫
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography color="red">Giảm giá voucher:</Typography>
            <Typography fontWeight="bold" color="red">
              -{discountAmount?.toLocaleString()}₫
            </Typography>
          </Box>
        </>
      )}
      
      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography fontWeight="bold" fontSize={18}>Tổng Tiền</Typography>
        <Typography fontWeight="bold" fontSize={18} color="green">
          {total.toLocaleString()}₫
        </Typography>
      </Box>
    </Box>
  );
};

export default CartSummary;