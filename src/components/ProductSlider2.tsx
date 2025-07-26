import React, { useRef } from "react";
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
import { Swiper as SwiperType } from "swiper";

interface Props {
  products?: IProduct[];
}

const ProductSlider2 = ({ products = [] }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const swiperRef = useRef<SwiperType | null>(null);
  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

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

        <Box
          sx={{
            maxWidth: 1200,
            width: isMobile ? "100%" : "70%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={isMobile ? 8 : 0}
            slidesPerView={isMobile ? 2 : 3}
            centeredSlides={false}
            style={{ paddingBottom: "32px" }}
            loop={true}
          >
            {products.map((product, idx) => (
              <SwiperSlide
                key={idx}
                style={{ display: "flex", justifyContent: "center" }}
              >
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
                      height: isMobile ? 300 : 380,
                      width: { xs: 160, sm: 200, md: 240 },
                      flex: 1,
                      minWidth: 0,
                      maxWidth: 260,
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
                      alt={
                        product.privewImageUrl || product.productImageUrls?.[0]
                      }
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
                        <>
                          {!isMobile && (
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
                          )}

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
                        </>
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
