import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { IProduct } from "src/Interfaces/IProduct";

interface Props {
  products: IProduct[];
  isLoading?: boolean;
}

const ProductCarouselSection = ({ products, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="text.secondary">Không có sản phẩm nào</Typography>
      </Box>
    );
  }

  return (
    <Swiper spaceBetween={10} slidesPerView={2} breakpoints={{ 600: { slidesPerView: 4 } }}>
      {products.map((product) => (
        <SwiperSlide key={product.productId}>
          <Card sx={{ p: 1 }}>
            <img src={product.privewImageUrl} alt={product.productName} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <Typography fontWeight={500} mt={1}>{product.productName}</Typography>
            <Typography color="text.secondary" variant="body2">
              {product.price?.toLocaleString()}đ
            </Typography>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarouselSection;
