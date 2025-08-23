import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook";

type FormValues = {
  email: string;
  otp: string;
};

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading } = useAuth();

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onSubmit" });

  const [otpSent, setOtpSent] = useState(false);
  const [emailStored, setEmailStored] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // đếm ngược cho nút Gửi lại OTP
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleSendOtp = async () => {
    const email = (getValues("email") ?? "").trim().toLowerCase();
    if (!email) {
      setValue("email", email, { shouldValidate: true, shouldTouch: true });
      return;
    }
    const res = await forgotPassword({ email });
    setOtpSent(true);
    setEmailStored(email);
    setCooldown(60); // 60s mới cho gửi lại
  };

  const handleVerifyAndGo = async () => {
    const otp = (getValues("otp") ?? "").trim();
    if (!otp) {
      (
        document.querySelector('input[name="otp"]') as HTMLInputElement
      )?.focus();
      return;
    }
    navigate("/reset-password", { state: { email: emailStored, otp } });
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
          Quên mật khẩu
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Nhập email để nhận mã OTP đặt lại mật khẩu
        </Typography>

        {/* EMAIL */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          disabled={otpSent}
          {...register("email", {
            required: "Email không được để trống",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message ?? ""}
        />

        {!otpSent ? (
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi OTP"}
          </Button>
        ) : (
          <>
            {/* OTP */}
            <TextField
              label="Mã OTP"
              type="text"
              fullWidth
              margin="normal"
              {...register("otp", {
                required: "OTP không được để trống",
              })}
              error={!!errors.otp}
              helperText={errors.otp?.message ?? ""}
            />

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={handleSendOtp}
                disabled={loading || cooldown > 0}
              >
                {cooldown > 0 ? `Gửi lại OTP (${cooldown}s)` : "Gửi lại OTP"}
              </Button>

              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleVerifyAndGo}
                disabled={loading}
              >
                Tiếp tục
              </Button>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Nếu email tồn tại, OTP sẽ được gửi. Vui lòng kiểm tra hộp thư.
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
