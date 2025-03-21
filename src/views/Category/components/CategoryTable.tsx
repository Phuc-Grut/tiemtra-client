import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "src/services/api/Category";
import { ICategory } from "src/Interfaces/ICategory";
import formatVietnamTime from "src/utils/formatVietnamTime";
import CustomPagination from "src/components/CustomPagination";

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
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>STT</th>
            <th style={styles.header}>Mã danh mục</th>
            <th style={styles.header}>Tên Danh Mục</th>
            <th style={styles.header}>Người tạo</th>
            <th style={styles.header}>Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: ICategory, index: number) => (
            <tr key={category.categoryId} style={styles.row}>
              <td style={styles.centerText}>
                {(pageNumber - 1) * pageSize + index + 1}
              </td>
              <td style={styles.centerText}>{category.categoryId}</td>
              <td style={styles.cell}>{category.categoryName}</td>
              <td style={styles.cell}>
                {category?.creator?.fullName || "Không có dữ liệu"}
              </td>
              <td style={styles.cell}>
                {formatVietnamTime(category.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <CustomPagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={maxPages}/>
    </div>
  );
};

export default CategoryTable;

const styles = {
  tableContainer: {
    width: "100%",
    overflowX: "auto" as "auto",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    borderRight: "1px solid #ddd",
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  centerText: {
    textAlign: "start",
    fontWeight: "bold",
    padding: "10px",
    borderRight: "1px solid #ddd",
  },
  cell: {
    padding: "10px",
    borderRight: "1px solid #ddd",
  },
} as const;
