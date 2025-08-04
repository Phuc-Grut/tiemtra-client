import { Box, Grid, Typography } from "@mui/material";

const getStatusLabel = (status: number) => {
  switch (status) {
    case 0: return "Chờ xác nhận";
    case 1: return "Đã xác nhận";
    case 2: return "Đang giao";
    case 3: return "Hoàn thành";
    case 4: return "Đã huỷ";
    default: return "Không rõ";
  }
};

const getPaymentMethodLabel = (method: number) => {
  switch (method) {
    case 0: return "Thanh toán khi nhận hàng";
    case 1: return "Chuyển khoản";
    default: return "Không rõ";
  }
};

const getPaymentStatusLabel = (status: number) => {
  switch (status) {
    case 0: return "Chưa thanh toán";
    case 1: return "Đã thanh toán";
    default: return "Không rõ";
  }
};

const formatDate = (iso: string) =>
  iso && iso !== "0001-01-01T00:00:00" ? new Date(iso).toLocaleString("vi-VN") : "Chưa cập nhật";

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <Grid container spacing={1}>
    <Grid item xs={4}>
      <Typography fontWeight={500}>{label}:</Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography>{value}</Typography>
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
          <InfoRow label="Trạng thái đơn" value={getStatusLabel(order.orderStatus)} />
          <InfoRow label="Thanh toán" value={getPaymentMethodLabel(order.paymentMethod)} />
          <InfoRow label="Tình trạng TT" value={getPaymentStatusLabel(order.paymentStatus)} />
          <InfoRow label="Ngày tạo" value={formatDate(order.createAt)} />
          <InfoRow label="Ngày xác nhận" value={formatDate(order.confirmedAt)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderInfoSection;
