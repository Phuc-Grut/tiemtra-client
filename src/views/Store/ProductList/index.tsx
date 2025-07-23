import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import categoryApi from "src/services/api/Category";
import productApi from "src/services/api/Products/indext";
import { IProductFilter } from "src/Interfaces/IProduct";
import { ICategory } from "src/Interfaces/ICategory";

import ProductFilterPanel from "./components/ProductFilterPanel";
import ProductSlider3 from "src/components/ProductSlider3";
import PageBanner from "./components/PageBanner";

const buildCleanFilter = (filter: IProductFilter): Partial<IProductFilter> => {
  const cleaned: any = {
    pageNumber: filter.pageNumber ?? 1,
    pageSize: filter.pageSize ?? 5,
  };

  if (filter.keyword?.trim()) cleaned.keyword = filter.keyword.trim();
  if (filter.productCode?.trim())
    cleaned.productCode = filter.productCode.trim();
  if (filter.sortBy?.trim()) cleaned.sortBy = filter.sortBy.trim();
  if (filter.status !== undefined) cleaned.status = filter.status;
  if (filter.categoryId !== undefined) cleaned.categoryId = filter.categoryId;
  if (filter.brandId !== undefined) cleaned.brandId = filter.brandId;

  return cleaned;
};

const ProductList = () => {
  const [keyword, setKeyword] = useState("");
  console.log("🚀 ~ ProductList ~ keyword:", keyword)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");

  const { data: leafCategories = [], isLoading: isLoadingCategories } =
    useQuery<ICategory[]>({
      queryKey: ["leaf-categories"],
      queryFn: () => categoryApi.getLeafCategories().then((res) => res.data),
    });

  const productQueries = useQueries({
    queries: leafCategories.map((cat) => {
      const filter = buildCleanFilter({
        categoryId: cat.categoryId,
        pageSize: 5,
      });

      return {
        queryKey: ["products-by-category", filter],
        queryFn: () =>
          productApi.storeGetAllProduct(filter).then((res) => res.data),
        enabled: !!cat.categoryId,
      };
    }),
  });

  if (isLoadingCategories) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <PageBanner
        title=""
        imageUrl="/image/banner/bannerNhieuSp.png"
      />
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 2, md: 4, backgroundColor: "#fff" } }}
      >
        <Grid container spacing={4}>
          {/* Left Filter Panel */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 2,
                // borderRadius: 2,
                // boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                // border: "1px solid #eee",
                backgroundColor: "#fff",
              }}
            >
              <ProductFilterPanel
                keyword={keyword}
                setKeyword={setKeyword}
                categoryId={selectedCategoryId}
                setCategoryId={setSelectedCategoryId}
                categories={leafCategories}
              />
            </Box>
          </Grid>

          {/* Right Product List */}
          <Grid item xs={12} md={9}>
            {leafCategories.map((cat, idx) => {
              const query = productQueries[idx];
              const products = Array.isArray(query.data?.items)
                ? query.data.items
                : [];

              if (!products.length && !query.isLoading) return null;

              return (
                <Box key={cat.categoryId} mb={4}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Box
                      sx={{
                        width: "4px",
                        height: "24px",
                        backgroundColor: "#66BB6A",
                        mr: 1,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#4CAF50",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat.categoryName}
                    </Typography>

                    <Box
                      component="img"
                      src="/image/logo/green-tea-400x400.png"
                      alt="tea"
                      sx={{ height: 30, ml: 0 }}
                    />
                  </Box>

                  {query.isLoading ? (
                    <Box textAlign="center" py={4}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <ProductSlider3 products={products} />
                  )}
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductList;
