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
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
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

const ProductSlider2 = ({ products = [] }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const visibleCount = isMobile ? 2 : 3;

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, products.length - visibleCount)
    );
  };

  const visibleProducts = useMemo(
    () => (products || []).slice(startIndex, startIndex + visibleCount),
    [startIndex, visibleCount, products]
  );

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
      : ` ${min.toLocaleString()}đ - ${max.toLocaleString()}đ`;
  };

  return (
    <Box sx={{ maxWidth: 1200, width: "100%", textAlign: "center" }}>
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
              left: 150,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#4c7940",
              "&:hover": { backgroundColor: "#3a5f2c" },
              color: "white",
              zIndex: 1,
            }}
          >
            <ArrowBackIos />
          </IconButton>
        )}
        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={6}
            slidesPerView={isMobile ? 2 : 3}
            style={{ paddingBottom: "32px" }}
          >
            {products?.map((product: IProduct, idx) => (
              <SwiperSlide key={idx}>
                <Link
                  key={product.productCode}
                  to={`/san-pham/${product.productCode}/${slugify(
                    product.productName
                  )}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      width: { xs: 160, sm: 200, md: 240 },
                      maxWidth: 240,
                      margin: "0 auto",
                      borderRadius: 3,
                      boxShadow: 2,
                      border: "2px solid #009900",
                      // height: 300,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        product.privewImageUrl || product.productImageUrls?.[0]
                      }
                      alt={
                        product.privewImageUrl || product.productImageUrls?.[0]
                      }
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
                          maxWidth: "100%",
                        }}
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="green"
                        sx={{ fontWeight: 700 }}
                      >
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
                          ? product.productVariations
                              .map((v) => v.typeName)
                              .join(", ")
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
                        marginBottom: 1,
                        display: "block",
                        mx: "auto",
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
        ) : (
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
            {visibleProducts.map((product: IProduct, idx) => (
              <Link
                key={product.productCode}
                to={`/san-pham/${product.productCode}/${slugify(
                  product.productName
                )}`}
                style={{ textDecoration: "none" }}
              >
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
                    image={
                      product.privewImageUrl || product.productImageUrls?.[0]
                    }
                    alt={
                      product.privewImageUrl || product.productImageUrls?.[0]
                    }
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
                        fontSize: "16px",
                        marginTop: -1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {product.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="green"
                      sx={{ fontWeight: 700, fontSize: "18px" }}
                    >
                      {renderPrice(product)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: "12px",
                        display: "block",
                        fontWeight: 700,
                        borderTop: 1,
                        marginTop: 1,
                      }}
                    >
                      Phân loại
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "12px" }}
                    >
                      {product.productVariations?.length
                        ? product.productVariations
                            .map((v) => v.typeName)
                            .join(", ")
                        : "Sét 10 gói"}
                    </Typography>
                  </CardContent>

                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: "#009900",
                      fontSize: "12px",
                      textTransform: "none",
                      borderRadius: 20,
                      padding: "4px 18px",
                      marginBottom: 1,
                      display: "block",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#007700",
                      },
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Card>
              </Link>
            ))}
          </Box>
        )}

        {!isMobile && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 150,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#4c7940",
              color: "white",
              "&:hover": { backgroundColor: "#3a5f2c" },
              zIndex: 1,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ProductSlider2;
