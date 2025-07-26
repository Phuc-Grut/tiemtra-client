import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { IProduct, ProductVariation } from "src/Interfaces/IProduct";
import { Link } from "react-router-dom";
import { slugify } from "src/utils/slugify";

interface Props {
  products?: IProduct[];
}

const ProductSlider3 = ({ products = [] }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderPrice = (p: IProduct): string => {
    if (p.price && p.price > 0) {
      return p.price.toLocaleString() + "đ";
    }

    const variations = Array.isArray(p.productVariations)
      ? p.productVariations
      : [];

    const prices = variations
      .map((v: ProductVariation) => v.price)
      .filter((price): price is number => typeof price === "number");

    if (prices.length === 0) return "0 đ";

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max
      ? `${min.toLocaleString()}đ`
      : `${min.toLocaleString()}đ - ${max.toLocaleString()}đ`;
  };

  return (
    <Box sx={{ maxWidth: 1200, width: "100%", textAlign: "center" }}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={isMobile ? 0 : 220}
        slidesPerView={isMobile ? 2 : 4}
        style={{ paddingBottom: "32px" }}
        loop={true} 
        
      >
        {products.map((product, idx) => (
          <SwiperSlide key={idx}>
            <Link
              to={`/san-pham/${product.productCode}/${slugify(
                product.productName
              )}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: isMobile ? 300 : 360,
                  width: { xs: 160, sm: 200, md: 240 },
                  maxWidth: 260,
                  margin: "0 auto",
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "2px solid #009900",
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    product.privewImageUrl || product.productImageUrls?.[0]
                  }
                  alt={product.privewImageUrl || product.productImageUrls?.[0]}
                  sx={{
                    height: { xs: 140, sm: 180, md: 210 },
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {product.productName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="green"
                    sx={{
                      fontWeight: 700,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {renderPrice(product)}
                  </Typography>

                  {product.hasVariations && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: "12px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.productVariations?.length
                        ? product.productVariations
                            .map((v) => v.typeName)
                            .join(", ")
                        : "Sét 10 gói"}
                    </Typography>
                  )}
                </CardContent>

                {/* 👇 Button luôn nằm cuối card */}
                <Box sx={{ mt: "auto", pb: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: "#009900",
                      fontSize: "11px",
                      textTransform: "none",
                      borderRadius: 20,
                      padding: "4px 18px",
                      display: "block",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#007700",
                      },
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductSlider3;
