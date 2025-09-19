import { Box, Typography, Divider } from "@mui/material";


interface AppliedVoucher {
  voucherCode: string;
  discountAmount: number;
  usedAt: string;
}

const OrderSummary = ({
  totalItems,
  totalAmount,
  shippingFee,
  appliedVouchers = [],
}: {
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
  appliedVouchers?: AppliedVoucher[];
}) => {
  const totalDiscount = appliedVouchers.reduce((sum, voucher) => sum + voucher.discountAmount, 0);
  
  // Tính toán dựa trên logic đúng:
  // totalAmount = tổng đơn cuối cùng (đã bao gồm shipping fee)
  // Vậy tiền hàng gốc = totalAmount - shippingFee + discount
  const originalSubtotal = totalAmount - shippingFee + totalDiscount;
  const subtotalAfterDiscount = totalAmount - shippingFee; // Tiền hàng sau khi áp dụng voucher

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Tổng kết</Typography>
      <Typography>Số lượng sản phẩm: {totalItems}</Typography>
      
      {totalDiscount > 0 ? (
        <>
          <Typography>Tiền hàng (gốc): {originalSubtotal.toLocaleString()}₫</Typography>
          {appliedVouchers.map((voucher, index) => (
            <Typography key={index} color="red">
              Giảm giá voucher {voucher.voucherCode}: -{voucher.discountAmount.toLocaleString()}₫
            </Typography>
          ))}
          <Typography>Tiền hàng (sau giảm): {subtotalAfterDiscount.toLocaleString()}₫</Typography>
        </>
      ) : (
        <Typography>Tiền hàng: {subtotalAfterDiscount.toLocaleString()}₫</Typography>
      )}
      
      <Typography>Phí vận chuyển: {shippingFee.toLocaleString()}₫</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" color="primary">
        Tổng đơn: {totalAmount.toLocaleString()}₫
      </Typography>
    </Box>
  );
};

export default OrderSummary;
