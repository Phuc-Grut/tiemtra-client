import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook";
import useToast from "src/components/Toast";

type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword, loading } = useAuth();
  const { showSuccess, showError } = useToast();

  const { email, otp } = (location.state || {}) as { email: string; otp: string };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    const res = await resetPassword({
      email,
      otp,
      newPassword: data.newPassword,
    });

    if (res.success) {
      showSuccess("Đặt lại mật khẩu thành công!");
      navigate("/login");
    } else {
      showError(res.message || "Đặt lại mật khẩu thất bại");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Đặt lại mật khẩu
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label="Mật khẩu mới"
            type="password"
            fullWidth
            margin="normal"
            {...register("newPassword", {
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Ít nhất 6 ký tự" },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <TextField
            label="Xác nhận mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === watch("newPassword") || "Mật khẩu không khớp",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
