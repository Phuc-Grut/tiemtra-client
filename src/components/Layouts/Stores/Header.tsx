import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Avatar,
  Container,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [user, setUser] = useState<any>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    handleMenuClose();
  };

  return (
      <Box
        sx={{
          backgroundColor: "#3c9447",
        }}
      >
        {isSmallScreen ? (
          <>
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 50,
                  px: { xs: 1, sm: 2 },
                }}
              >
                <IconButton>
                  <SearchIcon />
                </IconButton>
                {/* <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                LOGO
              </Typography> */}
                <Box sx={{ display: "flex", alignItems: "center", height: 40 }}>
                  <Box
                    component="img"
                    src="/image/logo/LogoOval2.png"
                    alt="Logo"
                    sx={{
                      height: 48,
                      maxWidth: 160,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </Box>
                <IconButton>
                  <ShoppingCart />
                </IconButton>
              </Box>
            </Container>

            <Box sx={{ borderBottom: "1px solid #3c9447", mx: "auto" }} />
          </>
        ) : (
          <Box sx={{ backgroundColor: "#3c9447" }}>
            <Container maxWidth="lg">
              <Box
                sx={{
                  height: 28,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color: "#FFFFFF",
                  fontSize: 14,
                  px: { xs: 2, sm: 3 },
                }}
              >
                <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ mr: 2 }}>
                  support@example.com
                </Typography>
                <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">0123 456 789</Typography>
              </Box>
            </Container>
          </Box>
        )}

        <AppBar
          position="static"
          color="default"
          sx={{
            height: 50,
            justifyContent: "center",
            boxShadow: "none",
            backgroundColor: "#FFFFFF",
            borderBottom: "1.7px solid #e0e0e0",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              sx={{
                minHeight: 60,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                px: { xs: 1, sm: 3 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {!isSmallScreen && (
                  <Button
                    size="small"
                    onClick={() => (window.location.href = "/")}
                    sx={{ p: 0, minWidth: 0 }}
                  >
                    <img
                      src="/image/logo/logoDestop-removebg-preview.png"
                      alt="Logo"
                      style={{ height: 40, objectFit: "contain" }}
                    />
                  </Button>
                )}
                <Button size="small">Trang chủ</Button>
                <Button size="small">Sản phẩm</Button>
                <Button size="small">Giới thiệu</Button>
              </Box>

              {!isSmallScreen && (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <InputBase
                    placeholder="Tìm sản phẩm..."
                    sx={{
                      bgcolor: "#eee",
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      width: { xs: "100%", sm: 200, md: 250 },
                      maxWidth: "100%",
                    }}
                  />
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {!isSmallScreen && (
                  <IconButton>
                    <ShoppingCart />
                  </IconButton>
                )}
                <IconButton onClick={handleMenuOpen}>
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    src={user?.avatar || "/default-avatar.jpg"}
                  />
                </IconButton>

                {user && !isSmallScreen && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Xin chào, {user.fullName.split(" ").pop()}
                  </Typography>
                )}

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {!user ? (
                    <>
                      <MenuItem onClick={() => navigate("/login")}>
                        Đăng nhập
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/register")}>
                        Đăng ký
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem disabled>{user.fullName}</MenuItem>

                      {user.roles?.includes("Admin") && (
                        <MenuItem onClick={() => navigate("/admin/dashboard")}>
                          Admin Dashboard
                        </MenuItem>
                      )}

                      <MenuItem
                        onClick={() => alert("Xem thông tin tài khoản")}
                      >
                        Thông tin tài khoản
                      </MenuItem>

                      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
  );
};

export default Header;
