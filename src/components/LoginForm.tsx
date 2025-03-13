import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { login } from "../services/Authencation/authService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Xóa lỗi trước khi gửi API
    console.log("Email:", email, "Password:", password);

    try {
      const userData = await login(email, password); // ✅ Gọi API đăng nhập
      console.log("Đăng nhập thành công:", userData);

      window.location.href = "/dashboard"; // ✅ Chuyển hướng sau khi đăng nhập thành công
    } catch (error: any) {
      setError(error.response?.data?.message || "Đăng nhập thất bại");
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
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Đăng nhập tài khoản của bạn
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </Button>
        </form>
      </Box>
    </Container>
  );
}
