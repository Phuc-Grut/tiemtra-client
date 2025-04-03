import React from "react"
import { useForm } from "react-hook-form"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useAuth } from "../hook"
import { useNavigate } from "react-router-dom"

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: { email: string; password: string }) => {
    const result = await login(data);
    console.log("🚀 ~ onSubmit ~ result:", result)
    // console.log("🚀 ~ onSubmit ~ result:", result);
  
    if (result) {
      localStorage.setItem("access_token", result.token); // ✅ Lưu Access Token
      localStorage.setItem("refresh_token", result.refreshToken); // ✅ Lưu Refresh Token
      navigate("/admin/dashboard");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5">Đăng nhập</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("email", { required: "Email không được để trống" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("password", { required: "Mật khẩu không được để trống" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default LoginForm
