import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "src/services/api/Category";
import { ICategory } from "src/Interfaces/ICategory";
import formatVietnamTime from "src/utils/formatVietnamTime";
import CustomPagination from "src/components/CustomPagination";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CategoryTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState<number>(1);
  const pageSize = 10;

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", pageNumber],
    queryFn: async () => {
      const response = await categoryApi.getPagingApi({ pageNumber, pageSize });

      const realTotalPages = response.data.totalPages ?? 1;
      setMaxPages(realTotalPages);
      console.log("🚀 ~ queryFn: ~ realTotalPages:", realTotalPages);

      return response.data.data.$values;
    },
    placeholderData: (previousData: any) => previousData,
  });

  // let startPage = Math.max(1, pageNumber - 1);
  // let endPage = Math.min(maxPages ?? 1, pageNumber + 1);

  // if (pageNumber === 1) {
  //   startPage = 1;
  //   endPage = Math.min(3, maxPages ?? 1);
  // }

  // const pageRange = [];
  // for (let i = startPage; i <= endPage; i++) {
  //   pageRange.push(i);
  // }

  if (isLoading)
    return (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Đang tải...</p>
    );
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center" }}>Lỗi: {error.message}</p>
    );

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column", // Đảm bảo bảng full màn hình
        // maxHeight: "100vh",
        backgroundColor: "#fff",
        borderRadius: "8px",
        paddingTop: "0px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        // minHeight: "70vh",
        minHeight: "50vh", // ✅ Đảm bảo bảng không quá nhỏ khi dữ liệu ít
        overflow: "auto", // ✅ Tạo thanh cuộn nếu bảng có quá nhiều dữ liệu
        maxHeight: "calc(100vh - 198px)",
      }}
    >
      <TableContainer component={Paper} sx={{ overflowX: "auto", flexGrow: 1, }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "50px",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                Mã danh mục
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                Tên Danh Mục
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                Mô tả
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                Người tạo
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
              >
                Cập nhật
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.length > 0 ? (
              categories.map((category: ICategory, index: number) => (
                <TableRow key={category.categoryId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {(pageNumber - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell>{category.categoryId}</TableCell>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>
                    {category.categoryName || "Không có mô tả"}
                  </TableCell>
                  <TableCell>
                    {category?.creator?.fullName || "Không có dữ liệu"}
                  </TableCell>
                  <TableCell>{formatVietnamTime(category.updatedAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{ textAlign: "center", padding: "20px" }}
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phần phân trang */}
      <Box mt={0} display="flex" justifyContent="center" paddingBottom={0.5} >
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={maxPages}
        />
      </Box>
    </Box>
  );
};

export default CategoryTable