import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#3c9447", color: "white", py: 4, mt: 0 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Công ty TNHH Luân Hồi Điện
        </Typography>
        <Typography variant="body2">
          Địa chỉ: Lạc Vân Tông - Thiên Đạo Minh - Thiên Nam - Nhân Giới
        </Typography>
        <Typography variant="body2">Hotline: 0909 123 456</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} Luân Hồi Điện. All rights reserved.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
            Chính sách bảo mật
          </Link>
          <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
            Điều khoản sử dụng
          </Link>
          <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
            Liên hệ
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
