import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { IProduct, IProductFilter } from "src/Interfaces/IProduct";
import productApi from "src/services/api/Products/indext";
import ProductCard from "./ProductSlider";

const buildCleanFilter = (filter: IProductFilter) => {
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

const RelatedProductsSection = ({
  categoryId,
  excludeProductCode,
}: {
  categoryId: number;
  excludeProductCode?: string;
}) => {
  const [filter, setFilter] = useState<IProductFilter>({
    pageNumber: 1,
    pageSize: 10,
    categoryId: categoryId,
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      categoryId: categoryId,
    }));
  }, [categoryId]);

  const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading
} = useInfiniteQuery({
  queryKey: ["related-products", categoryId, excludeProductCode],
  queryFn: async ({ pageParam = 1 }) => {
    const cleaned = buildCleanFilter({
      ...filter,
      pageNumber: pageParam,
    });

    const res = await productApi.storeGetAllProduct(cleaned);
    const items = res.data.items ?? [];

    const filteredItems = excludeProductCode
      ? items.filter((item : IProduct) => item.productCode !== excludeProductCode)
      : items;

    return {
      items: filteredItems,
      nextPage: pageParam + 1,
      isLastPage: pageParam >= (res.data.totalPages ?? 1),
    };
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) =>
    lastPage.isLastPage ? undefined : lastPage.nextPage,
});


  if (isLoading) {
    return <CircularProgress />;
  }

  const products: IProduct[] = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Box
      mt={8}
      bgcolor="#fafafa"
      borderRadius={2}
      boxShadow={1}
      border="1px solid #4C7940"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          pl: 3,
          pt: 2,
          textAlign: "left",
          color: "#4C7940",
        }}
      >
        Sản phẩm liên quan
      </Typography>
      <Box sx={{ mt: -3, mb: 2 }}>
        <ProductCard products={products} />
      </Box>

      {hasNextPage && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RelatedProductsSection;
