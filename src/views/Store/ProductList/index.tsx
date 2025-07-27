import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import categoryApi from "src/services/api/Category";
import productApi from "src/services/api/Products/indext";
import { IProductFilter } from "src/Interfaces/IProduct";
import { ICategory } from "src/Interfaces/ICategory";
import ProductFilterPanel from "./components/ProductFilterPanel";
import ProductSlider3 from "src/components/ProductSlider3";
import PageBanner from "./components/PageBanner";
import FilteredProductSection from "./components/FilteredProductSection";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { slugify } from "src/utils/slugify";
import { useEffect, useMemo, useState } from "react";

const buildCleanFilter = (filter: IProductFilter): Partial<IProductFilter> => {
  const cleaned: any = {
    pageNumber: filter.pageNumber ?? 1,
    pageSize: filter.pageSize ?? 10,
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

  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword") || "";

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  // Cập nhật keyword vào URL
  const updateKeyword = (newKeyword: string) => {
    const params = new URLSearchParams(searchParams);
    if (newKeyword.trim()) {
      params.set("keyword", newKeyword.trim());
    } else {
      params.delete("keyword");
    }
    setSearchParams(params);
  };

  const location = useLocation();
  const categoryIdFromState = location.state?.categoryId;

  const handleCategorySelect = (cat: ICategory) => {
    const slug = slugify(cat.categoryName);
    navigate(`/san-pham/danh-muc-san-pham/${slug}`);
  };

  const { data: leafCategories = [], isLoading: isLoadingCategories } =
    useQuery<ICategory[]>({
      queryKey: ["leaf-categories"],
      queryFn: () => categoryApi.getLeafCategories().then((res) => res.data),
    });

  const matchedCategoryId = useMemo(() => {
    if (categoryIdFromState) return categoryIdFromState;
    if (!categorySlug || leafCategories.length === 0) return undefined;

    const match = leafCategories.find(
      (cat) => slugify(cat.categoryName) === categorySlug
    );
    return match?.categoryId;
  }, [categorySlug, categoryIdFromState, leafCategories]);

  useEffect(() => {
    setSelectedCategoryId(matchedCategoryId);
  }, [matchedCategoryId]);

  const productQueries = useQueries({
    queries: leafCategories.map((cat) => {
      const filter = buildCleanFilter({
        categoryId: cat.categoryId,
        pageSize: 100,
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
      <PageBanner title="" imageUrl="/image/banner/bannerNhieuSp.png" />
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
                backgroundColor: "#fff",
              }}
            >
              <ProductFilterPanel
                keyword={keyword}
                setKeyword={updateKeyword}
                categoryId={selectedCategoryId}
                setCategoryId={setSelectedCategoryId}
                categories={leafCategories}
                onCategorySelect={handleCategorySelect}
              />
            </Box>
          </Grid>

          {/* Right Product List */}
          <Grid item xs={12} md={9}>
            {!keyword && !selectedCategoryId ? (
              leafCategories.map((cat, idx) => {
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
              })
            ) : (
              <FilteredProductSection
                keyword={keyword}
                categoryId={selectedCategoryId}
                categories={leafCategories}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductList;
