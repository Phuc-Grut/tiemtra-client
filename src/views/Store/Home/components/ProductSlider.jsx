import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const ProductSlider = ({ products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const visibleCount = isMobile ? 2 : 3;

  const [startIndex, setStartIndex] = useState(0);

  const totalPages = Math.ceil(products.length / visibleCount);
  const currentPage = Math.floor(startIndex / visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, products.length - visibleCount)
    );
  };

  const visibleProducts = useMemo(
    () => products.slice(startIndex, startIndex + visibleCount),
    [startIndex, visibleCount, products]
  );

  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: "#ffffff",
        backgroundImage: 'url("/image/banner/home-2background-img-2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontFamily: "'Zhi Mang Xing', cursive", color: "#4c7940" }}
        >
          Tiệm Trà
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: { xs: "18px", sm: "22px", md: "30px" },
            fontWeight: 500,
            mt: 1,
            mx: "auto",
            maxWidth: 600,
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          Không gian sống chậm, thưởng trà và thư giãn giữa nhịp sống hiện đại.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 4,
            position: "relative",
          }}
        >
          {!isMobile && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 150, // điều chỉnh khoảng cách với nội dung
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#4c7940",
                color: "white",
                "&:hover": { backgroundColor: "#3a5f2c" },
                opacity: startIndex === 0 ? 0.3 : 1,
                zIndex: 1,
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflow: "hidden",
              flexWrap: "nowrap",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {visibleProducts.map((product, idx) => (
              <Card
                key={idx}
                sx={{
                  width: { xs: 160, sm: 200, md: 240 },
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "2px solid #009900",
                  flexShrink: 0,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: { xs: 140, sm: 180, md: 210 },
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ whiteSpace: "normal", fontSize: "14px" }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="green"
                    sx={{ fontWeight: 500 }}
                  >
                    {product.price}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    {product.variant}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {!isMobile && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 150, // điều chỉnh khoảng cách với nội dung
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#4c7940",
                color: "white",
                "&:hover": { backgroundColor: "#3a5f2c" },
                opacity: startIndex === 0 ? 0.3 : 1,
                zIndex: 1,
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>

        {isMobile && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  mx: 0.5,
                  borderRadius: "50%",
                  backgroundColor: currentPage === index ? "#4c7940" : "#ccc",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductSlider;
