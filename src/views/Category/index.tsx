import React from "react";
import { Box } from "@mui/material";
import PageHeader from "src/components/PageHeader";
import CategoryTable from "./components/CategoryTable";

const Category: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, // ✅ Giúp nội dung mở rộng hết màn hình
        minHeight: "calc(100vh - 121px)", // ✅ 64px là chiều cao TopBar, cần chỉnh nếu khác
        padding: 1,
        paddingTop: 5,
      }}
    >
      {/* ✅ Tiêu đề trang */}
      <PageHeader title="Trang Danh Mục" />

      {/* ✅ Bảng sẽ mở rộng theo toàn bộ khoảng trống còn lại */}
      <Box sx={{ flexGrow: 1, marginTop: 1, display: "flex", flexDirection: "column" }}>
        <CategoryTable />
      </Box>
    </Box>
  );
};

export default Category;
