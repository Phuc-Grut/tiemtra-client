import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CustomerInfoForm from "./components/CustomerInfoForm";

type CustomerInfo = { fullName: string; phoneNumber: string; address: string; note?: string };

function loadCustomerFromLocal(): CustomerInfo {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return { fullName: "", phoneNumber: "", address: "", note: "" };
    const u = JSON.parse(raw);
    const src = u.user ?? u; // tuỳ backend bạn lưu
    return {
      fullName: src.fullName ?? "",
      phoneNumber: src.phoneNumber ?? "",
      address: src.address ?? "",
      note: "",
    };
  } catch {
    return { fullName: "", phoneNumber: "", address: "", note: "" };
  }
}

const CheckOut = () => {
  const [customerInfo, setCustomerInfo] = React.useState<CustomerInfo>(loadCustomerFromLocal());

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, md: 4, backgroundColor: "#fff" } }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Thanh toán
      </Typography>

      <Grid container spacing={3}>
        {/* Bên trái: Form khách hàng */}
        <Grid item xs={12} md={7}>
          <CustomerInfoForm value={customerInfo} onChange={setCustomerInfo} />
        </Grid>

        {/* Bên phải: Tóm tắt đơn hàng (OrderSummary) */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Thông tin đơn hàng
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (Sẽ hiển thị sản phẩm + tổng tiền ở đây)
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckOut;
