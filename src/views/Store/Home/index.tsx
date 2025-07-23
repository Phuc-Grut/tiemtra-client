import React, { useEffect, useRef, useState } from "react";
import IntroVideoSection from "./components/IntroVideoSection";
import BannerSlideshowSection from "./components/BannerSlideshowSection";
import { Box } from "@mui/material";
import ProductSlider from "./components/ProductSlider";
import { IProduct, IProductFilter } from "src/Interfaces/IProduct";
import { useInfiniteQuery } from "@tanstack/react-query";
import productApi from "src/services/api/Products/indext";

const HomePage = () => {
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

  const [filter, setFilter] = useState<IProductFilter>({
    pageNumber: 1,
    pageSize: 10,
    keyword: "",
    productCode: "",
    sortBy: "",
    status: undefined,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["store-get-paging-product"],
      queryFn: async ({ pageParam = 1 }) => {
        const cleaned = buildCleanFilter({ ...filter, pageNumber: pageParam });
        const res = await productApi.storeGetAllProduct(cleaned);
        return {
          items: res.data.items ?? [],
          nextPage: pageParam + 1,
          isLastPage: pageParam >= (res.data.totalPages ?? 1),
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.isLastPage ? undefined : lastPage.nextPage,
    });

  const products: IProduct[] = data?.pages.flatMap((page) => page.items) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <BannerSlideshowSection />
      <IntroVideoSection />

      <ProductSlider products={products} />
      <Box ref={loadMoreRef} sx={{ height: 1 }} />
    </Box>
  );
};

export default HomePage;
