import { Box, Typography, Divider } from "@mui/material";

const OrderSummary = ({
  totalItems,
  totalAmount,
  shippingFee,
}: {
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
}) => {
  const finalAmount = totalAmount + shippingFee;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Tổng kết</Typography>
      <Typography>Số lượng sản phẩm: {totalItems}</Typography>
      <Typography>Tiền hàng: {totalAmount.toLocaleString()}đ</Typography>
      <Typography>Phí vận chuyển: {shippingFee.toLocaleString()}đ</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" color="primary">
        Tổng đơn: {finalAmount.toLocaleString()}đ
      </Typography>
    </Box>
  );
};

export default OrderSummary;
