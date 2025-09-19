import { Box, Typography, Divider } from "@mui/material";
import { AppliedVoucher } from "src/Interfaces/IOrder";

const OrderSummary = ({
  totalItems,
  itemsSubtotal,
  shippingFee,
  appliedVouchers = [],
}: {
  totalItems: number;
  shippingFee: number;
  itemsSubtotal: number
  appliedVouchers?: AppliedVoucher[];
}) => {

  const totalDiscount = appliedVouchers.reduce(
    (sum, voucher) => sum + voucher.discountAmount,
    0
  )

  const totalAmount = itemsSubtotal + shippingFee - totalDiscount

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tổng kết
      </Typography>
      <Typography>Số lượng sản phẩm: {totalItems}</Typography>

      {/* Tiền hàng gốc */}
      <Typography>Tiền hàng: {itemsSubtotal.toLocaleString()}₫</Typography>

      {/* Phí vận chuyển */}
      <Typography>Phí vận chuyển: {shippingFee.toLocaleString()}₫</Typography>

      {/* Giảm giá */}
      {totalDiscount > 0 && (
        <>
          {appliedVouchers.map((voucher, index) => (
            <Typography key={index} color="red">
              Giảm giá tiền hàng (mã {voucher.voucherCode}): -
              {voucher.discountAmount.toLocaleString()}₫
            </Typography>
          ))}
        </>
      )}

      <Divider sx={{ my: 1 }} />

      {/* Tổng cộng */}
      <Typography variant="h6" color="primary">
        Tổng tiền: {totalAmount.toLocaleString()}₫
      </Typography>
    </Box>
  );
};

export default OrderSummary;
