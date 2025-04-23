import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Avatar,
} from "@mui/material";
import { ShoppingCart, Home } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Header = () => {
  return (
    <Box>
      {/* Phần 1: Email & SĐT */}
      <Box
        sx={{
          height: 28,
          backgroundColor: "#508815",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          px: 3,
          color: "#ffffff",
          fontSize: 14,
        }}
      >
        <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="body2" sx={{ mr: 2 }}>
          support@example.com
        </Typography>
        <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="body2">0123 456 789</Typography>
      </Box>

      {/* Phần 2: Thanh điều hướng chính */}
      <AppBar
        position="static"
        color="default"
        sx={{ height: 50, justifyContent: "center", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            minHeight: 50,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Bên trái: logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              LOGO
            </Typography>
            <Button startIcon={<Home />} size="small">
              Trang chủ
            </Button>
            <Button size="small">Sản phẩm</Button>
            <Button size="small">Giới thiệu</Button>
          </Box>

          {/* Giữa: ô tìm kiếm */}
          <InputBase
            placeholder="Tìm sản phẩm..."
            sx={{
              bgcolor: "#eee",
              px: 2,
              py: 0.5,
              borderRadius: 4,
              width: 250,
            }}
          />

          {/* Bên phải: giỏ hàng + user */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton>
              <ShoppingCart />
            </IconButton>
            <IconButton>
              {/* Dùng Avatar hình tròn thay cho nút user */}
              <Avatar
                sx={{ width: 30, height: 30 }}
                src="/default-avatar.jpg"
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
