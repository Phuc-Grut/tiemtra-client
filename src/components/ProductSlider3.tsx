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
    <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={220}
        slidesPerView={isMobile ? 2 : 4}
        style={{ paddingBottom: "32px" }}
      >
        {products.map((product, idx) => (
          <SwiperSlide key={idx}>
            <Link
              to={`/san-pham/${product.productCode}/${slugify(product.productName)}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  width: { xs: 160, sm: 200, md: 240 },
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "2px solid #009900",
                  mx: "auto",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.privewImageUrl || product.productImageUrls?.[0]}
                  alt={product.productName}
                  sx={{
                    height: { xs: 140, sm: 180, md: 210 },
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.productName}
                  </Typography>

                  <Typography variant="body2" color="green" fontWeight={700}>
                    {renderPrice(product)}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.productVariations?.length
                      ? product.productVariations.map((v) => v.typeName).join(", ")
                      : "Sét 10 gói"}
                  </Typography>
                </CardContent>

                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#009900",
                    fontSize: "11px",
                    textTransform: "none",
                    borderRadius: 20,
                    padding: "4px 18px",
                    mb: 1,
                    mx: "auto",
                    display: "block",
                    "&:hover": {
                      backgroundColor: "#007700",
                    },
                  }}
                >
                  Xem chi tiết
                </Button>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductSlider3;
