import { Box, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import formatVietnamTime from "src/utils/formatVietnamTime";
import getOrderStatusText from "src/utils/getOrderStatusText";
import { getPaymentMethodChip } from "src/utils/getPaymentMethodChip";
import { getPaymentStatusChip } from "src/utils/getPaymentStatusChip";

const InfoRow = ({ label, value }: { label: string; value: ReactNode }) => (
  <Grid container spacing={1}>
    <Grid item xs={4}>
      <Typography fontWeight={500}>{label}:</Typography>
    </Grid>
    <Grid item xs={8}>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography>{value}</Typography>
      ) : (
        value
      )}
    </Grid>
  </Grid>
);

const OrderInfoSection = ({ order }: { order: any }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Thông tin đơn hàng</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InfoRow label="Mã đơn hàng" value={order.orderCode} />
          <InfoRow label="Khách hàng" value={`${order.customerName} (${order.customerCode})`} />
          <InfoRow label="Người nhận" value={order.receivertName} />
          <InfoRow label="SĐT nhận" value={order.receiverPhone} />
          <InfoRow label="Địa chỉ" value={order.receiverAddress} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoRow label="Ghi chú" value={order.note || "Không có"} />
          <InfoRow label="Trạng thái đơn" value={getOrderStatusText(order.orderStatus)} />
          <InfoRow label="Thanh toán" value={getPaymentMethodChip(order.paymentMethod)} />
          <InfoRow label="Tình trạng TT" value={getPaymentStatusChip(order.paymentStatus)} />
          <InfoRow label="Ngày tạo" value={formatVietnamTime(order.createAt)} />
          <InfoRow label="Ngày xác nhận" value={formatVietnamTime(order.confirmedAt)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderInfoSection;
