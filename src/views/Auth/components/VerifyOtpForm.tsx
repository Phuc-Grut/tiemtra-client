import { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper } from "@mui/material";

interface VerifyOtpFormProps {
  onSubmit: ( otp: string) => void;
}

const VerifyOtpForm = ({ onSubmit }: VerifyOtpFormProps) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit( otp);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Xác thực OTP
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
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Xác nhận OTP
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOtpForm;
