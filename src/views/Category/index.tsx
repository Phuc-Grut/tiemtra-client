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
        flexGrow: 1,
        minHeight: "calc(100vh - 121px)",
        padding: 1,
        paddingTop: 5,
      }}
    >
      <PageHeader title="Trang Danh Mục" />

      <Box sx={{ flexGrow: 1, marginTop: 1, display: "flex", flexDirection: "column" }}>
        <CategoryTable />
      </Box>
    </Box>
  );
};

export default Category;
