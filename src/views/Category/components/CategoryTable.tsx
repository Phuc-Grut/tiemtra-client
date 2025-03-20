import React from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "src/services/api/Category";
import { ICategory } from "src/Interfaces/ICategory";
import formatVietnamTime from "src/utils/formatVietnamTime";
import { CSSProperties } from "react";

const CategoryTable = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryApi.getPagingApi({ pageNumber: 1, pageSize: 10 });
      return response.data.data.$values;
    },
  });

  if (isLoading) return <p style={{ textAlign: "center", fontWeight: "bold" }}>Đang tải...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Lỗi: {error.message}</p>;

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
              <td style={styles.centerText}>{index + 1}</td>
              <td style={styles.centerText}>{category.categoryId}</td>
              <td style={styles.cell}>{category.categoryName}</td>
              <td style={styles.cell}>{category?.creator?.fullName || "Không có dữ liệu"}</td>
              <td style={styles.cell}>{formatVietnamTime(category.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Định nghĩa CSS chuẩn với viền giữa các cột
const styles: Record<string, CSSProperties> = {
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
};

export default CategoryTable;
