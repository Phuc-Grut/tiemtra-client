// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../hook";
// import useToast from "src/components/Toast";

// const VerifyOtpForm = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { verifyOtp } = useAuth();
//   const { showSuccess } = useToast();

//   const email = location.state?.email;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email) {
//       setError("Không tìm thấy email để xác thực.");
//       return;
//     }

//     if (!otp.trim()) {
//       setError("Vui lòng nhập mã OTP.");
//       return;
//     }

//     setLoading(true);
//     const result = await verifyOtp({ email, otp });
//     setLoading(false);

//     if (result?.success) {
//       showSuccess(result.message || "Xác thực thành công!");
//       navigate("/login");
//     } else {
//       setError(result?.message || "Xác thực thất bại");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
//         <Typography variant="h5" gutterBottom>
//           Xác thực OTP
//         </Typography>

//         <Typography variant="body2" gutterBottom>
//           Nhập mã OTP đã gửi đến email:{" "}
//           <strong>{email || "Không xác định"}</strong>
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
//         >
//           <TextField
//             label="Mã OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             fullWidth
//           />

//           {error && <Alert severity="error">{error}</Alert>}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}
//             startIcon={loading ? <CircularProgress size={18} /> : null}
//           >
//             {loading ? "Đang xác minh..." : "Xác nhận"}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default VerifyOtpForm;
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook";
import useToast from "src/components/Toast";

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // ⏳ 2 phút
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, resendOtp } = useAuth();
  const { showSuccess, showError } = useToast();

  const email = location.state?.email;

  // ⏲ Đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Không tìm thấy email để xác thực.");
      return;
    }

    if (!otp.trim()) {
      setError("Vui lòng nhập mã OTP.");
      return;
    }

    setLoading(true);
    const result = await verifyOtp({ email, otp });
    setLoading(false);

    if (result?.success) {
      showSuccess(result.message || "Xác thực thành công!");
      navigate("/login");
    } else {
      setError(result?.message || "Xác thực thất bại");
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    setResendLoading(true);
    const result = await resendOtp({ email });
    setResendLoading(false);

    if (result.success) {
      showSuccess("Đã gửi lại mã OTP!");
      setTimeLeft(120); // Reset lại timer
    } else {
      showError(result.message || "Gửi lại OTP thất bại!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Xác thực OTP
        </Typography>

        <Typography variant="body2" gutterBottom>
          Nhập mã OTP đã gửi đến email: <strong>{email || "Không xác định"}</strong>
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
  label="Mã OTP"
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Button
          onClick={handleResendOtp}
          disabled={timeLeft > 0 || resendLoading}
          size="small"
        >
          {resendLoading
            ? "..."
            : timeLeft > 0
            ? `Gửi lại (${timeLeft}s)`
            : "Gửi lại"}
        </Button>
      </InputAdornment>
    ),
  }}
/>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Đang xác minh..." : "Xác nhận"}
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={handleResendOtp}
            disabled={timeLeft > 0 || resendLoading}
          >
            {resendLoading
              ? "Đang gửi lại..."
              : timeLeft > 0
              ? `Gửi lại OTP sau ${timeLeft}s`
              : "Gửi lại OTP"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOtpForm;
