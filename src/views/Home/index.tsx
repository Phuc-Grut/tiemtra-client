import React from "react";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      {/* Top Info Bar */}
      <Box sx={{ bgcolor: "#f1f1f1", py: 1, px: 2, fontSize: 13, textAlign: "right" }}>
        <Typography variant="body2">📞 0972 324 563 &nbsp;|&nbsp; ✉️ cskh@tiemtraannhien.site</Typography>
      </Box>

      {/* Topbar Navigation */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700}>Tiệm Trà An Nhiên</Typography>
          <Box>
            <Button color="inherit">Trang chủ</Button>
            <Button color="inherit">Sản phẩm</Button>
            <Button color="inherit">Giới thiệu</Button>
            <Button color="inherit">Liên hệ</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner chính */}
      <Box
        sx={{
          height: "500px",
          backgroundImage: "url('/banner-tra.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Box>
          <Typography variant="h2" fontWeight={700}>Tiệm Trà An Nhiên</Typography>
          <Typography variant="h6" mt={2}>
            Hương vị truyền thống – Chạm tới an yên
          </Typography>
          <Button variant="contained" color="success" sx={{ mt: 3 }}>
            Khám phá ngay
          </Button>
        </Box>
      </Box>

      {/* Danh mục sản phẩm */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" mb={4} fontWeight={600} textAlign="center">
          Các loại trà nổi bật
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              name: "TRÀ PHỔ NHĨ VÂN NAM THƯỢNG HẠNG",
              img: "/tra-pho-nhi.jpg",
            },
            {
              name: "Trà Hoa Hồng Dâu Tằm",
              img: "/tra-hoa-hong.jpg",
            },
            {
              name: "Trà Detox Chanh Leo Kim Quất",
              img: "/tra-detox.jpg",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 2,
                  transition: "transform 0.3s",
                  ":hover": { transform: "scale(1.03)" },
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "100%", height: "240px", objectFit: "cover" }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                    Xem chi tiết
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 4, mt: 8 }}>
        <Container>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Tiệm Trà An Nhiên
          </Typography>
          <Typography variant="body2" mb={2}>
            Địa chỉ: 123 Đường Trà Đạo, Hà Nội - Hotline: 0972 324 563
          </Typography>
          <Typography variant="body2">Facebook • Instagram • Zalo</Typography>
        </Container>
      </Box>

      {/* Bản quyền */}
      <Box sx={{ bgcolor: "#e0e0e0", py: 2, textAlign: "center" }}>
        <Typography variant="body2">© 2025 Tiệm Trà An Nhiên. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
