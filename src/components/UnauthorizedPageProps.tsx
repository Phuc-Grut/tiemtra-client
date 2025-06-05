import { Box, Typography, Button, useTheme } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

type UnauthorizedPageProps = {
  message?: string;
  showLoginButton?: boolean;
};

const UnauthorizedPage = ({
  message = "Vui lòng đăng nhập để tiếp tục.",
  showLoginButton = true,
}: UnauthorizedPageProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, color: theme.palette.error.main, mb: 2 }} />

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333", mb: 1 }}
      >
        Truy cập bị từ chối
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: 500, color: "#555" }}
      >
        {message}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        {showLoginButton && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/login")}
            sx={{ px: 4 }}
          >
            Đăng nhập ngay
          </Button>
        )}

        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            borderColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
              borderColor: theme.palette.primary.dark,
            },
          }}
        >
          Về trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default UnauthorizedPage;
