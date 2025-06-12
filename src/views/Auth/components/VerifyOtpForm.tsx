import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook";
import useToast from "src/components/Toast";

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess } = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  const { verifyOtp } = useAuth();
  const email = location.state?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    setLoading(true);
    const result = await verifyOtp({ email, otp });
    setLoading(false);

    if (result.success) {
      showSuccess("Xác thực thành công")
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Xác thực OTP
        </Typography>
        <Typography sx={{ fontSize: 13, color: "green" }} gutterBottom>
          Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Mã OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Đang xác minh..." : "Xác nhận OTP"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOtpForm;
