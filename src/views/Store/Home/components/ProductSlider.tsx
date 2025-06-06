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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Link } from "react-router-dom";
import { slugify } from "src/utils/slugify";

interface Props {
  products?: IProduct[];
}

const ProductSlider = ({ products = [] }: Props) => {
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

    if (prices.length === 0) return "—";

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max
      ? `${min.toLocaleString()}đ`
      : ` ${min.toLocaleString()}đ - ${max.toLocaleString()}đ`;
  };

  return (
    <Box
      sx={{
        py: 3,
        backgroundColor: "#ffffff",
        backgroundImage: 'url("/image/banner/home-2background-img-2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        px: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            color: "#4c7940",
            fontWeight: 600,
          }}
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
                    to={`/san-pham/${product.productCode}/${slugify(product.productName)}`}
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
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          product.privewImageUrl ||
                          product.productImageUrls?.[0]
                        }
                        alt={
                          product.privewImageUrl ||
                          product.productImageUrls?.[0]
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
                          sx={{ fontSize: "12px" }}
                        >
                          {product.productVariations?.length
                            ? product.productVariations
                                .map((v) => v.typeName)
                                .join(", ")
                            : "Sét 10 gói"}
                        </Typography>
                      </CardContent>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 0.5,
                          px: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            flex: 1,
                            fontSize: "10px",
                            minHeight: "26px",
                            padding: "2px 6px",
                            borderColor: "#009900",
                            color: "#009900",
                            textTransform: "none",
                            borderRadius: "999px",
                            lineHeight: 1,
                            "& .MuiButton-startIcon": {
                              marginRight: "4px",
                            },
                            "&:hover": {
                              backgroundColor: "#e6f2e6",
                              borderColor: "#007700",
                            },
                          }}
                        >
                          <AddShoppingCartIcon sx={{ fontSize: 16 }} />
                        </Button>

                        <Button
                          variant="contained"
                          startIcon={<FlashOnIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            flex: 1,
                            fontSize: "10px",
                            minHeight: "26px",
                            padding: "2px 6px",
                            backgroundColor: "#009900",
                            textTransform: "none",
                            borderRadius: "999px",
                            lineHeight: 1,
                            "& .MuiButton-startIcon": {
                              marginRight: "4px",
                            },
                            "&:hover": {
                              backgroundColor: "#007700",
                            },
                          }}
                        >
                          Mua
                        </Button>
                      </Box>
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
                  to={`/san-pham/${product.productCode}/${slugify(product.productName)}`}
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

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        marginTop: 0,
                        marginBottom: 1,
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddShoppingCartIcon />}
                        sx={{
                          flex: 1,
                          fontSize: "10px",
                          px: 1.2,
                          py: 0.7,
                          borderColor: "#009900",
                          color: "#009900",
                          textTransform: "none",
                          borderRadius: 2,
                          minWidth: 0,
                          "&:hover": {
                            backgroundColor: "#e6f2e6",
                            borderColor: "#007700",
                          },
                        }}
                      >
                        Giỏ hàng
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<FlashOnIcon />}
                        sx={{
                          flex: 1,
                          fontSize: "10px",
                          px: 1.2,
                          py: 0.7,
                          backgroundColor: "#009900",
                          textTransform: "none",
                          borderRadius: 2,
                          minWidth: 0,
                          "&:hover": {
                            backgroundColor: "#007700",
                          },
                        }}
                      >
                        Mua ngay
                      </Button>
                    </Box>
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
    </Box>
  );
};

export default ProductSlider;
