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
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  return (
    <Box>
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
                color: "#ffffff",
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
        sx={{ height: 50, justifyContent: "center", boxShadow: "none" }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: 60,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isSmallScreen && (
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  LOGO
                </Typography>
              )}
              <Button size="small">
                Trang chủ
              </Button>
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
              <IconButton>
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src="/default-avatar.jpg"
                />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
