import React from "react"
import { useForm } from "react-hook-form"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useAuth } from "../hook"
import { Link, useNavigate } from "react-router-dom"
import useToast from "src/components/Toast"

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const { showSuccess } = useToast();
  const onSubmit = async (data: { email: string; password: string }) => {
    const result = await login(data);
  
    if (result) {
      // navigate("/");
      showSuccess("Đăng nhập thành công!");
      window.location.href = "/";
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
          <Box sx={{ textAlign: "right", mt: 0.5 }}>
      <Typography
        variant="body2"
        sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
        onClick={() => navigate("/forgot-password")}
      >
        Quên mật khẩu?
      </Typography>
    </Box>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default LoginForm
