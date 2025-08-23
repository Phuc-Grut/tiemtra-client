import React from "react";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useAuth } from "src/views/Auth/hook";

type ProfileForm = {
  fullName: string;
  phoneNumber?: string;
  email: string;
  address?: string;
};

const ProfileTab: React.FC = () => {
  const { user, loading } = useAuth();
  const {
    register, handleSubmit, formState: { errors, isSubmitting }
  } = useForm<ProfileForm>({
    defaultValues: {
      fullName: user?.fullName || "",
      phoneNumber: (user as any)?.phoneNumber || "",
      email: user?.email || "",
      address: (user as any)?.address || "",
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    // TODO: gọi API update profile
    console.log("Update profile:", data);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
        <PersonOutlineIcon color="action" />
        <Typography variant="subtitle1" fontWeight={700}>
          Chi tiết tài khoản
        </Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Họ và tên"
          fullWidth
          margin="normal"
          {...register("fullName", { required: "Vui lòng nhập họ tên" })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />

        <TextField
          label="Số điện thoại"
          fullWidth
          margin="normal"
          {...register("phoneNumber", {
            pattern: { value: /^(0|\+84)\d{9,10}$/, message: "Số điện thoại không hợp lệ" },
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          disabled
          {...register("email")}
          helperText="Email không thể thay đổi"
        />

        <TextField
          label="Địa chỉ"
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          {...register("address")}
        />

        <Stack direction="row" gap={1} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" disabled={isSubmitting || loading}>
            {isSubmitting || loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
          <Button type="button" variant="outlined" onClick={() => window.location.reload()}>
            Huỷ
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProfileTab;
