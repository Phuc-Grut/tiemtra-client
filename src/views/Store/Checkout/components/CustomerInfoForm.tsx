import React from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type CustomerInfo = {
  fullName: string;
  phoneNumber: string;
  address: string;
  note?: string;
};

type Props = {
  onChange?: (data: CustomerInfo) => void;
};

const CustomerInfoForm = ({ onChange }: Props) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<CustomerInfo>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      note: "",
    },
  });

  const watched = watch();
  React.useEffect(() => {
    if (onChange) {
      onChange(watched);
    }
  }, [watched, onChange]);

  const labelStyle = {
    fontWeight: 600,
    fontSize: "15px",
    mb: 0.5,
    display: "inline-block",
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={labelStyle}>
            Họ & tên <span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Vui lòng nhập họ và tên" }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Họ & tên"
                fullWidth
                size="small"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                sx={{
                  mt: 0.5,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={labelStyle}>
            Địa chỉ <span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Vui lòng nhập địa chỉ" }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Địa chỉ"
                fullWidth
                size="small"
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={{
                  mt: 0.5,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={labelStyle}>
            Số điện thoại <span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^(0|\+84)\d{9}$/,
                message: "Số điện thoại không hợp lệ",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Số điện thoại"
                fullWidth
                size="small"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                sx={{
                  mt: 0.5,
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ ...labelStyle, mb: 1 }}>
            Ghi chú
          </Typography>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt về việc giao hàng."
                fullWidth
                multiline
                minRows={3}
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInfoForm;
