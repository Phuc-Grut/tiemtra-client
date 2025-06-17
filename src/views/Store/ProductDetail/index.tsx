import { Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import productApi from "src/services/api/Products/indext";
import ProductGallery from "./components/ProductGallery";
import ProductInfoSection from "./components/ProductInfoSection";
import ProductDescription from "./components/ProductDescription";
import ProductExtraInfo from "./components/ProductExtraInfo";
// import GlobalPromotion from "./components/GlobalPromotion";
import RelatedProductsSection from "./components/RelatedProducts";
import { useEffect } from "react";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productCode]);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Đã có lỗi xảy ra!</div>;

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, md: 4, backgroundColor: "#fff" } }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductGallery
            previewImageUrl={productDetail.privewImageUrl}
            images={productDetail.productImageUrls || []}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductInfoSection product={productDetail} />
          <ProductExtraInfo product={productDetail} />
          {/* <GlobalPromotion /> */}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ProductDescription description={productDetail.description} />
      </Grid>

      <Grid item xs={12}>
        <RelatedProductsSection
          categoryId={productDetail.categoryId}
          excludeProductCode={productDetail.productCode}
        />
      </Grid>
    </Container>
  );
};

export default ProductDetail;
