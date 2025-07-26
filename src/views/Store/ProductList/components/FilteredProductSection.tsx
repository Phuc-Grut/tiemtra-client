// FilteredProductSection.tsx
import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IProduct, IProductFilter } from "src/Interfaces/IProduct";
import productApi from "src/services/api/Products/indext";
import YourProductCard from "./YourProductCard";

interface Props {
  keyword: string;
  categoryId?: number;
  categories: any[]; // ICategory[]
}

interface IProductListResponse {
  items: IProduct[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

const buildCleanFilter = (filter: IProductFilter): Partial<IProductFilter> => {
  const cleaned: any = {
    pageNumber: filter.pageNumber ?? 1,
    pageSize: filter.pageSize ?? 1,
  };
  if (filter.keyword?.trim()) cleaned.keyword = filter.keyword.trim();
  if (filter.categoryId !== undefined) cleaned.categoryId = filter.categoryId;

  return cleaned;
};

const FilteredProductSection = ({ keyword, categoryId, categories }: Props) => {
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Reset page về 1 khi keyword hoặc categoryId thay đổi
  useEffect(() => {
    setPage(1);
  }, [keyword, categoryId]);

  const filter: IProductFilter = {
    keyword,
    categoryId,
    pageSize,
    pageNumber: page,
  };

  const { data, isLoading } = useQuery<IProductListResponse>({
    queryKey: ["filtered-products", filter],
    queryFn: () =>
      productApi
        .storeGetAllProduct(buildCleanFilter(filter))
        .then((res) => res.data),
  });

  const categoryName =
    categoryId &&
    categories.find((c) => c.categoryId === categoryId)?.categoryName;

  return (
    <Box mb={4}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box
          sx={{
            width: "4px",
            height: "24px",
            backgroundColor: "#66BB6A",
            mr: 1,
          }}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="h6"
            sx={{
              color: "#4CAF50",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {categoryName
              ? categoryName
              : `Kết quả tìm kiếm cho từ khóa "${keyword}"`}
          </Typography>

          {categoryName && (
            <Box
              component="img"
              src="/image/logo/green-tea-400x400.png"
              alt="tea"
              sx={{ height: 30 }}
            />
          )}
        </Box>
      </Box>

      {isLoading ? (
        <Box textAlign="center" py={4}>
          <CircularProgress />
        </Box>
      ) : data?.items?.length ? (
        <>
          <YourProductCard products={data.items} />

          {data.totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={0}>
              <Pagination
                page={data.currentPage}
                count={data.totalPages}
                onChange={(_, value) => setPage(value)}
                color="standard"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Không có sản phẩm nào phù hợp.
        </Typography>
      )}
    </Box>
  );
};

export default FilteredProductSection;
