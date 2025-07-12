// components/CustomerInfoForm.tsx

import React from "react";
import { Box, TextField, Typography, Stack } from "@mui/material";
import { PaymentMethod } from "src/Interfaces/IOrder";

interface CustomerInfo {
    fullName: string;
    phone: string;
    address: string;
    note: string;
}

type Props = {
  value: CustomerInfo
  onChange: (value: Props["value"]) => void;
  paymentMethod: PaymentMethod; 
};

const CustomerInfoForm = ({ value, onChange }: Props) => {
  const handleChange = (field: keyof Props["value"]) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...value, [field]: e.target.value });
  };

  return (
    <Box mt={2} padding={1}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Địa chỉ nhận hàng
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Họ và tên"
          fullWidth
          required
          value={value.fullName}
          onChange={handleChange("fullName")}
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          required
          type="tel"
          value={value.phone}
          onChange={handleChange("phone")}
        />
        <TextField
          label="Địa chỉ nhận hàng"
          fullWidth
          required
          multiline
          rows={1}
          value={value.address}
          onChange={handleChange("address")}
        />
        <TextField
          label="Ghi chú đơn hàng (tuỳ chọn)"
          fullWidth
          multiline
          rows={2}
          value={value.note}
          onChange={handleChange("note")}
        />
      </Stack>
    </Box>
  );
};

export default CustomerInfoForm;
