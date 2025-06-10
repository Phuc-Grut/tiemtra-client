import { Box, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import productApi from "src/services/api/Products/indext";
import ProductGallery from "./components/ProductGallery";
import ProductInfoSection from "./components/ProductInfoSection";

const ProductDetail = () => {
  const { code: productCode } = useParams<{ code: string }>();

  const {
    data: productDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productDetail", productCode],
    queryFn: async () => {
      const response = await productApi.storeGetProductByCode(productCode!);
      return response.data;
    },
    enabled: !!productCode,
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Đã có lỗi xảy ra!</div>;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4, backgroundColor: "#fff" } }}>
      <Grid container spacing={4}>
        {/* Cột trái: Hình ảnh */}
        <Grid item xs={12} md={6}>
          <ProductGallery
            previewImageUrl={productDetail.privewImageUrl}
            images={productDetail.productImageUrls || []}
          />
        </Grid>

        {/* Cột phải: Thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <ProductInfoSection product={productDetail} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
