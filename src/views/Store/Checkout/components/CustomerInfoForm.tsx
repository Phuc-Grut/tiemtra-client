import React from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export type CustomerInfo = {
  fullName: string;
  phoneNumber: string;
  address: string;
  note?: string;
};

type Props = {
  value?: CustomerInfo;                     // 👈 nhận giá trị prefill
  onChange?: (data: CustomerInfo) => void;
};

const CustomerInfoForm: React.FC<Props> = ({ value, onChange }) => {
  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomerInfo>({
    defaultValues: value ?? { fullName: "", phoneNumber: "", address: "", note: "" },
  });

  // khi value (từ props) đổi -> reset form theo value
  React.useEffect(() => {
    if (value) reset(value);
  }, [value, reset]);

  // push thay đổi lên parent
  const watched = watch();
  React.useEffect(() => {
    onChange?.(watched);
  }, [watched, onChange]);

  const labelStyle = { fontWeight: 600, fontSize: "15px", mb: 0.5, display: "inline-block" };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={labelStyle}>Họ & tên <span style={{ color: "red" }}>*</span></Typography>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Vui lòng nhập họ và tên" }}
            render={({ field }) => (
              <TextField {...field} placeholder="Họ & tên" fullWidth size="small"
                error={!!errors.fullName} helperText={errors.fullName?.message}
                sx={{ mt: 0.5, backgroundColor: "#fff", "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={labelStyle}>Địa chỉ <span style={{ color: "red" }}>*</span></Typography>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Vui lòng nhập địa chỉ" }}
            render={({ field }) => (
              <TextField {...field} placeholder="Địa chỉ" fullWidth size="small"
                error={!!errors.address} helperText={errors.address?.message}
                sx={{ mt: 0.5, backgroundColor: "#fff", "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={labelStyle}>Số điện thoại <span style={{ color: "red" }}>*</span></Typography>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: "Vui lòng nhập số điện thoại",
              pattern: { value: /^(0\d{9}|\+84\d{9})$/, message: "Số điện thoại không hợp lệ" }, // 0xxxxxxxxx hoặc +84xxxxxxxxx
            }}
            render={({ field }) => (
              <TextField {...field} placeholder="Số điện thoại" fullWidth size="small"
                inputProps={{ inputMode: "tel" }}
                error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message}
                sx={{ mt: 0.5, backgroundColor: "#fff", "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ ...labelStyle, mb: 1 }}>Ghi chú</Typography>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField {...field}
                placeholder="Ghi chú về đơn hàng (ví dụ: hướng dẫn giao hàng)"
                fullWidth multiline minRows={3}
                sx={{ backgroundColor: "#fff", "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInfoForm;
